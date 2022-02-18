const app = require('./app')
const db = require('./db');
require('dotenv').config();


const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

app.listen(app.get('port'), () =>
        console.log(`Server running at http://localhost:${app.get('port')}`)
);