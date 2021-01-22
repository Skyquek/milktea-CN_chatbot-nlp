# milktea-CN_chatbot-nlp
Chinese Conversation Chatbot

1. bert-as-service is a sentence encoding service for mapping a variable-length sentence to a fixed-length vector.

`bert-serving-start -model_dir chinese_L-12_H-768_A-12/ -num_worker=1`

2. start action server

  `rasa run actions`

3. train a model

  `rasa train`

4. talk to your chatbot

  `rasa shell`