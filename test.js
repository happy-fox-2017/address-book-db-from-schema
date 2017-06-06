const sqlite = require('sqlite3').verbose()
let file = 'dummy.db'
const db = new sqlite.Database(file)

function createContacts() {
  let query = `Create Table IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL, company VARCHAR(100),` +
  `telp_number VARCHAR(50),email VARCHAR(100) UNIQUE)`
  db.run(query, err => {
    if (!err) {console.log(`table contacts created`);}
    else {console.log(err);}
  })
}

function seedContacts() {
  let obj = this
  let query = `INSERT INTO contacts (name,company,telp_number,email) VALUES ('${obj.name}','${obj.company}','${obj.telp_number}',`${obj.email}`);`
  db.run(query, function (err) {
    if (!err) {
      obj.id = this.lastID
      console.log(`name : ${obj.name} with id : ${this.lastID} has been inserted`);
    }
    else {console.log(err);}
  })

  // db.serialize(function() {
  //   db.run(query, function (err, result){
  //     if(err) {
  //       console.log(err)
  //     } else {
  //       obj.id = this.lastID;
  //       console.log(`ID ${obj.id} has been inserted`)
  //     }
  //   })
  // })
}


db.serialize(() => {
  createContacts()
  seedContacts()
})
db.close()
