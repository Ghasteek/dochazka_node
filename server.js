if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
};

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const monthRouter = require('./routes/month');
const shiftsRouter = require('./routes/shifts');
const inventoryRouter = require('./routes/inventory');
const itemsRouter = require('./routes/items');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set ('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}));
app.use(express.static(__dirname + '/public')); // link "public" directory to root of web, so it can be used in html to link IMG, CSS, JS and others...

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongoDB...'));


app.use('/', indexRouter);
app.use('/month', monthRouter);
app.use('/shifts', shiftsRouter);

app.use('/inventory', inventoryRouter);
app.use('/items', itemsRouter);


app.listen(process.env.PORT || 3000);