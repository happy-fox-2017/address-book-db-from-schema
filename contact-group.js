'use strict'

const sqlite = require('sqlite3').verbose()
const file = 'address.db'
const db = new sqlite.Database(file)

class ContactGroup {
  constructor(options) {
    this.id = options.id
    this.contact_id = options.contact_id
    this.group_id = options.group_id
  }

  static view() {
    let query = `SELECT contacts.name as contact_name,groups.name as group_name from contacts_groups left outer join contacts ON contacts_groups.contact_id = contacts.id ` +
    `left outer join groups on contacts_groups.group_id = groups.id`
    // let query = `Select * from contacts_groups`
    db.all(query, (err,rows) => {
      if (!err) {console.log(rows);}
      else {console.log(err);}
    })
  }
}

export default ContactGroup
