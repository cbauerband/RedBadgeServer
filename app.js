require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(express.json());
app.listen(process.env.PORT, function() {
    console.log('app is listening on port 3000')
});