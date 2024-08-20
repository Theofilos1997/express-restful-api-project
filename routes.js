const express = require('express');
const membersApi = express.Router();
const {loadMembers, saveMembers} = require('./dataAccess');
const base10 = 10;

// Endpoint to get a list of all team members (get request)
membersApi.get('/getAllMembers', function(req, res) {
    const members = loadMembers();
    res.status(200).json(members);
});

// Endpoint to add a new member to the team (post request)
membersApi.post('/addNewMember', (req, res) => {
    const newMember = {
        memberId: req.body.memberId,
        role: req.body.role,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    if (!newMember.memberId || !newMember.role || !newMember.firstname || !newMember.lastname) {
        res.status(400).json({ message: 'All fields are required...' });
        return;
    }
    const members = loadMembers();
    if(members.some(member => member.memberId === newMember.memberId)) {
        res.status(409).json({ message: 'This record ID already exists...' });
        return;
    }
    members.push(newMember);
    saveMembers(members);
    res.status(200).json({ message: 'OK' });
});

// Endpoint to update the information about an existing team member (put request)
membersApi.put('/updateExistMember/:memberId', (req, res) => {
    const memberToUpdateId = parseInt(req.params.memberId, base10);
    let members = loadMembers();
    if(!members.some(m => m.memberId === memberToUpdateId)) {
        res.status(404).json({ message: 'The record with the required ID does not exist...' });
        return;
    }
    const updatedMember = {
        memberId: req.body.memberId,
        role: req.body.role,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    if (!updatedMember.memberId || !updatedMember.role || !updatedMember.firstname || !updatedMember.lastname) {
        res.status(400).json({ message: 'All fields are required...' });
        return;
    }
    const memberIndex = members.findIndex(m => m.memberId === memberToUpdateId);
    members[memberIndex] = updatedMember;
    saveMembers(members);
    res.status(201).json({ message: 'OK' });
});

// Endpoint to remove a member from the team (delete request)
membersApi.delete('/removeMember/:memberId', (req, res) => {
    const delId = parseInt(req.params.memberId, base10);
    const members = loadMembers();
    if(!members.some(m => m.memberId === delId)) {
        res.status(404).json({ message: 'The record with the required ID does not exist...' });
        return;
    }
    const index = members.findIndex(m => m.memberId === delId);
    members.splice(index, 1);
    saveMembers(members);
    res.status(204).json({ message: 'OK' });
});

module.exports = membersApi;
