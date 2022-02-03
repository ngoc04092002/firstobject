const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const cors = require('cors');
const DB = require('./config/DB');
const PassPort = require('./app/middlewares/PassPort');
//config dotenv
require('dotenv').config({ path: path.resolve(__dirname + '/config/.env') });
const handlebars = exphbs.create({
  extname: '.hbs',
  helpers: {
    handleName: function (user1, user2) {
      if (user1) {
        return `<p class="title">${user1.displayName}</p>`
      } else {
        return `<p class="title">${user2.fullname}</p>`
      }
    },
    handleTitle: function (user1, user2) {
      if (user1) {
        return `<p>${user1.fullname}</p>`
      } else {
        return `<p>${user2.fullname}</p>`
      }
    },
    valueInput: function (user1, user2) {
      return user1 ? user1.fullname : user2.fullname;
    },
    handleEmail: function (user2) {
      let index = user2.email.indexOf('@');
      let str = user2.email.substring(0, 2);
      for (let i = 2; i < index; i++) str += '*';
      str += user2.email.substring(index, user2.email.length);
      return str;
    },
    handleDate: function (user2) {
      let html='';
      let index =user2.date;
      for (let i = 1; i <= 31; i++) {
        i==index ? html+=`<option selected value="${i}">${i}</option>` :html+=`<option value="${i}">${i}</option>`;
      }
      return html;
    },
    handleMonth:function (user2) {
      let html='';
      let index = user2.month;
      for (let i = 1; i <= 12; i++) {
        i==index ? html+=`<option selected value="${i}">${i}</option>` :html+=`<option value="${i}">${i}</option>`;
      }
      return html;
    },
    handleYear:function (user2) {
      let html='';
      let index =user2.year;
      const d= new Date();
      let year = d.getFullYear();
      for (let i = 1990; i <= year; i++) {
        i==index ? html+=`<option selected value="${i}">${i}</option>` :html+=`<option value="${i}">${i}</option>`;
      }
      return html;
    },
    radioChecked:function (user2,gender) {
      return user2.gender === gender ? 'checked' : null;
    }

  }
});


DB.connect();
var sess = {
  secret: 'NgocDev04092002',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 12960000000,
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
  sess.cookie.sameSite = 'none'
}

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: 'GET,POST,PUT,DELETE'
  })
);
app.use(cookieParser());
app.use(session(sess));
//css
app.use(express.static(path.join(__dirname, 'public')));
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));
//hbs
app.engine('hbs', handlebars.engine);//new
app.set('view engine', 'hbs');
//views
app.set('views', path.join(__dirname, 'resource', 'views'));
PassPort(app);





router(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
