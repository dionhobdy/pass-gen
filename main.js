// external package calls
const prompts = require('prompts');
const Table = require('cli-table3');
const gradient = require('gradient-string');
const fs = require('fs');

// create a new table that displays ids, services, usernames and passwords
let table = new Table({
    head: [gradient('plum', 'plum')('ID'), gradient('plum', 'aqua')('Service'), gradient('aqua', 'aqua')('Username'), gradient('aqua', 'white')('Password')],
    colWidths: [5, 20, 20, 20]
});
// the ids, services, usernames and passwords pushed onto the table
table.push(
  ['0', 'Example_Service', 'Example_Username', '****************']
);

// menuBuddy function used to randomly generate a buddy in the main menu
function menuBuddy() {
    // use fs to read the menuBuddy.txt file
    fs.readFile('./buddy/menuBuddy.txt', 'utf8', (err, data) => {
        // if fs returns an error print the error to console
        if (err) { 
            console.error('Error reading file: ', err);
            return;
         }
        var lines0 = data.trim().split('\n');
        const randomIndex0 = Math.floor(Math.random() * lines0.length);
        console.log(gradient('plum', 'aqua', 'white')(lines0[randomIndex0]));
    });
}
// menuBuddyDialog function used to randomly generate the buddy's dialog in the main menu
function menuBuddyDialog() {
    // use fs to read the menuDialog.txt file
    fs.readFile('./buddy/menuDialog.txt', 'utf8', (err, data) => {
        // if fs returns an error print the error to console
        if (err) {
            console.error('Error reading file: ', err);
            return;
        }
        var lines1 = data.trim().split('\n');
        const randomIndex1 = Math.floor(Math.random() * lines1.length);
        console.log(gradient('white', 'aqua', 'plum')(lines1[randomIndex1]));
    });
}
// menuBud class used to create a buddy
class menuBud {
    constructor(buddy, dialog) {
        this.buddy = buddy;
        this.dialog = dialog;
    }
}
// create a new buddy using a variable
let menuBud0 = new menuBud(menuBuddy(), menuBuddyDialog());

// declare variable x to help initiate imported local functions based on user selection
let x;
// ifState0 function that uses the value of x to launch imported local functions
let ifState0 = () => {
    if (x == 0) {
        console.log('add');
    } else if (x == 1) {
        console.log('auto');
    } else if (x == 2) {
        console.log('copy');
    } else {
        ifState1();
    }
}
// ifState1 function used as a continuation of isState0
let ifState1 = () => {
     if (x == 3) {
        console.log('delete');
    } else if (x == 4) {
        console.log('edit');
    } else {
        console.log('options');
    }
}

// application title
console.log(gradient('purple', 'aqua', 'white')(`
██████   █████  ███████ ███████        ██████  ███████ ███    ██ 
██   ██ ██   ██ ██      ██            ██       ██      ████   ██ 
██████  ███████ ███████ ███████ █████ ██   ███ █████   ██ ██  ██ 
██      ██   ██      ██      ██       ██    ██ ██      ██  ██ ██ 
██      ██   ██ ███████ ███████        ██████  ███████ ██   ████                                                   
    `));
// print created credential table to console
console.log(table.toString());
console.log( );
// print buddy and buddy dialog to console
console.log(`${menuBud0.buddy} - ${menuBud0.dialog}`);

// menu function displays the menu and enables the user to select which option they want
let menu = () => {
    (async () => {
        const response = await prompts({
            type: 'select',
            name: 'value',
            message: 'select option',
            choices: [
                { title: 'add credentials' },
                { title: 'auto fill' },
                { title: 'copy credentials' },
                { title: 'delete credentials' },
                { title: 'edit credentials' },
                { title: 'options' }
            ],
            initial: 0
        });
        console.log(response);
        // set the value of x according to the value of the option selected by user
        x = response.value;
        // after the value of x is established initiate function ifState0
        ifState0();
    })();
}

// ensure the menu function is initiated last using setTimeout
setTimeout(menu, 300);

