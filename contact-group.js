"use strict"

const repl = require("repl");
const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

export class Contact_Groups {
    
    static insertContactIdToGroup(contact_id,group_id){
      let add = `INSERT INTO Contact_Groups(contact_id,group_id) VALUES('${contact_id}','${group_id}')`;
      db.run(add,(err) => {
        if (err) {
          console.log(err);
        }else {
          console.log('data successfully add');
        }
      })
    }
    
    static showContactGroup(){
      let show = `SELECT groups.name as nama_groups, contacts.*
                  FROM contacts 
                  LEFT JOIN contact_groups ON contacts.id = contact_groups.contact_id
                  LEFT JOIN groups ON groups.id = contact_groups.group_id`;
      db.each(show,(err,rows) => {
        if (err) {
          console.log(err);
        }else {
          console.log(rows);
        }
      })
    }
    
    static help(){
      let show = `insertContactIdToGroup(contact_id, group_id)\n showContactGroup()\n help()`;
      console.log(show);
    }
    
}

// let replServer = repl.start('>> ')
// replServer.context.insertContactIdToGroup = Contact_Groups.insertContactIdToGroup;
// replServer.context.showContactGroup = Contact_Groups.showContactGroup;
// replServer.context.help = Contact_Groups.help;



