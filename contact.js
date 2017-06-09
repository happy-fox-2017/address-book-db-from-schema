
const sqlite = require('sqlite3').verbose()
const file = 'address.db'
const db = new sqlite.Database(file)


class Contact {
  constructor(options) {
    this.id = options['id']
    this.name = options['name']
    this.company = options['company']
    this.telp_number = options['telp_number']
    this.group_id = options['group_id']
    this.email = options['email']
  }


  saveCreate() {
    let obj = this
    let query = `INSERT INTO contacts (name,company,telp_number,email) VALUES ('${this.name}','${this.company}','${this.telp_number}','${this.email}');`
    db.run(query, function (err) {
      if (!err) {
        Contact.id = this.lastID
        console.log(`name : ${obj.name} with id : ${this.lastID} has been inserted`);
      }
      else {console.log(err);}
    })
  }

  saveUpdate() {
    let contact = this
    let lastRow = `SELECT * FROM contacts ORDER BY id DESC LIMIT 1`
    db.all(lastRow, (err, rows) => {
      let update = `UPDATE contacts SET name = '${contact.name||rows[0].name}', company = '${contact.company||rows[0].company}', telp_number = '${contact.telp_number||rows[0].telp_number}', email = '${contact.email||rows[0].email}', group_id='${contact.group_id||rows[0].group_id}' WHERE id = ${rows[0].id};`;
      db.run(update, function (err) {
        if (!err) {
          console.log(`success update ${contact.name}`);
        } else {console.log(err);}
      })
      if (!err) {console.log(`success read last row ${rows}`);}
    })
  }
  static remove(id) {
    let deleteContact = `DELETE from contacts where id=${+id}`
    db.run(deleteContact, err => {
      let deleteContactGroup = `DELETE from contacts_groups where contact_id=${+id}`
      db.run(deleteContactGroup, err => {
        if (!err){console.log(`delete id ${id} from contacts_groups table`);}
        else {console.log(err);}
      })
      if (!err) {console.log(`deleted id ${id} in contacs table`);}
      else {console.log(err);}
    })
  }
  static view() {
    let query = `SELECT * from contacts;`
    db.all(query, (err,rows) => {
      if (!err) {console.log(rows);}
      else {console.log(err);}
    })
  }
}


export default Contact

// let contact = new Contact({name:'fajar',company:'cnn',telp_number:'089-123-123',email:'asal@gmail.com'})
// console.log(contact);
// contact.saveCreate()
// Contact.view()
// console.log(contact);
// contact.group_id = 1
// contact.saveUpdate()
