class Group {
  constructor(options) {
    this.id = options.id
    this.name = options.name
  }

  create() {
    let obj = this
    let query = `INSERT INTO groups (name) VALUES ('${this.name}');`
    db.run(query, function (err) {
      if (!err) {
        Group.id = this.lastID
        console.log(`name : ${obj.name} with id : ${this.lastID} has been inserted`);
      }
      else {console.log(err);}
    })
  }

  update() {
    let group = this
    let lastRow = `SELECT * FROM groups ORDER BY id DESC LIMIT 1`
    db.all(lastRow, (err, rows) => {
      let update = `UPDATE groups SET name = '${group.name}' WHERE id = ${rows[0].id};`;
      db.run(update, function (err) {
        if (!err) {
          console.log(`success update ${group.name}`);
        } else {console.log(err);}
      })
      if (!err) {console.log(`success read last row`);}
    })
  }
  remove(id) {
    let deleteGroup = `DELETE from groups where id=${+id}`
    db.serialize(function () {
      db.run(query, err => {
        let deleteGroupContact = `update from groups_contacts set group_id=null where group_id=${+id}`
        db.run(query, err => {
          if (!err) console.log(`deleted id ${id on contact_group table}`);
          else {console.log(err);}
        })
        if (!err) {console.log(`deleted id ${id} on groups table`);}
        else {console.log(err);}
      })
    })
  }
  view() {
    let query = `SELECT * from groups;`
    db.run(query, rows => {
      if (!err) {console.log(rows);}
      else {console.log(err);}
    })
  }
}
}
