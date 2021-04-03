FROM python:3.8-slim-buster

WORKDIR /

COPY . .

RUN pip3 install -r requirements.txt

RUN chmod 744 ./run_everyday.sh

CMD [ "./run_everyday.sh" ]
