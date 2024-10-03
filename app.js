const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { exec } = require('child_process');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const PORT = 3005;

// Define a route for the root URL
app.get('/', (req, res) => {
    console.log("Received a request at the root URLddd");
    res.send('successfully updated the major changes occureddddddd');
});

// Webhook route for handling GitHub events
app.post('/web-hooks', (req, res) => {
    const event = req.headers['x-github-event'];
    console.log(`Received event: ${event}`);

    if (event === 'push') {
        // Modify the command to stash changes before pulling
        exec('cd /home/bonna25 && git stash && git pull && npm install && pm2 restart bonna25', (err, stdout, stderr) => {
            if (err) {
                console.error(`Exec error: ${err.message}`);
                return res.status(500).send('Server Error');
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return res.status(500).send('Server Error');
            }
            console.log(`Stdout: ${stdout}`);
            res.status(200).send('Update successful');
        });
    } else {
        console.log(`Unsupported event: ${event}`);
        res.status(400).send('Event not supported');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
