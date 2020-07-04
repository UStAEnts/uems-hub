import pytest
import requests
import datetime
import json
import dateutil.parser

from datetime import timezone

EVENTS_BASE_URL = "http://gateway:15450/events"

def send_get_query(params):
    try:
        res = requests.get(EVENTS_BASE_URL, params=params)
    except RuntimeError:
        assert False
    assert (res.status_code == 200)
    return res.json()

def send_add_event(params):
    try:
        res = requests.post(EVENTS_BASE_URL, json=params)
    except RuntimeError:
        assert False
    assert (res.status_code == 200)
    return res.json()

def send_update_query(params):
    try:
        res = requests.patch(EVENTS_BASE_URL, json=params)
    except RuntimeError:
        assert False
    assert (res.status_code == 200)
    return res.json()

def send_delete_query(params):
    try:
        res = requests.delete(EVENTS_BASE_URL, json=params)
    except RuntimeError:
        assert False
    assert (res.status_code == 200)
    return res.json()

def json_datetime(year=0, month=0, day=0, hour=0, minute=0):
    return json.dumps(
        {
            'year': year,
            'month': month,
            'day': day,
            'hour': hour,
            'minute': minute
        }
    )

def test_query_event_name():
    content = send_get_query(params={'access_token': 1, 'name': 'The Bop'})
    assert (len(content) == 1)
    assert (content[0]['name'] == 'The Bop')

def test_query_all():
    content = send_get_query(params={'access_token': 1})
    assert (len(content) == 2)
    if content[0]['name'] == 'The Bop':
        assert content[1]['name'] == 'Sinners'
    elif content[0]['name'] == 'Sinners':
        assert content[1]['name'] == 'The Bop'
    else:
        pytest.fail("Unrecognised event name returned")

def test_add_get_event():
    start_date = datetime.datetime(2020, 7, 1, 13, 30)
    end_date = datetime.datetime(2020, 7, 1, 17, 0)

    venue = 'The Stage'

    event_name = 'TestEvent'

    send_add_event(params={
        'access_token' : 1,
        'name': 'TestEvent',
        'start_date': start_date.replace(tzinfo=timezone.utc).timestamp(),
        'end_date': end_date.replace(tzinfo=timezone.utc).timestamp(),
        'venue': venue
        }
    )

    res = send_get_query(params={'access_token': 1, 'name': event_name, 'venue': venue})
    assert (len(res) == 1)
    assert (res[0]['name'] == event_name)
    assert (res[0]['venue'] == venue)

def test_get_modify_event_name():
    content = send_get_query(params={'access_token': 1, 'name': 'The Bop'})
    assert (len(content) == 1)
    assert (content[0]['name'] == 'The Bop')

    start_date = dateutil.parser.parse(content[0]['start_date'])
    end_date = dateutil.parser.parse(content[0]['end_date'])
    venue = content[0]['venue']

    id = content[0]['_id']

    # Update event name from 'The Bop' to 'The Wop'
    send_update_query(params= {
        'access_token': 1, 
        'event_id': id, 
        'name': 'The Wop',
        'start_date': start_date.replace(tzinfo=timezone.utc).timestamp(),
        'end_date': end_date.replace(tzinfo=timezone.utc).timestamp(),
        'venue': content[0]['venue']
        })

    new_res = send_get_query(params={'access_token': 1, 'name': 'The Wop'})
    assert (len(new_res) == 1)
    assert (new_res[0]['name'] == 'The Wop')
    assert (dateutil.parser.parse(new_res[0]['start_date']) == start_date)
    assert (dateutil.parser.parse(new_res[0]['end_date']) == end_date)
    assert (new_res[0]['venue'] == venue)

def test_add_get_delete_event():
    event_name = 'TESTDELETEEVENT'
    send_add_event(params={
        'access_token' : 1,
        'name': event_name,
        'start_date': datetime.datetime(2020, 7, 1, 13, 30).replace(tzinfo=timezone.utc).timestamp(),
        'end_date': datetime.datetime(2020, 7, 1, 17, 0).replace(tzinfo=timezone.utc).timestamp(),
        'venue': 'The Stage'
        }
    )

    content = send_get_query(params={'access_token': 1, 'name': 'TESTDELETEEVENT'})
    assert (len(content) == 1)
    assert (content[0]['name'] == event_name)

    id = content[0]['_id']

    send_delete_query(params={'access_token': 1, 'event_id': id})

    res = send_get_query(params={'access_token': 1, 'name': event_name})
    assert (len(res) == 0)
    