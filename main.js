"use strict"
import Contact from './contact.js';
import Group from './group.js';
import ContactGroup from './contact-group.js'
const repl = require('repl');
function showHelp() {
  console.log("\n=================================================================");
  console.log("========================== MENU HELP ==============================");
  console.log("===================================================================");
  console.log("Adding new Contact Record  => Contact.create(name,company,phone,email)");
  console.log("Delete Contact By Id       => Contact.update(id,attribute,value)");
  console.log("Showing All Contact Record => Group.show()");
  console.log("Adding New Group Record    => Group.create()");
  console.log("Update Group Record By ID  => Group.update(id)");
  console.log("Showing ALL Group Records  => Group.show()");
  console.log("Assign A Contact Group     => ContactGroup.assign(contact_id,groups_id)");
}

let replServer = repl.start(">>")
replServer.context.showHelp = showHelp
replServer.context.Contact = Contact
replServer.context.Group = Group
replServer.context.ContactGroup = ContactGroup

let person = new Contact ({name : "Fajar Karim"})
replServer.context.person = person
