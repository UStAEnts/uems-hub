from faker import Faker
from pymongo import MongoClient
from dateutil.relativedelta import relativedelta
import datetime

icons = ['ad','address-book','address-card','adjust','air-freshener','align-center','align-justify','align-left','align-right',
'allergies','ambulance','american-sign-language-interpreting','anchor','angle-double-down','angle-double-left','angle-double-right',
'angle-double-up','angle-down','angle-left','angle-right','angle-up','angry','ankh','apple-alt','archive','archway',
'arrow-alt-circle-down','arrow-alt-circle-left','arrow-alt-circle-right','arrow-alt-circle-up','arrow-circle-down',
'arrow-circle-left','arrow-circle-right','arrow-circle-up','arrow-down','arrow-left','arrow-right','arrow-up','arrows-alt',
'arrows-alt-h','arrows-alt-v','assistive-listening-systems','asterisk','at','atlas','atom','audio-description','award','baby',
'baby-carriage','backspace','backward','bacon','bacteria','bacterium','bahai','balance-scale','balance-scale-left',
'balance-scale-right','ban','band-aid','barcode','bars','baseball-ball','basketball-ball','bath','battery-empty','battery-full',
'battery-half','battery-quarter','battery-three-quarters','bed','beer','bell','bell-slash','bezier-curve','bible','bicycle',
'biking','binoculars','biohazard','birthday-cake','blender','blender-phone','blind','blog','bold','bolt','bomb','bone','bong',
'book','book-dead','book-medical','book-open','book-reader','bookmark','border-all','border-none','border-style','bowling-ball',
'box','box-open','box-tissue','boxes','braille','brain','bread-slice','briefcase','briefcase-medical','broadcast-tower','broom',
'brush','bug','building','bullhorn','bullseye','burn','bus','bus-alt','business-time','calculator','calendar','calendar-alt',
'calendar-check','calendar-day','calendar-minus','calendar-plus','calendar-times','calendar-week','camera','camera-retro',
'campground','candy-cane','cannabis','capsules','car','car-alt','car-battery','car-crash','car-side','caravan','caret-down',
'caret-left','caret-right','caret-square-down','caret-square-left','caret-square-right','caret-square-up','caret-up','carrot',
'cart-arrow-down','cart-plus','cash-register','cat','certificate','chair','chalkboard','chalkboard-teacher','charging-station',
'chart-area','chart-bar','chart-line','chart-pie','check','check-circle','check-double','check-square','cheese','chess',
'chess-bishop','chess-board','chess-king','chess-knight','chess-pawn','chess-queen','chess-rook','chevron-circle-down',
'chevron-circle-left','chevron-circle-right','chevron-circle-up','chevron-down','chevron-left','chevron-right','chevron-up',
'child','church','circle','circle-notch','city','clinic-medical','clipboard','clipboard-check','clipboard-list','clock','clone',
'closed-captioning','cloud','cloud-download-alt','cloud-meatball','cloud-moon','cloud-moon-rain','cloud-rain','cloud-showers-heavy',
'cloud-sun','cloud-sun-rain','cloud-upload-alt','cocktail','code','code-branch','coffee','cog','cogs','coins','columns','comment',
'comment-alt','comment-dollar','comment-dots','comment-medical','comment-slash','comments','comments-dollar','compact-disc',
'compass','compress','compress-alt','compress-arrows-alt','concierge-bell','cookie','cookie-bite','copy','copyright','couch',
'credit-card','crop','crop-alt','cross','crosshairs','crow','crown','crutch','cube','cubes','cut','database','deaf','democrat']

fake = Faker('en')

class EventDetailsSeeder:
    def __init__(self):
        host = 'mongo' if script_runs_within_container() else 'localhost'
        self.client = MongoClient(f'mongodb://{host}:27017', 
                                username='root', 
                                password='example',
                                authSource='admin',
                                authMechanism='SCRAM-SHA-1')

    def seed_ent_states(self):
        db = self.client.state
        details = db.details
        elements = []

        for i in range(5):
            elements += [{
                'color': fake.color(),
                'icon': fake.random_element(icons),
                'name': fake.word(),
                'type': 'ent'
            }]

        return [str(x) for x in details.insert_many(elements).inserted_ids]

    def seed_state_states(self):
        db = self.client.state
        details = db.details
        elements = []

        for i in range(5):
            elements += [{
                'color': fake.color(),
                'icon': fake.random_element(icons),
                'name': fake.word(),
                'type': 'state'
            }]

        return [str(x) for x in details.insert_many(elements).inserted_ids]

    def seed_topic_states(self):
        db = self.client.state
        details = db.details
        elements = []

        for i in range(5):
            elements += [{
                'color': fake.color(),
                'icon': fake.random_element(icons),
                'name': fake.word(),
                'type': 'topic'
            }]

        return [str(x) for x in details.insert_many(elements).inserted_ids]

    def seed_users(self):
        db = self.client.users
        details = db.details

        uids = []
        elements = []

        for i in range(4):
            uid = fake.md5()
            uids += [uid]

            elements += [{
                'email': fake.ascii_safe_email(),
                'hash': '',
                'name': fake.first_name(),
                'uid': uid,
                'username': fake.user_name()
            }]

        uids += ['b795317b-d0f3-4b62-b0e3-2383ae225433']
        elements += [{
            'email': 'vitineth@gmail.com',
            'hash': '',
            'name': 'Ryan Delaney',
            'uid': 'b795317b-d0f3-4b62-b0e3-2383ae225433',
            'username': 'vitineth'
        }]

        details.insert_many(elements)

        return uids

    def seed_venues(self, user_ids):
        db = self.client.venues
        details = db.details

        elements = []

        for i in range(5):
            elements += [{
                'capacity': fake.random_int(30, 300),
                'color': fake.color(),
                'date': (fake.past_datetime() - datetime.datetime.utcfromtimestamp(0)).total_seconds(),
                'name': fake.word(),
                'user': fake.random_element(user_ids)
            }]

        return [str(x) for x in details.insert_many(elements).inserted_ids]

    def seed_files(self, user_ids):
        # Skipped for now until I can create files in the docker container
        pass

    def seed_events(self, venue_ids, state_ids, ents_ids, user_ids):
        db = self.client.events
        details = db.details

        elements = []

        for i in range(5):
            s = fake.future_datetime()
            e = fake.date_time_between_dates(s, s + relativedelta(weeks=1))
            
            elements += [{
                'attendance': fake.random_int(30, 300),
                'end': (e - datetime.datetime.utcfromtimestamp(0)).total_seconds(),
                'ents': fake.random_element(ents_ids),
                'name': fake.word(),
                'start': (s - datetime.datetime.utcfromtimestamp(0)).total_seconds(),
                'state': fake.random_element(state_ids),
                'venues': fake.random_choices(venue_ids),
                'author': fake.random_element(user_ids)
            }]

        return [str(x) for x in details.insert_many(elements).inserted_ids]

    def seed_event_comments(self, event_ids, topic_ids, user_ids):
        db = self.client['event-comments']
        comments = db.comments

        elements = []

        for i in range(5):
            elements += [{
                'assetID': fake.random_element(event_ids),
                'assetType': 'event',
                'body': fake.word(),
                'category': fake.random_element(topic_ids),
                'posted': (fake.past_datetime() - datetime.datetime.utcfromtimestamp(0)).total_seconds(),
                'poster': fake.random_element(user_ids),
                'requiredAttention': False
            }]

        return [str(x) for x in comments.insert_many(elements).inserted_ids]

    def seed_signups(self, event_ids, user_ids):
        db = self.client.signups
        details = db.details

        elements = []

        for i in range(5):
            elements += [{
                'date': (fake.past_datetime() - datetime.datetime.utcfromtimestamp(0)).total_seconds(),
                'event': fake.random_element(user_ids),
                'role': fake.random_element(['Lighting', 'Sound']),
                'user': fake.random_element(user_ids)
            }]

        return [str(x) for x in details.insert_many(elements).inserted_ids]

    def seed(self):
        ents = self.seed_ent_states()
        states = self.seed_state_states()
        topics = self.seed_topic_states()
        users = self.seed_users()
        venues = self.seed_venues(users)
        events = self.seed_events(venues, states, ents, users)
        comments = self.seed_event_comments(events, topics, users)
        signups = self.seed_signups(events, users)
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
