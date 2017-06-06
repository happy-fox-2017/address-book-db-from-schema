
class ContactGroup {
  constructor(options) {
    this.id = options.id
    this.contact_id = options.contact_id
    this.group_id = options.group_id
  }

  view() {
    let query = `SELECT * from contacts_groups left outer join contacts ON contacs_groups.contact_id = contacts.id ` +
    `left outer join groups on contacts_groups.group_id = groups.id`
  }
}
