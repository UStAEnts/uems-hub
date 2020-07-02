import pytest
import requests
import datetime
import json

from datetime import timezone

EVENTS_BASE_URL = "http://gateway:15450/events"

def make_query(params):
    try:
        res = requests.get(EVENTS_BASE_URL, params=params)
    except RuntimeError:
        assert False
    assert (res.status_code == 200)
    return res.json()

def make_add_event(params):
    try:
        res = requests.post(EVENTS_BASE_URL, json=params)
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
    content = make_query(params={'access_token': 1, 'name': 'The Bop'})
    assert (len(content) == 1)
    assert (content[0]['name'] == 'The Bop')

def test_query_all():
    content = make_query(params={'access_token': 1})
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

    make_add_event(params={
        'access_token' : 1,
        'name': 'TestEvent',
        'start_date': start_date.replace(tzinfo=timezone.utc).timestamp(),
        'end_date': end_date.replace(tzinfo=timezone.utc).timestamp(),
        'venue': venue
        }
    )

    res = make_query(params={'access_token': 1, 'name': event_name, 'venue': venue})
    assert (len(res) == 1)
    assert (res[0]['name'] == event_name)
    assert (res[0]['venue'] == venue)
