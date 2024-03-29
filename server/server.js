const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Set up CORS middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');
require('./routes/note.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000");
});
