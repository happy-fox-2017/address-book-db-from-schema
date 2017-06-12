"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let r = repl.start('> ');

var file = 'address_book.db';
var db = new sqlite.Database(file);

class setup{
  constructor(){
  }
  
  createTable(){
    let TABLE_CONTACTS = `CREATE TABLE IF NOT EXISTS contacts (id INT PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), company VARCHAR(20), telp_number VARCHAR(20) UNIQUE, email VARCHAR(20) UNIQUE)`;
    let TABLE_GROUP = `CREATE TABLE IF NOT EXISTS group (id INT PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`;
    let TABLE_GROUP_CONTACTS = `CREATE TABLE IF NOT EXISTS group_contact (id INT PRIMARY KEY AUTOINCREMENT, contact_id INT, group_id INT, FOREIGN KEY(contact_id) REFERENCES contact(id), FOREIGN KEY(group_id) REFERENCES group(id))`;
    
    db.serialize(() => {
      db.run(TABLE_CONTACTS, err =>{
        (!err) ? console.log(`table contact created`) : console.log(err);
      });
      db.run(TABLE_GROUP, err => {
        (!err) ? console.log(`table group created`): console.log(err);
      });
      db.run(TABLE_GROUP_CONTACTS, err =>{
        (!err) ? console.log(`table group_contact created`) : console.log(err);
      });
    });
  }
    
}

r.context.createTable = createTable;
r.context.seedData = seedData;
module.exports = Setup;
