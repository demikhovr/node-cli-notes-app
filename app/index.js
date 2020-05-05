const yargs = require('yargs');

const {
  addNote,
  listNotes,
  readNote,
  removeNote,
} = require('./notes');

yargs.command({
  builder: {
    body: {
      demandOption: true,
      describe: 'Note body',
      type: 'string',
    },
    title: {
      demandOption: true,
      describe: 'Note title',
      type: 'string',
    },
  },
  command: 'add',
  describe: 'Add a new note',
  handler(argv) {
    addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    listNotes();
  },
});

yargs.command({
  builder: {
    title: {
      demandOption: true,
      describe: 'Note title',
      type: 'string',
    },
  },
  command: 'read',
  describe: 'Read a note',
  handler(argv) {
    readNote(argv.title);
  },
});

yargs.command({
  builder: {
    title: {
      demandOption: true,
      describe: 'Note title',
      type: 'string',
    },
  },
  command: 'remove',
  describe: 'Remove a new note',
  handler(argv) {
    removeNote(argv.title);
  },
});

yargs.parse();
