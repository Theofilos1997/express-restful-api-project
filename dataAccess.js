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

module.exports = {loadMembers, saveMembers};
