#/bin/bash

echo
echo Pulling latest changes..
git pull

echo
echo Building latest frontend..
cd ./public
npm install
ng build --prod
docker build -t xingfutang-chatbot-frontend  . --no-cache

echo Creating new frontend..
docker rm -f xingfutang-chatbot-frontend
docker run --name xingfutang-chatbot-frontend  -p 52288:80 -d xingfutang-chatbot-frontend

echo 
echo Building latest backend..
cd ..
docker build -t nlp-chatbot:latest .

echo Creating latest backend..
docker rm -f xinfutang
docker run --name xinfutang -p 5005:5005 -d ai-trademark-frontend

