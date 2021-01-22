# FROM  alpine:3.7
FROM python:3.6-buster

# copy all of our code to the docker
COPY . /application
WORKDIR /application

RUN pip3 install -r requirements.txt
RUN rasa train

WORKDIR /application/chinese_L-12_H-768_A-12

RUN wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1fu-WIbGID7lUlTgH1G4rwIyrpoMUg4P9' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1fu-WIbGID7lUlTgH1G4rwIyrpoMUg4P9" -O bert-model.zip && rm -rf /tmp/cookies.txt
RUN unzip -o

ENTRYPOINT ["bash", "/application/setup.sh"]

