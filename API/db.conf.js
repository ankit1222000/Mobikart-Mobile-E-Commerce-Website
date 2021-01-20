const mysql=require("mysql");

const conn=mysql.createConnection({
host:'localhost',
user:'Mobikart',
password:'Mobikart@123',
database:'mobikartdb'


});

module.exports=conn;