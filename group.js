const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("adressbook.db");

export class Group {
  
  static showDataGroup(){
    let queryDataGroup = `Select * From Groups`;
    db.all(queryDataGroup, (err,rows) =>{
      if (!err) {
        console.log(rows);
      } else {
        console.log(err);
      }
    })
  }
  
  static saveDataGroup(option){
    let queryInsertDataGroup = `INSERT INTO Groups (Name) VALUES ('${option.Name}');`;
    db.run(queryInsertDataGroup, (err) =>{
      if (!err) {
        console.log("1 Data Groups Table Inserted");
      } else {
        console.log(err);
      }
    })
  }
  
  static updateDataGroup(option,id){
    let queryUpdateDataGroup = `UPDATE Groups SET Name = '${option.Name}' WHERE id = '${id}';`;
    db.run(queryUpdateDataGroup, (err) =>{
      if (!err) {
        console.log("1 Data Groups Table Updated");
      } else {
        console.log(err);
      }
    })
  }
  
  static deleteDataGroup(id){
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