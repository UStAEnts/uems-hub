FROM python:3.8.2

RUN pip install pipenv

COPY Pipfile* /
RUN pipenv install --dev

COPY seed-mongo-uems.py /
CMD pipenv run python seed-mongo-uems.py
