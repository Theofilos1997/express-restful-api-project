const { error } = require('console');
const express = require('express');
const router = express.Router();

// Middleware
router.use(express.json());

// Get method (Get all member)
router.get('/getAllMembers', (req, res) => {
  res.send(teamMembersArray);
  if(!error) {
      res.status(200);
  }
});

// Post method (Add a new member)
router.post('/addNewMember', (req, res) => {
  const member = {
    memberId: req.body.memberId,
    role: req.body.role,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }
  teamMembersArray.push(member);
  res.send(member);
  if(!error) {
    res.status(200);
  }
});

// Put method (Update an existing member)
router.put('/updateExistMember/:memberId', (req, res) => {
  res.send(`Update member ${memberId}`);
});

// Delete method (Delete member from the records)
router.delete('/removeMember/:memberId', (req, res) => {
  const memberId = req.params.id;
  res.send(`Delete member ${memberId}`);
});

// Mock database
const teamMembersArray = [
  {
      memberId: "1",
      role: "engineer",
      firstname: "Theofilos",
      lastname: "Sachinidis"
  },
  {
      memberId: "2",
      role: "devops engineer",
      firstname: "Ioannis",
      lastname: "Sykaras"
  }
]

module.exports = router;
