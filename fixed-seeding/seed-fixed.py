from pymongo import MongoClient
import json
import datetime

SEED_EVENTS_FILE = "seed-events.json"

class EventDetailsSeeder:
    def __init__(self):
        host = 'mongo' if script_runs_within_container() else 'localhost'
        client = MongoClient(f'mongodb://{host}:27017/event-details', 
                                username='root', 
                                password='example',
                                authSource='admin',
                                authMechanism='SCRAM-SHA-1')
        self.db = client.events
    
    def seed(self):
        print('About to wipe database...')
        self.db.details.delete_many({})
        print('Generating inserting events...')
        events = load_events(SEED_EVENTS_FILE)
        self.db.details.insert_many(events)
        print('Done')

def script_runs_within_container():
    with open('/proc/1/cgroup', 'r') as cgroup_file:
        return 'docker' in cgroup_file.read()

def load_datetime(obj):
    return datetime.datetime(obj['year'], obj['month'], obj['day'], obj['hour'], obj['minute'])

def load_event(event):
    return {
        "name": event['name'],
        "start_date": load_datetime(event['start_date']),
        "end_date": load_datetime(event['end_date'])
    }

def load_events(path):
    event_file = open(path, "r")
    events = event_file.read()
    event_file.close()
    event_list = json.loads(events)['events']

    loaded_events = []
    for e in event_list:
        loaded_events.append(load_event(e))
    return loaded_events

EventDetailsSeeder().seed()