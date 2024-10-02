const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { exec } = require('child_process');
app.use(bodyParser.json());


const PORT = 3005;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World! bonna 25');
});


// Webhook route
app.post('/web-hooks', (req, res) => {
    // Ensure the request is from GitHub
    const event = req.headers['x-github-event'];

    if (event === 'push') {
        // Replace '/path/to/project' with the path to your project
        exec('cd /home/bonna25 && git pull && npm install && pm2 restart bonna25', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error: ${err.message}`);
                return res.status(500).send('Server Error');
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return res.status(500).send('Server Error');
            }
            console.log(`stdout: ${stdout}`);
            res.status(200).send('Update successful');
        });
    } else {
        res.status(400).send('Event not supported');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
