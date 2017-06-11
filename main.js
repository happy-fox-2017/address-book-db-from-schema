import {Contact} from "./contact.js";
import {Group} from "./group.js";
import {contact_group} from "./contact-group.js";
const repl = require('repl');

function help(){
  console.log("---Helper----");
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