"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

// let replServer = repl.start('>> ');

export class Contacts {
  static addData(data) {
    if (phoneVal(data.phone) && data.phone.length <= 13 && data.phone.length >= 10) {
      if (emailVal(data.email)) {
        let query = `INSERT INTO Contacts(name,company,telp_number,email) VALUES('${data.name}','${data.company}','${data.telp_number}','${data.email}');`;
        db.serialize(function() {
          db.run(query, function(err) {
            if (err) {
              console.log(err);
            }
          });
        });
      }
    }

  }

  static updateData(data) {
    let query = `UPDATE Contacts SET name = '${data.name}', company = '${data.company}', telp_number = '${data.telp_number}', email = '${data.email}' WHERE Contacts.id = '${data.id}';`;
    db.serialize(function() {
      db.run(query, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static deleteData(id) {
    let query = `DELETE FROM Contacts WHERE Contacts.id = '${id}'`;
    db.serialize(function() {
      db.run(query, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static showData() {
    let query = `select Contacts.*,Groups.name as 'group_name' from Contacts
    join Group_Contacts on Contacts.id = Group_Contacts.contact_id
    join Groups on Group_Contacts.groups_id = Groups.id`;
    db.serialize(function() {
      db.all(query, function(err, rows) {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      });
    });
  }
}

let phoneVal = (phone) => {
  let regex = /^\d+$/g
  return (regex.test(phone)) ? true : false

}

let emailVal = (email) => {
  let regex = /.+@.+\..+/g
  return (regex.test(email)) ? true : false

}

// module.exports = Contacts;