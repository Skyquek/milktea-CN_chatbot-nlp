#/bin/bash

echo "Trains"
rasa train &

echo "Bert Start"
bert-serving-start -model_dir chinese_L-12_H-768_A-12/ -num_worker=1 &

echo "Actions"
rasa run actions &

echo "Run"
rasa run --enable_api & --cors “*” &

while true; do sleep 10000; done