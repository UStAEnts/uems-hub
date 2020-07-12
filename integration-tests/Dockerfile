FROM python:rc-buster

WORKDIR /user/src/uems/tests/

COPY . .

RUN pip install pytest
RUN pip install requests
RUN pip install python-dateutil
RUN pip install pytest-timeout

CMD ["sh", "run.sh"]
