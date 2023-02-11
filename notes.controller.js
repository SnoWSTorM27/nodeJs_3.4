const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json'); 

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title, 
    id: Date.now().toString()
  }
  notes.push(note);

  await writeNotes(notes);
  console.log(chalk.bgGreen("Note was added"));
};

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
};

async function printNotes() {
  const notes = await getNotes()
  console.log(chalk.bgBlue("Here is the list of notes"));
  notes.forEach(note => (
    console.log(chalk.blue(note.id + " " + note.title))
  ))
}
async function writeNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
};
async function removeNote(id) {
  const notes = await getNotes()
  if (notes.findIndex((note) => note.id === id) === -1) {
    console.log(chalk.bgRed("This is ID don't exist"))
  } else {
    const newNotes = notes.filter((note) => id !== note.id)
    await writeNotes(newNotes);
    console.log(chalk.green("Note removed"));
  }
}

async function updateNote({ id, title }) {
  const notes = await getNotes();
  const updatedNotes = notes.map((n) => {
    if (n.id === id) {
      n.title = title
    }
    return n;
  })
  await writeNotes(updatedNotes);
  console.log(chalk.bgCyan("Notes updated"));
}


module.exports = {
  addNote, printNotes, removeNote, getNotes, updateNote
}