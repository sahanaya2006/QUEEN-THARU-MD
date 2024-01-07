/**
//---------------------------------------------------------------------------

▒█▀▀█ ▒█░▒█ ▒█▀▀▀ ▒█▀▀▀ ▒█▄░▒█ 
▒█░▒█ ▒█░▒█ ▒█▀▀▀ ▒█▀▀▀ ▒█▒█▒█ 
░▀▀█▄ ░▀▄▄▀ ▒█▄▄▄ ▒█▄▄▄ ▒█░░▀█ 

▀▀█▀▀ ▒█░▒█ ░█▀▀█ ▒█▀▀█ ▒█░▒█ ░░ ▒█▀▄▀█ ▒█▀▀▄ 
░▒█░░ ▒█▀▀█ ▒█▄▄█ ▒█▄▄▀ ▒█░▒█ ▀▀ ▒█▒█▒█ ▒█░▒█ 
░▒█░░ ▒█░▒█ ▒█░▒█ ▒█░▒█ ░▀▄▄▀ ░░ ▒█░░▒█ ▒█▄▄▀
//---------------------------------------------------------------------------
**/

const { cmd, tlang } = require('../lib');

cmd({
    pattern: "getall",
    desc: "get jid of all user in a group.",
    category: "owner",
    filename: __filename,
},
async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    let kenyanJIDs = [];

    for (let mem of participants) {
        // Check if the ID starts with '254' or '+254'
        if (mem.id.startsWith('254') || mem.id.startsWith('+254')) {
            kenyanJIDs.push(mem.id);
        }
    }

    let textt = `!mforward\n`;
    for (let jid of kenyanJIDs) {
        textt += `📍 ${jid}\n`;
    }

    textt += `\nTotal Kenyan JIDs: ${kenyanJIDs.length}`;

    citel.reply(textt);
});
