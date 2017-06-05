const sqlite = require('sqlite3').verbose()
let file = 'address.db'
const db = new sqlite.Database(file)

function createContacts() {
  let query = `Create Table IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL, company VARCHAR(100),` + 
  `telp_number VARCHAR(50),email VARCHAR(100) UNIQUE)`
  db.run(query, err => {
    if (!err) {console.log(`table contacts created`);}
    else {console.log(err);}
  })
}

function seedContacts() {
  let query = `INSERT INTO contacts (name,company,telp_number,email) VALUES ('azwa','microsoft','089-877-666','azwa@gmail.com'),` + 
  `('rasya','apple','087-877-000','rasya@gmail.com'),('razor','samsung','087-777-000','rasya@facebook.com');`
  db.run(query, err => {
    if (!err) {console.log(`data inserted into contacts`);}
    else {console.log(err);}
  })
}

function createGroups() {
  let query = `Create Table IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) UNIQUE)`
  db.run(query, err => {
    if (!err) {console.log(`table groups created`);}
    else {console.log(err);}
  })
}

function seedGroups() {
  let query = `INSERT INTO groups (name) VALUES ('family'),('friend'),('college')`
  db.run(query, err => {
    if (!err) {console.log(`data inserted to groups table`);}
    else {console.log(err);}
  })
}

function setup() {
  db.serialize(function () {
    createContacts()
    seedContacts()
    createGroups()
    seedGroups()
  })
}
setup()
  
