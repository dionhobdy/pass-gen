const prompts = require('prompts');
const Table = require('cli-table3');
const gradient = require('gradient-string');
const fs = require('fs');

let table = new Table({
    head: [gradient('plum', 'plum')('ID'), gradient('plum', 'aqua')('Service'), gradient('aqua', 'aqua')('Username'), gradient('aqua', 'white')('Password')],
    colWidths: [5, 20, 20, 20]
});

table.push(
  ['0', 'Example_Service', 'Example_Username', '****************']
);

function buddy() {
    fs.readFile('./buddy/menuBuddy.txt', 'utf8', (err, data) => {
        if (err) { 
            console.error('Error reading file: ', err);
            return;
         }
        var lines0 = data.trim().split('\n');
        const randomIndex0 = Math.floor(Math.random() * lines0.length);
        console.log(gradient('plum', 'aqua', 'white')(lines0[randomIndex0]));
    });
}

function buddyDialog() {
    fs.readFile('./buddy/menuDialog.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file: ', err);
            return;
        }
        var lines1 = data.trim().split('\n');
        const randomIndex1 = Math.floor(Math.random() * lines1.length);
        console.log(gradient('white', 'aqua', 'plum')(lines1[randomIndex1]));
    });
}

let x;
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

let ifState1 = () => {
     if (x == 3) {
        console.log('delete');
    } else if (x == 4) {
        console.log('edit');
    } else {
        console.log('options');
    }
}

console.log(gradient('purple', 'aqua', 'white')(`
██████   █████  ███████ ███████        ██████  ███████ ███    ██ 
██   ██ ██   ██ ██      ██            ██       ██      ████   ██ 
██████  ███████ ███████ ███████ █████ ██   ███ █████   ██ ██  ██ 
██      ██   ██      ██      ██       ██    ██ ██      ██  ██ ██ 
██      ██   ██ ███████ ███████        ██████  ███████ ██   ████                                                   
    `));

console.log(table.toString());
console.log();
console.log(`${buddy()} - ${buddyDialog()}`);

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
        x = response.value;
        ifState0();
    })();
}

setTimeout(menu, 300);

