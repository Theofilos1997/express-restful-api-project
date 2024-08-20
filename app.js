const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = 9000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);
