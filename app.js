const express = require('express');
const app = express();
const PORT = 3005;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!ddd');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
