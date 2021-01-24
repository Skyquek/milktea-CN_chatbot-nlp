# Milktea Chinese Chatbot

This project uses the rasa framework to provide a chatbot for ordering boba tea, taking 幸福堂 as a reference.

# Live system

You may access a live version of this chatbot via [our server at home](http://48mh42.ddns.net:52288/).

# Setting up

## System requirements

- System with support for the x86 instruction set
- Git
- Docker
- NodeJS (with npm)

## Scripted setup (Linux systems)

1. Clone the repo from github

```bash
git clone https://github.com/Skyquek/milktea-CN_chatbot-nlp.git
```

2. Give exectable permissions

```bash
cd milktea-CN_chatbot-nlp
chmod 0777 buildAll.sh
```

3. Run the build process

```bash
./buildAll.sh
```

4. Once everything has finished building, you may access the chatbot service via your browser at:

```
http://<your-ip>:52288/
```

## Non-scripted setup

1. Clone the repo from github, then go into the folder

```bash
git clone https://github.com/Skyquek/milktea-CN_chatbot-nlp.git
cd milktea-CN_chatbot-nlp
```

### Build the frontend

1. Go into the folder containing the frontend code

```bash
cd ./public
```

2. Build the frontend files

```bash
npm install
ng build --prod
```

3. Build the docker image

```bash
docker build -t xingfutang-chatbot-frontend  . --no-cache
```

4. Run the docker image (you may change the port number - 52288 to any number you desire)

```bash
docker run --name xingfutang-chatbot-frontend  -p 52288:80 -d xingfutang-chatbot-frontend
```

5. Done!

### Build the backend

1. Build the docker image

```bash
docker build -t nlp-chatbot:latest .
```

2. Run the docker image

```bash
docker run --name xinfutang -p 5005:5005 -d ai-trademark-frontend
```

3. Done!

## Building without docker

1. Start bert-as-service. bert-as-service is a sentence encoding service for mapping a variable-length sentence to a fixed-length vector.

```bash
bert-serving-start -model_dir chinese_L-12_H-768_A-12/ -num_worker=1
```

2. start action server

```bash
rasa run actions
```

3. train a model

```bash
rasa train
```

4. talk to your chatbot

   - API: `rasa run`

   - CMD: `rasa shell`

5. EXPOSE the PORT NUMBER

```json
URL: "http://localhost:5005/webhooks/rest/webhook"
Method: POST
Header: Content-Type: application/json
Body:
{
"sender": "Quek",
"message": “奶茶”
}
Response:
[
  {
      "recipient_id": "Quek",
      "text": "你好"
  },
  {
      "recipient_id": "Quek",
      "text": "想要喝点什么？"
  }
]
```
