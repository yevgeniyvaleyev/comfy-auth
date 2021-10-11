const express = require('express');
const path = require('path');

/**
 * This server is only  needed for demo deploy.
 */
const app = express();

app.use(express.static(__dirname + '/dist/comfy-auth'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/comfy-auth/index.html'));
});


app.listen(process.env.PORT || 8000);
