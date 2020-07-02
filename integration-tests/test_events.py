import pytest
import requests
import datetime
import json

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

def test_add_event():
    start_date = json_datetime(2020, 7, 1, 13, 30)
    end_date = json_datetime(2020, 7, 1, 17, 0)
    venue = 'The Stage'

    content = make_add_event(params={
        'access_token' : 1,
        'name': 'TestEvent',
        'start_date': start_date,
        'end_date': end_date,
        'venue': venue
        }
    )

    assert (len(content) == 1)
    assert ('event_id' in content)
