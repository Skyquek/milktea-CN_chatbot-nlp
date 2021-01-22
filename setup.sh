#/bin/bash

rasa run actions &

bert-serving-start -model_dir chinese_L-12_H-768_A-12/ -num_worker=1 &

echo "Started"