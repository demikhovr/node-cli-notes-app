const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const FILENAME = path.join(__dirname, '../output/notes.json');

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(FILENAME);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(FILENAME, dataJSON);
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (duplicateNote) {
    console.log(chalk.red.inverse('Note title taken!'));
  } else {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  if (notes.length) {
    console.log(chalk.blue.inverse('Your notes:'));
    notes.forEach((note) => console.log(note.title));
  } else {
    console.log(chalk.blue.inverse('There\'re no notes yet.'));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const found = notes.find((note) => note.title === title);

  if (found) {
    console.log(chalk.blue.inverse(found.title));
    console.log(found.body);
  } else {
    console.log(chalk.red.inverse('Note not found!'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed!'));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse('No note found!'));
  }
};

module.exports = {
  addNote,
  listNotes,
  readNote,
  removeNote,
};
