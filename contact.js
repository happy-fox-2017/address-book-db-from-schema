const sqlite3 = require('sqlite3').verbose();
const db =   new sqlite3.Database('addressbook.db');

class Contact {
  constructor(options) {
    this.name = options.name
    this.company = options.company
    this.phone = options.phone
    this.email = options.email
    this.id = null
  }

  // save() {
  //   if(this.id === null) {
  //     db.serialize( function() {
  //       let queryInsert = `INSERT INTO contacts (name,company,phone,email) VALUES ('${this.name}','${this.company}','${this.phone}','${this.email}') `;
  //       db.run(queryInsert, (err)=>{
  //         if(!err) {
  //           console.log('Insert Data Success');
  //         } else {
  //           console.log(err);
  //         }
  //       })
  //     })
  //   } else {
  //     let queryUpdate = `UPDATE contacts SET name = '${name}', company = '${company}', phone = '${phone}', email : '${email}' `;
  //     db.run(queryUpdate, (err) => {
  //       if(!err) {
  //         console.log('Update Data Berhasil');
  //       } else {
  //         console.log(err);
  //       }
  //     })
  //   }
  // }

  static create(name,company,phone,email) {
   let queryAdd = `INSERT INTO contacts (name,company,phone,email) VALUES ('${name}' ,'${company}','${phone}', '${email}')`;
     db.serialize( function() {
       db.run(queryAdd , (err) => {
         if(err) {
           console.log(err);
         } else{
           console.log("Berhasil Menambahkan Data");
         }
       })
     })
  }



  static remove(id) {
   let removeContact = `DELETE  FROM contacts WHERE id = ${id}`
   db.run(removeContact, (err)=>{
     if(err) {
       console.log(err);
     } else {
       console.log("Remove Data Contacts Success");
     }
   })
   let removeGroup = `DELETE FROM groups WHERE id = ${id}`;
   db.run(removeGroup, (err) => {
     if(err) {
       console.log(err);
     } else {
       console.log("Remove Data Groups Success");
     }
   })
  }

  static validateEmail(email) {
    var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
  }

  static validationPhone(phone) {
    if(phone.length < 17) {
      return true;
    }
  }
}

// var contact = new Contact({name: "jajang",company:"Pt KFC",phone:"412489012489",email: "jajang@gamil.com"})
// contact.id;
// create();
// contact.save();
// contact.id;
// contact.name = "Bob"
// contact.save()
export default Contact;
