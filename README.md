# milktea-CN_chatbot-nlp
Chinese Conversation Chatbot

1. bert-as-service is a sentence encoding service for mapping a variable-length sentence to a fixed-length vector.

`bert-serving-start -model_dir chinese_L-12_H-768_A-12/ -num_worker=1`

2. start action server

  `rasa run actions`

3. train a model

  `rasa train`

4. talk to your chatbot
   
    + API: `rasa run`

    + CMD: `rasa shell`

5. EXPOSE the PORT NUMBER
  
  ```
  URL: http://localhost:5005/webhooks/rest/webhook
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

# Setup Docker
1. Build the Dockerfile
```
$ docker build -t nlp-chatbot:latest .
```

2. Run the Images
```
$ docker run -p 5005:5005 nlp-chatbot:latest -name xinfutang
```