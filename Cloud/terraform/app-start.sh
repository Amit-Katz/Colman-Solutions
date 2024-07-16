#! /bin/bash
echo "starting"
export PATH=$PATH:/usr/bin
cd /opt/cloud-course-app/todo-server && nohup npm start &
cd /opt/cloud-course-app/todo-client && nohup npm start &
