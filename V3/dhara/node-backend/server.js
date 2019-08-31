const express = require('express');
//Initialize the Express App
let app = express();
const port = 3000;

app.listen(port, () => {
    console.log('Server Running at port 3000');
 });