import pytest
import requests
import datetime
import json
import dateutil.parser

from datetime import timezone

EVENTS_GET_URL = "http://gateway:15450/events"

# The URL used for operations on a single event.
SINGLE_EVENT_URL = "http://gateway:15450/events/{id}"


def send_get_events(name=None, start_before=None, start_after=None, end_before=None, end_after=None):
    params = {
        'access_token': 1
    }
    if not name is None:
        params['name'] = name

    if not start_before is None:
        params['startbefore'] = start_before

    if not start_after is None:
        params['startafter'] = start_after

    if not end_before is None:
        params['endbefore'] = end_before
                    
    if not end_after is None:
        params['endafter'] = end_after

    print("Params")
    print(params)

    try:
        res = requests.get(EVENTS_GET_URL, params=params)
    except RuntimeError:
        assert False
    assert (res.status_code == 200)
    return res.json()

def send_create_event(name, start_date, end_date):
    params = {
        'access_token': 1,
        'name': name,
        'startDate': start_date,
        'endDate': end_date
    }
    try:
        res = requests.post(EVENTS_GET_URL, json=params)
    except RuntimeError:
        assert False
    assert (res.status_code == 201)
    return res.json()

# def send_update_query(params):
#     try:
#         res = requests.patch(EVENTS_BASE_URL, json=params)
#     except RuntimeError:
#         assert False
#     assert (res.status_code == 200)
#     return res.json()

def send_delete_query(event_id):
    params = {
        'access_token': 1
    }
    try:
        res = requests.delete(SINGLE_EVENT_URL.format(id=event_id), json=params)
    except RuntimeError:
        assert False
    assert (res.status_code == 200)
    return res.json()

@pytest.mark.timeout(5)
def test_query_event_name():
    content = send_get_events(name='The Bop')
    assert (len(content) == 1)
    assert (content[0]['name'] == 'The Bop')

@pytest.mark.timeout(5)
def test_query_all():
    content = send_get_events()
    assert (len(content) == 2)
    if content[0]['name'] == 'The Bop':
        assert content[1]['name'] == 'Sinners'
    elif content[0]['name'] == 'Sinners':
        assert content[1]['name'] == 'The Bop'
    else:
        pytest.fail("Unrecognised event name returned")

@pytest.mark.timeout(5)
def test_add_get_event():
    start_date = datetime.datetime(2020, 7, 1, 13, 30)
    end_date = datetime.datetime(2020, 7, 1, 17, 0)

    event_name = 'TestEvent'

    send_create_event(name=event_name,
        start_date=start_date.replace(tzinfo=timezone.utc).timestamp(),
        end_date=end_date.replace(tzinfo=timezone.utc).timestamp())

    res = send_get_events(name=event_name)
    assert (len(res) == 1)
    assert (res[0]['name'] == event_name)

# @pytest.mark.timeout(5)
# def test_get_modify_event_name():
#     content = send_get_query(params={'access_token': 1, 'name': 'The Bop'})
#     assert (len(content) == 1)
#     assert (content[0]['name'] == 'The Bop')

#     start_date = dateutil.parser.parse(content[0]['start_date'])
#     end_date = dateutil.parser.parse(content[0]['end_date'])
#     venue = content[0]['venue']

#     id = content[0]['_id']

#     # Update event name from 'The Bop' to 'The Wop'
#     send_update_query(params= {
#         'access_token': 1, 
#         'event_id': id, 
#         'name': 'The Wop',
#         'start_date': start_date.replace(tzinfo=timezone.utc).timestamp(),
#         'end_date': end_date.replace(tzinfo=timezone.utc).timestamp(),
#         'venue': content[0]['venue']
#         })

#     new_res = send_get_query(params={'access_token': 1, 'name': 'The Wop'})
#     assert (len(new_res) == 1)
#     assert (new_res[0]['name'] == 'The Wop')
#     assert (dateutil.parser.parse(new_res[0]['start_date']) == start_date)
#     assert (dateutil.parser.parse(new_res[0]['end_date']) == end_date)
#     assert (new_res[0]['venue'] == venue)

# @pytest.mark.timeout(5)
# def test_add_get_delete_event():
#     start_date = datetime.datetime(2021, 7, 1, 18, 30)
#     end_date = datetime.datetime(2021, 7, 1, 21, 0)

#     event_name = 'TESTDELETEEVENT'

#     send_create_event(name=event_name,
#         start_date=start_date.replace(tzinfo=timezone.utc).timestamp(),
#         end_date=end_date.replace(tzinfo=timezone.utc).timestamp())

#     content = send_get_events(name=event_name)
#     assert (len(content) == 1)
#     assert (content[0]['name'] == event_name)

#     id = content[0]['id']

#     send_delete_query(event_id=id)

#     res = send_get_events(name=event_name)
#     assert (len(res) == 0)
    