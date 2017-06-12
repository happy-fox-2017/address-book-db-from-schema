"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const jsonfile = require('jsonfile')

var replServer = repl.start({
  prompt: ">>",
  input: process.stdin,
  output: process.stdout
})
var file = 'address_book.db';
var db = new sqlite.Database(file);

var createDB = ["CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company VARCHAR(30), phone VARCHAR(20), email VARCHAR(50));", "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);", "CREATE TABLE IF NOT EXISTS contact_group (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, groups_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contact(id), FOREIGN KEY(groups_id) REFERENCES groups(id));"]

var contactData = jsonfile.readFileSync("./contact.json")
var groupData = jsonfile.readFileSync('./group.json')

let createTable = () => {
  db.serialize(function() {
    for(let i = 0; i < createDB.length; i++) {
      db.run(createDB[i], function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('Table created');
        }
      });
    }
  });
}

let seedData = () => {
  db.serialize(function() {
    for(let i = 0; i < 10; i++) {
      let contactSekarang = contactData[i];
      let groupSekarang = groupData[i];
      let queryCon = `INSERT INTO contact (name, company, phone, email) VALUES ('${contactSekarang.name}', '${contactSekarang.company}', '${contactSekarang.phone}', '${contactSekarang.email}');`
      let queryGrp = `INSERT INTO groups (name) VALUES ('${groupSekarang.name}');`
      db.run(queryCon, function(err) {
        if(err) console.log(err);
      })
      db.run(queryGrp, function(err) {
        if(err) console.log(err);
      })
    }
  })
}

replServer.context.createTable = createTable;
replServer.context.seedData = seedData;


// const repl = require('repl')
// const sqlite = require('sqlite3').verbose()
// 
// var file = 'address_book.db'
// var db = new sqlite.Database(file)
// var replStart = repl.start ('>>>')
// 
// //ct = Create Table
// var CT_CONTACT = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), company VARCHAR(100), telp_number VARCHAR, email VARCHAR(50));"
// var CT_GROUP = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR);"
// var CT_GROUP_CONTACT = "CREATE TABLE IF NOT EXISTS group_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER);"
// 
// let createContact = () => {
//   db.serialize(function(){
//     db.run(CT_CONTACT, (err) => {
//       (!err) ? console.log('Table contacts has been created.') : console.log(err);
//     })
//   })
// }
// 
// let createGroup = () => {
//   db.serialize(function(){
//     db.run(CT_GROUP, (err) => {
//       (!err) ? console.log('Table group has been created.') : console.log(err);
//     })
//   })
// }
// 
// let createGroupContact = () => {
//   db.serialize(function(){
//     db.run(CT_GROUP_CONTACT, (err) => {
//       (!err) ? console.log('Table group_contacts has been created.') : console.log(err);
//     })
//   })
// }
// 
// replStart.context.createContact = createContact
// replStart.context.createGroup = createGroup
// replStart.context.createGroupContact = createGroupContact
