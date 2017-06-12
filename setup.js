"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'address_book.db';
let db = new sqlite.Database(file);

let CREATE_CONTACTS = 'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, name VARCHAR(20) NOT NULL, company VARCHAR(20), telp VARCHAR(10), email VARCHAR(20));';

let CREATE_GROUPS = 'CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, name VARCHAR(20) NOT NULL);';

let CREATE_GROUPS_CONTACTS = 'CREATE TABLE IF NOT EXISTS groups_contacts(group_contact_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, contact_id INTEGER, group_id INTEGER, FOREIGN KEY (contact_id) REFERENCES contacts (id), FOREIGN KEY (group_id) REFERENCES groups (id));';


let createContacts = () => {
  db.serialize(function() {
    db.run(CREATE_CONTACTS, function(err) {
      if (!err) {
        console.log('CREATE_CONTACTS created');
      } else {
        console.log(err);
      }
    })
  })
}

let createGroups = () => {
  db.serialize(function() {
    db.run(CREATE_GROUPS, function(err) {
      if (!err) {
        console.log('CREATE_GROUPS created');
      } else {
        console.log(err);
      }
    })
  })
}

let createGroupsContacts = () => {
  db.serialize(function() {
    db.run(CREATE_GROUPS_CONTACTS, function(err) {
      if (!err) {
        console.log('CREATE_GROUPS_CONTACTS created');
      } else {
        console.log(err);
      }
    })
  })
}

createContacts()
createGroups()
createGroupsContacts()
