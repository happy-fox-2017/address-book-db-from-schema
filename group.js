"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose()
let file = 'address_book.db';
let db = new sqlite.Database(file);

export class Groups {
    
    static insertGroup(name){
      let add = `INSERT INTO groups(name) VALUES('${name}')`;
      db.run(add,(err) => {
        if (err) {
          console.log(err);
        }else {
          console.log('data groups successfully INSERTed');
        }
      })
    }
    
    static updateGroup(id,name){
      let updateData = `UPDATE groups SET name = '${name}'
                        WHERE groups.id = '${id}'`;
      db.run(updateData, (err) => {
        if (err) {
          console.log(err);
        }else {
          console.log('data groups successfully updated');
        }
      })
    }
    
    static deleteGroup(id){
      let deleteData = `DELETE FROM groups WHERE groups.id = '${id}'`;
      db.run(deleteData,(err) => {
        if (err) {
          console.log(err);
        }else {
          console.log('data groups successfully deleted');
        }
      })
    }
    
    static showGroup(){
      let show = `SELECT * from groups`;
      db.all(show, (err,rows) => {
        if (err) {
          console.log(err);
        }else {
          console.log(rows);
        }
      })
    }
    
    static help(){
      let help = `insertGroup(name)\n updateGroup(id,name)\n deleteGroup(id)\n showGroup()\n help()`;
      console.log(help);
    }
    
}

// let replServer = repl.start('>> ');
// replServer.context.insertGroup = Groups.insertGroup;
// replServer.context.updateGroup = Groups.updateGroup;
// replServer.context.deleteGroup = Groups.deleteGroup;
// replServer.context.showGroup = Groups.showGroup;
// replServer.context.help = Groups.help;