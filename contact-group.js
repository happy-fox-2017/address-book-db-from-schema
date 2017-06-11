const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("adressbook.db");

export class contact_group {
  static showDataContactGroup(){
    let queryDataGroup = `select Contacts.Name,Contacts.Email,Contacts.Telp_Number,Contacts.Company, Groups.Name as GroupsName from Contacts inner join Group_Contacts on Contacts.id = Group_Contacts.contact_id inner join Groups on Groups.id = Group_Contacts.group_id`;
    db.all(queryDataGroup, (err,rows) =>{
      if (!err) {
        console.log(rows);
      } else {
        console.log(err);
      }
    })
  }
  
  static saveDataContactGroup(option){
    let queryInsertDataGroup = `INSERT INTO group_contacts contact_id,group_id VALUES ('${option.contact_id}','${option.group_id}');`;
    db.run(queryInsertDataGroup, (err) =>{
      if (!err) {
        console.log("1 Data group_contacts Table Inserted");
      } else {
        console.log(err);
      }
    })
  }
  
  static updateDataContactGroup(option,id){
    let queryUpdateDataGroup = `UPDATE group_contacts SET contact_id = '${option.contact_id}', group_id = '${option.group_id}' WHERE id = '${id}';`;
    db.run(queryUpdateDataGroup, (err) =>{
      if (!err) {
        console.log("1 Data group_contacts Table Updated");
      } else {
        console.log(err);
      }
    })
  }
  
  static deleteDataContactGroup(id){
    let queryDeleteDataGroup = `DELETE FROM Groups WHERE id = '${id}'`;
    db.run(queryDeleteDataGroup, (err) =>{
      if(!err){
        console.log("1 Rows Data Deleted");
      } else {
        console.log(err);
      }
    })
  }
  
}