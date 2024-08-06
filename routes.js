const express = require('express');
const createMyCustomApi = express.Router();
const fs = require('fs');

// Fetch data from the members.json file
const loadMembers = () => {
    const jsonData = fs.readFileSync(__dirname + "/" + "members.json");
        return JSON.parse(jsonData);
}

// Update members.js file
const saveMembers = (newData) => {
    const stringifyData = JSON.stringify(newData);
    fs.writeFileSync(__dirname + "/" + "members.json", stringifyData)
}

// Endpoint to get a list of all team members (get request)
createMyCustomApi.get('/getAllMembers', function(req, res) {
    fs.readFile(__dirname + "/" + "members.json", 'utf8', function(err, data) {
        res.status(200);
        res.end(data);
    });
})

// Endpoint to add a new member to the team (post request)
createMyCustomApi.post('/addNewMember', (req, res) => {
    const newMember = {
        memberId: req.body.memberId,
        role: req.body.role,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    const members = loadMembers();
    if(members.some(member => member.memberId === newMember.memberId)) {
        res.status(409).json({ message: 'This record ID already exists...' });
    }
    else {
        members.push(newMember);
        saveMembers(members);
        res.status(200).json({ message: 'OK' });
    }
});

// Endpoint to update the information about an existing team member (put request)
createMyCustomApi.put('/updateExistMember/:memberId', (req, res) => {
    const putId = parseInt(req.params.memberId, 10);
    let members = loadMembers();
    if(members.some(member => member.memberId === putId)) {
        const filteredData = members.filter((i) => i.memberId === putId);
        filteredData.forEach((i) => {
            i.memberId = req.body.memberId,
            i.role = req.body.role,
            i.firstname = req.body.firstname,
            i.lastname = req.body.lastname
        });
        saveMembers(members);
        res.status(201).json({ message: 'OK' });
    }
    else {
        res.status(404).json({ message: 'The record with the required ID does not exist...' });
    }
});

// Endpoint to remove a member from the team (delete request)
createMyCustomApi.delete('/removeMember/:memberId', (req, res) => {
    const delId = parseInt(req.params.memberId, 10);
    const members = loadMembers();
    if(members.some(member => member.memberId === delId)) {
        const index = members.findIndex(member => member.memberId === delId);
        members.splice(index, 1);
        saveMembers(members);
        res.status(204).json({ message: 'OK' });
    }
    else {
        res.status(404).json({ message: 'The record with the required ID does not exist...' });
    }
});

module.exports = createMyCustomApi;
