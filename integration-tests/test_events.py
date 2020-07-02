import pytest
import requests
import time

EVENTS_BASE_URL = "http://gateway:15450/events"

def make_query(params):
    try:
        res = requests.get(EVENTS_BASE_URL, params=params)
    except RuntimeError:
        assert False
    assert (res.status_code == 200)
    return res.json()

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