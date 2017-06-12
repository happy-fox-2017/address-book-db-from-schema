'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db')


class Group{
  constructor(components){
    this.id = components.id || null
    this.name = components.name
  }
  
  static add(name){
    let ADD_GROUP = `INSERT INTO groups (name) VALUES ('${name}');`;
    db.run(ADD_GROUP, function(err){
      if(!err){
        console.log(`Successfully add ${name} as new group`);
      } else {
        console.log(err);
      }
    })
  }
  
  static deleteGroup(id){
    let DELETE_GROUP = `Delete from groups where id = '${id}';`;
    db.all(DELETE_GROUP, function(err,rows){
      if(!err){
        rows.forEach((data)=>{
          console.log(`${data.name} deleted!`);
        })  
      } else {
        console.log(err);
      }
    })
  }
  
  static update(name,new_name,id){
    let UPDATE_GROUP = `Update groups set '${name}' = '${new_name}' where id = '${id}';`;
    db.all(UPDATE_GROUP, function(err,rows){
      if(!err){
        rows.forEach((data) => {
          console.log(`${data.name} updated!`);
        })
      } else {
        console.log(err);
      }
    })
  }
  
  static show(){
    let SHOW_GROUP = `Select * from groups`
    db.all(SHOW_GROUP, function(err,rows){
      if(!err){
        console.log(`Table groups list:`);
        rows.forEach((data) => {
          console.log(`\nGroup Id: ${data.id}. Group Name: ${data.name}.`);
        })
      } else {
        console.log(err);
      }
    })
  }
  
  // save() {
  //   let id = this.id,
  //   name = this.name,
  //   obj = this;
  //   if(this.id === null){
  //     db.serialize(function(){
  //       db.run(`INSERT INTO groups (name) VALUES ('${name}');`,function(err){
  //         if(!err){
  //           obj.id = this.lastID;
  //           console.log(`ID:${obj.id} Name:${name} inserted`)
  //         } else {
  //           console.log(err.message)
  //         }
  //       })
  //     })
  //   } else {
  //     db.serialize(function(){
  //       db.run(`UPDATE groups SET name = '${name}' WHERE id = ${id};`, function(err){
  //         if(!err){
  //           console.log(`id ${id} updated`)
  //         } else {
  //           console.log(err.message)
  //         }
  //       })
  //     })
  //   }
  // }

} // end of Group

module.exports = Group