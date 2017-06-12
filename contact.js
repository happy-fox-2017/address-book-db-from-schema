'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');

class Contact{
  constructor(obj) {
    this.id = obj.id || null
    this.name = obj.name
    this.company = obj.company
    this.telp = obj.telp
    this.email = obj.email  
  }
  
  static add(name,company,telp,email){
    let ADD_CONTACT = `INSERT INTO contacts (name,company,telp,email) VALUES ('${name}','${company}','${telp}','${email}');`;
    db.run(ADD_CONTACT, function(err){
      if(!err){
        console.log(`Successfully added ${JSON.stringify(name)} as new contact.`);
      } else {
        console.log(err);
      }
    })
  }
  
  static delete(id){
    let DELETE_CONTACT = `DELETE FROM contacts WHERE contact_id = '${id}';`;
    db.all(DELETE_CONTACT, function(err,rows){
      if(!err){
        rows.forEach((data) => {
          console.log(`${data.name} deleted!`);
        })
      } else {
        console.log(err);
      }
    })
  }
  
  static update(column,new_value,id){
    let UPDATE_CONTACT = `UPDATE contacts SET '${column}' = '${new_value}' WHERE contact_id = '${id}';`;
    db.all(UPDATE_CONTACT, function(err,rows){
      if(!err){
        rows.forEach((data) => {
          console.log(`${data.name} deleted!`);
        })
      } else {
        console.log(err);
      }
    })
  }
  
  static show(){
    let SHOW_CONTACT = `SELECT * FROM contacts;`;
    db.all(SHOW_CONTACT, function(err,rows){
      if(!err){
        console.log(`Contacts list:`);
        rows.forEach((data) => {
          console.log(`\nID: ${data.id}. Name: ${data.name}. Company: ${data.company}. telp: ${data.telp}. Email: ${data.email}`);
        })
      } else {
        console.log(err);
      }
    })
  }
  
   save() {
    let id = this.id,
    name = this.name,
    company = this.company,
    telp = this.telp,
    email = this.email,
    obj = this;
    if(Contact.emailValidation(email) || email === null){
      if(Contact.telpValidation(telp) || telp === null){
        if(id === null){
          db.serialize(function() {
            db.run(`INSERT INTO contacts (name, company, telp, email) VALUES ('${name}', '${company}', '${telp}', '${email}');`,function(err){
              if(!err){
                obj.id = this.lastID
                console.log(`ID:${obj.id} Name: ${name} inserted`)
              } else {
                console.log(err.message)
              }
            })
          })
        } else {
          db.serialize(function(){
            db.run(`UPDATE contacts SET name = '${name}', company = '${company}', telp = '${telp}', email = '${email}' WHERE id = ${id};`, function(err){
              if(!err){
                console.log(`ID: ${id} updated`)
              } else {
                console.log(err.message)
              }
            })
          })
        }
      } else {
        console.log('telp number is not valid')
      }
    } else {
      console.log('Email is not valid')
    }
  }
  
   static emailValidation(email){
    let emailPatt =  /^(.*)@(.*)\.(.*)$/;
    if(emailPatt.test(email)){
      return true;
    } else {
      return false;
    }
  }
  
   static telpValidation(telp){
    let telpPatt = /^\d{10,12}$/;
    if (telpPatt.test(telp)){
      return true;
    } else {
      return false;
    }
  }
  
} // end class Contact

// let tes = new Contact({name: 'Nama samaran', company: 'PT Angin Ribut', telp: 1234567890, email: 'iniemail@email.com'})
// tes.save()
// console.log('aaa');

module.exports = Contact