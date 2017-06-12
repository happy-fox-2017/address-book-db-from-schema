'use strict'

let Contact = require('./contact.js')
let Group = require('./group.js')
let ContactGroup = require('./contact-group.js')

const repl = require('repl')
const r = repl.start('>> ')

r.context.contact = Contact
r.context.group = Group
r.context.contactgroup = ContactGroup
