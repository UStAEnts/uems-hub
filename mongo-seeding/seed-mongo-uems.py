from faker import Faker
from pymongo import MongoClient
import datetime

fake = Faker('en')

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
        print('Generating fake events...')
        events = [generate_event() for _ in range(20)]
        self.db.details.insert_many(events)
        print('Done')

def script_runs_within_container():
    with open('/proc/1/cgroup', 'r') as cgroup_file:
        return 'docker' in cgroup_file.read()

def generate_event():
    epoch = datetime.datetime.utcfromtimestamp(0)
    data = {
        'name': fake.word(),
        'start_date': (fake.past_datetime() - epoch).total_seconds(),
        'end_date': (fake.future_datetime() - epoch).total_seconds()
    }
    return data

EventDetailsSeeder().seed()
