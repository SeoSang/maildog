#!/usr/bin/env bash

echo "> Health Check Start!"

for RETRY_COUNT in {1..10}
do
  STATUS=$(curl -o /dev/null -w "%{http_code}" "http://localhost:3000")
  if [ $STATUS -eq 200 ]; then
    echo "Frontend healcheck 성공"
    break
  fi
  if [ ${RETRY_COUNT} -eq 10 ]
    then
      echo "> Frontend health check 실패. "
      exit 1
    fi
  echo "> Health check 연결 실패. 재시도..."
  sleep 10
done


sudo rm -rf /opt/codedeploy-agent/deployment-root