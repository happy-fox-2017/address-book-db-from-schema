const sqlite = require('sqlite3').verbose()
const file = 'address.db'
const db = new sqlite.Database(file)

class Contact {
  constructor(options) {
    this.id = options['id']
    this.name = options['name']
    this.company = options['company']
    this.telp_number = options['telp_number']
    this.email = options['email']
  }

  create() {
    let obj = this
    let query = `INSERT INTO contacts (name,company,telp_number,email) VALUES ('${this.name}','${this.company}','${this.telp_number}','${this.email}');`
    db.run(query, function (err) {
      if (!err) {
        obj.id = this.lastID
        console.log(`${JSON.stringify(obj)}  trus id nya ${obj.id}`);
        // console.log(`${Contact}`);
        console.log(`name : ${obj.name} with id : ${this.lastID} has been inserted`);
      }
      else {console.log(err);}
    })
    console.log(`objeknya ${JSON.stringify(obj)}`);
  }
  update() {
    let obj = this
    console.log(obj);
    let query = `UPDATE contacts SET name = '${this.name}', company = '${this.company}', telp_number = '${this.telp_number}', email = '${this.email}' WHERE id = ${this.id};`;
    // let query = `UPDATE contacts set name='${name}' where id=${obj.id};`
    db.run(query, function (err) {
      if (!err) {
        console.log(`thisnya : ${this}`);
        console.log(`success`);
      } else {console.log(err);}
    })
  }
  remove() {}
  view() {}
}

let contact = new Contact({name:'fajar',company:'cnn',telp_number:'089-123-123',email:'ssrssrr@gmail.com'})
console.log(contact);
contact.create()
console.log(contact);
// contact.name = 'rozak'
// contact.update()
