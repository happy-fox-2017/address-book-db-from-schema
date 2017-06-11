const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("adressbook.db");
const repl = require('repl');

export class Contact {
  static showDataContact(){
    let queryDataContact = `Select * From Contacts`
    db.all(queryDataContact, (err,rows) =>{
      if (!err) {
        console.log(rows);
      } else {
        console.log(err);
      }
    })
  }
  
  static saveDataContact(option){
    //Validasi Nomor Telepon dan Email;
    let rTelepon = /^\d{10,13}$/;
    let rEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(rTelepon.test(option.Telp_Number) == true && rEmail.test(option.Email) == true ){
      let queryInsertDataContact = `INSERT INTO Contacts(Name,Company,Telp_Number,Email) VALUES ('${option.Name}','${option.Company}','${option.Telp_Number}','${option.Email}');`;
      db.run(queryInsertDataContact, (err) =>{
        if (!err) {
          console.log('1 Rows Data Inserted');
        } else {
          console.log(err);
        }
      })
    } else {
      console.log("Please Insert Email or Phone Number Right");
    }
  }
  
  static updateDataContact(option,id){
    let updateContact = `UPDATE Contacts SET Name = '${option.Name}', Company = '${option.Company}', Telp_Number = '${option.Telp_Number}', Email = '${option.Email}' WHERE id = '${id}'`
    db.run(updateContact, (err) =>{
      if (!err) {
        console.log('1 Rows Data Updated');
      } else {
        console.log(err);
      }
    })
  }
  
  static deleteDataContact(id){
    let deleteContact = `Delete From Contacts WHERE id = '${id}'`;
    db.run(deleteContact, (err) =>{
      if (!err){
        console.log('1 Rows Data Deleted');
      } else {
        console.log(err);
      }
    })
  }
  
}

//saveDataContact({Name:"Angga",Company:"Hacktiv8",Telp_Number:"02154123121",Email:"antoniangga@gmail.com"})
