const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const fs = require('fs');

// write your code here
var file = 'addressbook.db';
var db = new sqlite.Database(file);

var CREATE_CONTACTS = 'CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT ,name VARCHAR(50),company VARCHAR(50), phone VARCHAR(20),email VARCHAR(30))';
var CREATE_GROUPS =   'CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT , name VARCHAR(50))';
var CREATE_GROUPS_CONTACTS = 'CREATE TABLE IF NOT EXISTS groups_contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, contacts_id INTEGER, groups_id INTEGER)';

//CREATE TABLE
let createTable = () => {
  db.serialize( function() {
    db.run(CREATE_CONTACTS, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log("Create Table Contacts Success");
      }
    })

    db.run(CREATE_GROUPS, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log("Create Table Groups Success");
      }
    })
    db.run(CREATE_GROUPS_CONTACTS, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log("Create Table Groups Contacts Success");
      }
    })
  })
}

//SEED DATA JSON KE DALAM TABLE
let seedContact = () =>{
  let fileSeedContact = 'contact.json';
  let contactData = fs.readFileSync(fileSeedContact).toString();
  let contactDataJSON = JSON.parse(contactData);
  for(let i = 0 ; i < contactDataJSON.length ; i++) {
    let seedQuery = `INSERT INTO contacts (name,company,phone,email) VALUES ('${contactDataJSON[i].name}','${contactDataJSON[i].company}','${contactDataJSON[i].phone}','${contactDataJSON[i].email}')`;
      db.serialize( function() {
        db.run(seedQuery, (err) => {
          if(err) {
            console.log(err);
          } else {
            console.log('Seed Data Groups Success');
          }
        })
      })
  }
}
//SEED DATA Groups
let seedGroup = () =>{
  let fileSeedGroup = 'group.json';
  let groupData = fs.readFileSync(fileSeedGroup).toString();
  let groupDataJSON = JSON.parse(groupData);
  for(let i = 0 ; i < groupDataJSON.length ; i++) {
    let seedQuery = `INSERT INTO groups (name) VALUES ('${groupDataJSON[i].name}')`;
      db.serialize( function() {
        db.run(seedQuery, (err) => {
          if(err) {
            console.log(err);
          } else {
            console.log('Seed Data Groups Success');
          }
        })
      })
  }
}



const replServer = repl.start('>');
replServer.context.createTable = createTable
replServer.context.seedContact = seedContact
replServer.context.seedGroup = seedGroup
