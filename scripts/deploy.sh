#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/GLOGG
cd $REPOSITORY

APP_NAME=GLOGG
JAR_NAME=$(ls $REPOSITORY/build/libs/ | grep 'SNAPSHOT.jar' | tail -n 1)
JAR_PATH=$REPOSITORY/build/libs/$JAR_NAME

CURRENT_PID=$(pgrep -f $APP_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 종료할 애플리케이션이 없습니다."
else
  echo "> kill -9 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

cd /home/ubuntu/GLOGG/server/build/libs
echo "> Deploy - $JAR_PATH "
nohup java -jar Glog-0.0.1-SNAPSHOT.jar &
#nohup java -jar $JAR_PATH &
#nohup java -jar $JAR_PATH > /dev/null 2> /dev/null < /dev/null &
#nohup java -jar $JAR_PATH --spring.profiles.active=prod > /dev/null 2> /dev/null < /dev/null &
