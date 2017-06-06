"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

// let replServer = repl.start('>> ');

 export class Contacts {
  
  static addData(name,company,telp_number,email){
    let regexPhone = /^\d{10,13}$/;
    let regexEmail = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/;
    if (regexPhone.test(telp_number) === false || regexEmail.test(email) === false) {
      console.log("Incorrect phone or email. Please input numbers between 10-13 length and input email format correctly.");
    }else {
      let addData = `INSERT INTO contacts(name,company,telp_number,email) 
                     VALUES('${name}','${company}','${telp_number}','${email}')`;
      db.run(addData, (err) => {
        if (err) {
          console.log(err);
        }else {
          console.log('data contacts successfully INSERTed');
        }
      })
    }
  }
  
  static updateData(id,name,company,telp_number,email){
    let updateData = `UPDATE contacts SET name = '${name}', company = '${company}', telp_number = '${telp_number}', email = '${email}'
                      WHERE contacts.id = '${id}'`;
    db.run(updateData, (err) => {
      if (err) {
        console.log(err);
      }else {
        console.log('data contacts successfully updated!');
      }
    })
  }
  
  static deleteData(id){
    let deleteData = `DELETE FROM contacts WHERE contacts.id = '${id}'`;
    db.run(deleteData, (err) => {
      if (err) {
        console.log(err);
      }else {
        console.log('data contacts successfully deleted');
      }
    })
  }
  
  static showData(){
    let show = `SELECT contacts.*, groups.name as namaGroup 
                FROM contacts 
                LEFT JOIN contact_groups ON contacts.id = contact_groups.contact_id
                LEFT JOIN groups ON groups.id = contact_groups.group_id`;
    db.all(show, (err,rows) => {
      if (err) {
        console.log(err);
      }else {
        console.log(rows);
      }
    })
  }
  
  static help(){
    let help = `addData(name,company,telp_number,email)\n updateData(id,name,company,telp_number,email)\n deleteData(id)\n showData()`;
    console.log(help);
  }
  
}

// replServer.context.addData = Contacts.addData;
// replServer.context.updateData = Contacts.updateData;
// replServer.context.deleteData = Contacts.deleteData;
// replServer.context.showData = Contacts.showData;