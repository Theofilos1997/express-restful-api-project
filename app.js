const express = require('express');
const app = express();
const fs = require('fs');

//const createMyCustomApi = require('./routes');
const { stringify } = require('querystring');
const PORT = 9000;

app.use(express.json());

// Endpoint to get a list of all team members (get request)
app.get('/api/getAllMembers', function(req, res){
    fs.readFile(__dirname + "/" + "members.json", 'utf8', function(err, data){
        res.status(200);
        res.end(data);
    });
})

// Endpoint to add a new member to the team (post request)
app.post('/api/addNewMember', (req, res) => {
    let newMember = {
        memberId: req.body.memberId,
        role: req.body.role,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    fs.readFile(__dirname + "/" + "members.json", 'utf8', function(err, data){
        var jsonData = JSON.parse(data);
        jsonData.push(newMember);
        var newData = JSON.stringify(jsonData);
        fs.writeFile(__dirname + "/" + "members.json", newData, err => {
            // error checking
            if(err) throw err;
        });
        res.status(200).json({ message: 'OK' });
    });
});

// Endpoint to update the information about an existing team member (put request)
app.put('/api/updateExistMember/:memberId', (req, res) => {
    const putId = parseInt(req.params.memberId, 10);
    fs.readFile(__dirname + "/" + "members.json", 'utf8', function(err, data){
        let jsonData = JSON.parse(data);
        jsonData.forEach((i) => {
            if(i.memberId === putId) {
                i.memberId = req.body.memberId,
                i.role = req.body.role,
                i.firstname = req.body.firstname,
                i.lastname = req.body.lastname
            }
        });
        var newData = JSON.stringify(jsonData);
        fs.writeFile(__dirname + "/" + "members.json", newData, err => {
            // error checking
            if(err) throw err;
        });
    });
    res.status(201).json({ message: 'OK' });
});

// Endpoint to remove a member from the team (delete request)
app.delete('/api/removeMember/:memberId', (req, res) => {
    const delId = parseInt(req.params.memberId, 10);
    fs.readFile(__dirname + "/" + "members.json", 'utf8', function(err, data){
        let jsonData = JSON.parse(data);
        const index = jsonData.findIndex(member => member.memberId === delId);
        //delete jsonData[index];
        jsonData.splice(index, 1);
        var newData = JSON.stringify(jsonData);
        fs.writeFile(__dirname + "/" + "members.json", newData, err => {
            // error checking
            if(err) throw err;
        });
    })
    res.status(204).json({ message: 'OK' });
});

//app.use('/api', createMyCustomApi);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
