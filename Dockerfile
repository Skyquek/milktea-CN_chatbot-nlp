# FROM  alpine:3.7
FROM python:3.6-buster

# copy all of our code to the docker
COPY . /application
WORKDIR /application

RUN pip3 install -r requirements.txt
RUN rasa train

ENTRYPOINT ["bash", "/application/setup.sh"]

