
const sqlite = require('sqlite3').verbose()
const file = 'address.db'
const db = new sqlite.Database(file)


class Contact {
  constructor(options) {
    this.id = options['id']
    this.name = options['name'] || null
    this.company = options['company'] || null
    this.telp_number = options['telp_number'] || null
    this.group_id = options['group_id'] || null
    this.email = options['email'] || null
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhone(phone) {
    let status = (phone.length < 17) ? true : false;
    return status
  }


  saveCreate() {
    let contact = this
    let query = `INSERT INTO contacts (name,company,telp_number,email,group_id) VALUES ('${this.name}','${this.company}','${this.telp_number}','${this.email}','${this.group_id}');`

    if (!this.validatePhone(this.telp_number)) {
      return `Validation error,phone number must not more than 17 character`
    }
    if (!this.validateEmail(this.email)) {
      return `Validation error, your email is not valid`
    }

    db.run(query, function (err) {
      if (!err) {
        // Contact.id = this.lastID
        console.log(`name : ${contact.name} with id : ${this.lastID} has been inserted`);
        let insertContactGroup = `INSERT INTO contacts_groups (contact_id,group_id) VALUES ('${this.lastID}','${contact.group_id}')`
        db.run(insertContactGroup, err => {
          if (!err) {console.log(`insert contact to contacts_groups success`);}
          else {console.log(err);}
        })
      }
      else {console.log(err);}
    })
  }

  saveUpdate() {
    let contact = this
    let lastRow = `SELECT * FROM contacts ORDER BY id DESC LIMIT 1`
    db.all(lastRow, (err, rows) => {
      let update = `UPDATE contacts SET name = '${contact.name||rows[0].name}', company = '${contact.company||rows[0].company}', telp_number = '${contact.telp_number||rows[0].telp_number}', email = '${contact.email||rows[0].email}', group_id='${contact.group_id||rows[0].group_id}' WHERE id = ${rows[0].id};`;

      if (!contact.validatePhone(contact.telp_number||rows[0].telp_number)) {
        console.log(`validation error`);
        return `Validation error,phone number must not more than 17 character`
      }
      if (!contact.validateEmail(contact.email||rows[0].email)) {
        console.log(`validation email error`);
        return `Validation error, your email is not valid`
      }

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
