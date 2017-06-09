'use strict'

import Contact from "./contact.js"
import Group from "./group.js"
import ContactGroup from "./contact-group.js"

// const Contact = require('./contact.js')
// const Group = require('./group.js')
// const ContactGroup = require('./contact-group.js')
const sqlite = require('sqlite3').verbose()
const file = 'address.db'
const db = new sqlite.Database(file)
const repl = require('repl')
const replServer = repl.start(">> ")

// let fajar = new Contact('fajar')
// console.log(fajar);
// console.log(Contact.view());

replServer.context.Contact = Contact
replServer.context.ContactGroup = ContactGroup
replServer.context.Group = Group


// let contactGroup = new ContactGroup()
// let grup = new Group()
