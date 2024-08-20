const fs = require('fs');

const loadMembers = () => {
    const jsonData = fs.readFileSync(__dirname + "/" + "members.json");
        return JSON.parse(jsonData);
};

const saveMembers = (newData) => {
    const stringifyData = JSON.stringify(newData);
    fs.writeFileSync(__dirname + "/" + "members.json", stringifyData);
};

module.exports = {loadMembers, saveMembers};
