const express = require('express');
require('dotenv').config();

const upload = require('express-fileupload');
const db = require('./db');
const helmet = require('helmet');
const cors = require('cors');

const tokenValidator = require('./middleware/tokenValidator');
const activeUser = require('./middleware/activeUser');

const { ROLE } = require('./roles');
const {authRole} = require('./middleware/roleValidator');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

const app = express();
app.use(express.json());
app.use(upload());
app.set('port', port);

app.use(helmet());
app.use(cors());

app.use(require('./routes/index'));
app.use('/api/login', require('./routes/login'));
app.use('/api/customers', [tokenValidator.validate, activeUser.get], require('./routes/customers'));
app.use('/api/users', [tokenValidator.validate, activeUser.get, authRole(ROLE.ADMIN)], require('./routes/users'));

app.listen(app.get('port'), () => 
console.log(`GraphSQL Server running at http://localhost:${app.get('port')}`)
);
