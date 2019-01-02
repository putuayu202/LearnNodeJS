var mysql = require('mysql');
var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }))

var con = mysql.createConnection({
  host: "35.187.247.47",
  user: "prakerin",
  password: "prakerin123",
  database: "db_prakerin"
});

var con2 = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: " ",
  database: "db_user"
});


app.get('/', function (req, res) {
  	res.send('WELCOME TO MOBEL LEJEN')
})

app.get('/insert', function (req, res) { 
   	var sql = "INSERT INTO mst_user (username, password, email) VALUES ('tinggi','bangor','muh.zidan88@gmail.com')";
  	con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 data telah masuk");
  });
res.json({ status: "sukses"});
});

app.get('/update', function (req, res) {
	if (err) throw err;
  	console.log("Connected!");
  	var sql = "UPDATE mst_user SET username = 'togor' WHERE password = 'bangor'";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
   		console.log("1 data telah diupdate");
	});
 	res.send('1 data telah diupdate')
})

app.get('/delete', function (req, res) {
   var sql = "DELETE FROM mst_user WHERE id='89'";
  	con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("DELETED");
  });
res.json({ status : "berhasil"});
})

app.get('/select', function (req, res) {
  	con.query("SELECT * FROM mst_user", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
res.send("hehe");
});

app.use(bodyParser.json());
app.post('/masuk', function (req, res) {
  var snapshot=req.body;
  var username=""; 
  var password=""; 
  var email="";
  if (snapshot.username !=null){username=snapshot.username}
  if (snapshot.password !=null){password=snapshot.password}
  if (snapshot.email !=null){email=snapshot.email}
  
   var sql = "INSERT INTO mst_user (username, password, email) VALUES ('"+username+"','"+password+"','"+email+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("INSERTED");
  });
res.json({ status: 'success', email : email });
});

app.use(bodyParser.json());
app.post('/ubah', function (req, res) {
  var snapshot=req.body;
  var id="";
  var username=""; 
  var password=""; 
  var email="";
  if (snapshot.id !=null){id=snapshot.id}
  if (snapshot.username !=null){username=snapshot.username}
  if (snapshot.password !=null){password=snapshot.password}
  if (snapshot.email !=null){email=snapshot.email}
  
   var sql = "UPDATE mst_user SET  username = '"+username+"', password ='"+password+"', email = '"+email+"' WHERE id = '"+id+"' ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("UPDATED");
  });
res.json({ status : "success"});
});

app.use(bodyParser.json());
app.post('/apus', function (req, res) {
  var snapshot=req.body;
  var id="";
  if (snapshot.id !=null){id=snapshot.id}
  
   var sql = "DELETE FROM mst_user WHERE id = '"+id+"'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("DELETED");
  });
res.json({ status : "berhasil didelete data"});
});



//Mengirim email
app.post('/sendemail', function (req, res){
  var transporter = nodemailer.createTransport({
    service: 'zoho',
    auth: {
        user: 'danov123@zoho.com',
        pass: 'D.a.N.o.V123'
    }
});

var mailOptions = {
    from: 'danov123@zoho.com',
    to: 'dwikydanov39@gmail.com',
    subject: 'testing',
    text: 'halo ipancup',
    html: '<h1>Welcome</h1><p>That was easy!</p><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zC__dNjiy5xcbW-Z--31CLuEIu9jncQNP8zSAWhR6SwuSABc">'
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});
res.json({ status : "berhasil mengirim"});
})

//pake sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_user', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

define: {
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'path/to/database.sqlite'
});

//PAKE SEQUELIZE

app.get('/testsequelize', function (req, res) {
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
   res.json({ status : "HELLO WORLD"});
})

app.get('/createsequelize', function (req, res) {
  const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});
   res.json({ status : "Halo Dunia"});
})

app.get('/selectsequelize', function (req, res) {
  sequelize.query("SELECT * FROM user", { type: Sequelize.QueryTypes.SELECT }).then(myTableRows => {
  console.log(myTableRows);
  res.send(myTableRows);
  });
})

app.post('/insertsequelize', function (req, res) {
  var snapshot = req.body;
  var firstName = " ";
  var lastName = " ";
  if (snapshot.firstName !=null){firstName=snapshot.firstName}
  if (snapshot.lastName !=null){lastName=snapshot.lastName}
  sequelize.query("INSERT INTO user (firstName, lastName) VALUES ('"+firstName+"','"+lastName+"')");
  console.log("INSERTED");
  res.send("HELLO ITS ME");
});

app.post('/updatesequelize', function (req, res) {
  var snapshot = req.body;
  var firstName = " ";
  var lastName = " ";
  var id = " ";
  if (snapshot.firstName !=null){firstName=snapshot.firstName}
  if (snapshot.lastName !=null){lastName=snapshot.lastName}
  if (snapshot.id !=null){id=snapshot.id}
  sequelize.query("UPDATE user SET firstName = '"+firstName+"', lastName = '"+lastName+"' WHERE id = '"+id+"'");
  console.log("UPDATED ");
  res.send("HELLO ITS ME");
  });

app.post('/deletesequelize', function (req, res) {
  var snapshot = req.body;
  var id = " ";
  if (snapshot.id !=null){id=snapshot.id}
  sequelize.query("DELETE FROM `user` WHERE `user`.`id` = '"+id+"'");
  console.log("DELETED");
  res.send("HELLO ITS ME");
});
//selesai sequelize

//pake localhost
app.get('/insert2', function (req, res) { 
   	var sql = "INSERT INTO tbl_user (username, password) VALUES ('tinggi','bangor')";
  	con2.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 data telah masuk");
  });
res.json({ status: "sukses"});
});

app.get('/update2', function (req, res) {
	if (err) throw err;
  	console.log("Connected!");
  	var sql = "UPDATE tbl_user SET username = 'togor' WHERE password = 'bangor'";
  	con2.query(sql, function (err, result) {
    	if (err) throw err;
   		console.log("1 data telah diupdate");
	});
 	res.send('1 data telah diupdate')
})

app.get('/delete2', function (req, res) {
   var sql = "DELETE FROM tbl_user WHERE id='1'";
  	con2.query(sql, function (err, result) {
    if (err) throw err;
    console.log("DELETED");
  });
res.json({ status : "berhasil"});
})

app.get('/select2', function (req, res) {
  	con2.query("SELECT * FROM tbl_user", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
res.send("hehe");
});

app.use(bodyParser.json());
app.post('/masuk2', function (req, res) {
  var snapshot=req.body;
  var username=""; 
  var password=""; 
  var email="";
  if (snapshot.username !=null){username=snapshot.username}
  if (snapshot.password !=null){password=snapshot.password}
  if (snapshot.email !=null){email=snapshot.email}
  
   var sql = "INSERT INTO tbl_user (username, password, email) VALUES ('"+username+"','"+password+"','"+email+"')";
  con2.query(sql, function (err, result) {
    if (err) throw err;
    console.log("INSERTED");
  });
res.json({ status: 'success', email : email });
});

app.use(bodyParser.json());
app.post('/ubah2', function (req, res) {
  var snapshot=req.body;
  var id="";
  var username=""; 
  var password=""; 
  var email="";
  if (snapshot.id !=null){id=snapshot.id}
  if (snapshot.username !=null){username=snapshot.username}
  if (snapshot.password !=null){password=snapshot.password}
  if (snapshot.email !=null){email=snapshot.email}
  
   var sql = "UPDATE tbl_user SET  username = '"+username+"', password ='"+password+"', email = '"+email+"' WHERE id = '"+id+"' ";
  	con2.query(sql, function (err, result) {
    if (err) throw err;
    console.log("UPDATED");
  });
res.json({ status : "success"});
});

app.use(bodyParser.json());
app.post('/apus2', function (req, res) {
  var snapshot=req.body;
  var id="";
  if (snapshot.id !=null){id=snapshot.id}
  
   var sql = "DELETE FROM tbl_user WHERE id = '"+id+"'";
  con2.query(sql, function (err, result) {
    if (err) throw err;
    console.log("DELETED");
  });
res.json({ status : "berhasil didelete data"});
});


app.listen(3000, '0.0.0.0');
console.log("Server is listening");
