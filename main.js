import {Contact} from "./contact.js";
import {Group} from "./group.js";
import {contact_group} from "./contact-group.js";
const repl = require('repl');

function help(){
  console.log("-----Helper----");
  console.log("\n ----Contact----");
  console.log("showDataContact()\nsaveDataContact(Object)\nupdateDataContact(Object,id)\ndeleteDataContact(id)");
  console.log("\n ----Group----");
  console.log("showDataGroup()\nsaveDataGroup(Object)\nupdateDataGroup(Object,id)\ndeleteDataGroup(id)");
  console.log("\n ----contact_group----");
  console.log("showDataContactGroup()\nsaveDataContactGroup(Object)\nupdateDataContactGroup(Object,id)\ndeleteDataContactGroup(id)");
}

let replServer = repl.start('>> ');

replServer.context.showDataContact = Contact.showDataContact;
replServer.context.updateDataContact = Contact.updateDataContact;
replServer.context.deleteDataContact = Contact.deleteDataContact;
replServer.context.showDataContact = Contact.showDataContact;

replServer.context.showDataGroup = Group.showDataGroup;
replServer.context.saveDataGroup = Group.saveDataGroup;
replServer.context.updateDataGroup = Group.updateDataGroup;
replServer.context.deleteDataGroup = Group.deleteDataGroup;

replServer.context.showDataContactGroup = contact_group.showDataContactGroup;
replServer.context.saveDataContactGroup = contact_group.saveDataContactGroup;
replServer.context.updateDataContactGroup = contact_group.updateDataContactGroup;
replServer.context.deleteDataContactGroup = contact_group.deleteDataContactGroup;
replServer.context.help = help() ;