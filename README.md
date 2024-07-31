# EXPRESS-API-PROJECT

## Description

This repository contains the necessary code to build a simple CRUD App, using a Node.js API, to store information about team members.

## Requirements
Preferable to run the following commands via GitBash.
<br>
Install npm and necessary dependances:
```
npm install
```

Install [Node](https://nodejs.org/en)
You can also install it using [software on demand](https://digitalondemand.pfizer.com/Software).

## Run server
```
node app.js
```
To retrieve the stored information about all team members (get request), follow the link: http://localhost:9000/api/getAllMembers
To insert an entry about a new team member (post request), follow the link: http://localhost:9000/api/addNewMember
To update an existing entry (put request), follow the link: http://localhost:9000/api/updateExistMember
To delete an existing entry (delete request), follow the link: http://localhost:9000/api/removeMember
<br>
The interaction with the API can take place via [Postman](https://www.postman.com/jp/downloads/) or similar software.
