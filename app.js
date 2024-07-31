const express = require('express');
const app = express();
const createMyCustomApi = require('./routes');
const PORT = 9000;

app.use('/api', createMyCustomApi);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
