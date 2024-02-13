# TODO Application 

In this application data is fetched from ToDo apis. It can be configured to get ids with EVEN numbers or ODD numbers or can be extended to have palindrome or other series.

The Max limit of the ids of todo api to be fetched is 200. I have implemented in way to scale (i,e) to send a n number of parallel request to server and also  if needed we cam batche the requests if api limit is not 200 and in thousnads or millions.

## To run application in terminal with node
 npm start
### To run test cases in node

 npm test

## To run in docker
### Build docker
 sudo docker build -t nodetodo .
### To run application in docker
 sudo docker run nodetodo
### To run test cases in node
 sudo docker run nodetodo test