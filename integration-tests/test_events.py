import pytest
import requests
import time

EVENTS_BASE_URL = "http://gateway:15450/events"

def test_query_event_name():
    try:
        res = requests.get(EVENTS_BASE_URL, params={'access_token': 1, 'name': 'The Bop'})
    except RuntimeError:
        assert False

    assert (res.status_code == 200)
    content = res.json()
    print(content)
    assert (len(content) == 1)
    assert (content[0]['name'] == 'The Bop')