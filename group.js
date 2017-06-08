const sqlite3 = require('sqlite3').verbose();
const db =   new sqlite3.Database('addressbook.db');
//var tableGroup = new Table ( head :{['Group ID', 'Group Name  ']})


class Group {
  constructor(options) {
    this.id = null;
    this.name = options.name;
  }

  save() {
    if(this.id === null) {
      db.serialize( function() {
        let queryInsert = `INSERT INTO groups (name) VALUES ('${name}')`;
        db.run(queryInsert, (err)=> {
          if(!err) {
            console.log(`Insert ${name} Data Group Success`);
          } else {
            console.log(err);
          }
        })
      })
    } else {
      let queryUpdate = `UPDATE groups SET name = '${name}' WHERE id = ${id}`;
      db.run(queryUpdate, (err) => {
        if(!err) {
          console.log(`Update id ${id} Success`);
        }
      })
    }
  }




}

export default Group;
