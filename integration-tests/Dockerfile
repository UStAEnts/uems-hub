FROM python:rc-buster

WORKDIR /user/src/uems/tests/

COPY . .

RUN pip install pytest
RUN pip install requests
RUN pip install python-dateutil

CMD ["sh", "run.sh"]
