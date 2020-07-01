FROM python:3.8.2

RUN pip install pipenv

COPY Pipfile* /
RUN pipenv install --dev

COPY seed-fixed.py /
COPY seed-events.json /
CMD pipenv run python seed-fixed.py
