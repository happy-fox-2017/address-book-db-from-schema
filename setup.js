const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("adressbook.db");

let queryCreateContact = `CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(100), Company VARCHAR(100), Telp_Number VARCHAR(100), Email VARCHAR(100));`;

let queryCreateGroup = `CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(100));`;

let queryCreateGroupContacts = `CREATE TABLE IF NOT EXISTS Group_Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER, FOREIGN KEY(contact_id) REFERENCES Contacts (id), FOREIGN KEY(group_id) REFERENCES Groups(id) );`;
  
let createTable = () => { 
  db.serialize(() =>{
  db.run(queryCreateContact, (err) =>{
    if (!err) {
      console.log('Sukses Dalam Create Table Contacts');
    } else {
      console.log(err);
    }
  })
  
  db.run(queryCreateGroup, (err) =>{
    if (!err) {
      console.log("Sukses Dalam Create Table Group");
    } else {
      console.log(err);
    }
  })
  
  db.run(queryCreateGroupContacts, (err) =>{
    if(!err) {
      console.log("Suskes Dalam Create Table Group Contacts");
    } else {
      console.log(err);
    }
  })
})
}

createTable();