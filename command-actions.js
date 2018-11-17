const fs = require('fs');

let add = (key, command) => {
    let notes = [];
    let note = {
        key,
        command
    };

    try {
        let notesString = fs.readFileSync("command-repo.json");
        notes = JSON.parse(notesString);
    } catch(exception) {}

    let duplicateNotes = notes.filter((note) => note.key === key);
    
    if(duplicateNotes.length === 0) {
        notes.push(note);
        fs.writeFileSync('command-repo.json', JSON.stringify(notes));
    }else {
        console.log("The command " + key + " already exists!");
    }
    
};

let getAll = () => {
    try {
        let notesString = fs.readFileSync("command-repo.json");
        notes = JSON.parse(notesString);
    } catch(exception) {}
    
    notes.forEach(element => {
        console.log(notes);
    });

};

let read = (key) => {
    console.log("Reading ", key);
};

let remove = (key) => {
    console.log("Removing ", key);
};

module.exports = {
    add,
    getAll,
    read,
    remove
}