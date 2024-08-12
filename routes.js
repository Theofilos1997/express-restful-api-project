const express = require('express');
const createMyCustomApi = express.Router();
const {loadMembers, saveMembers} = require('./dataAccess')

// Endpoint to get a list of all team members (get request)
createMyCustomApi.get('/getAllMembers', function(req, res) {
    const members = loadMembers();
    res.status(200).json(members);
})

// Endpoint to add a new member to the team (post request)
createMyCustomApi.post('/addNewMember', (req, res) => {
    const newMember = {
        memberId: req.body.memberId,
        role: req.body.role,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if (!newMember.memberId || !newMember.role || !newMember.firstname || !newMember.lastname) {
        res.status(400).json({ message: 'All fields are required...' });
        return
    }
    const members = loadMembers();
    if(members.some(member => member.memberId === newMember.memberId)) {
        res.status(409).json({ message: 'This record ID already exists...' });
        return
    }
    members.push(newMember);
    saveMembers(members);
    res.status(200).json({ message: 'OK' });
});

// Endpoint to update the information about an existing team member (put request)
createMyCustomApi.put('/updateExistMember/:memberId', (req, res) => {
    const memberToUpdateId = parseInt(req.params.memberId, 10);
    let members = loadMembers();
    if(!members.some(member => member.memberId === memberToUpdateId)) {
        res.status(404).json({ message: 'The record with the required ID does not exist...' });
        return;
    }
    const updatedMember = {
        memberId: req.body.memberId,
        role: req.body.role,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if (!updatedMember.memberId || !updatedMember.role || !updatedMember.firstname || !updatedMember.lastname) {
        res.status(400).json({ message: 'All fields are required...' });
        return
    }
    const filteredData = members.filter((i) => i.memberId === memberToUpdateId);
    filteredData.forEach((i) => {
        i.memberId = updatedMember.memberId,
        i.role = updatedMember.role,
        i.firstname = updatedMember.firstname,
        i.lastname = updatedMember.lastname
    });
    saveMembers(members);
    res.status(201).json({ message: 'OK' });
});

// Endpoint to remove a member from the team (delete request)
createMyCustomApi.delete('/removeMember/:memberId', (req, res) => {
    const delId = parseInt(req.params.memberId, 10);
    const members = loadMembers();
    if(!members.some(member => member.memberId === delId)) {
        res.status(404).json({ message: 'The record with the required ID does not exist...' });
        return
    }
    const index = members.findIndex(member => member.memberId === delId);
    members.splice(index, 1);
    saveMembers(members);
    res.status(204).json({ message: 'OK' });
});

module.exports = createMyCustomApi;
