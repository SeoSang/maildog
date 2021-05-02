FROM python:3.8-slim-buster

RUN apt-get update

WORKDIR /app

ADD requirements.txt /app/

RUN pip3 install -r requirements.txt