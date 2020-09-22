require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let user = require('./controllers/user-controller');
let admin = require('./controllers/admin-controller');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(express.json());
app.use('/api', user);
app.use('/api', admin)
app.listen(process.env.PORT, function() {
    console.log('app is listening on port 3000')
});