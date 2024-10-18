import NotesList from './NotesList.js';
import NoteModel from './NoteModel.js';
import Form from './Form.js';

export default class App {
    constructor() {
        this.noteModel = new NoteModel();
        this.notesList = new NotesList(
            this.noteModel.getNotes(),
            this.handleNoteClick.bind(this),
            this.handleNoteDelete.bind(this)
        )
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.form = new Form(this.noteModel, this.handleFormSubmit);
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.notesList.init();
            this.form.init();
            this.setupEventListeners();
        });
    }

    setupEventListeners() {
        document.getElementById('cancel-button').addEventListener('click', () => {
            this.form.setFormMode('add');
        })
        document.getElementById('add-note-btn').addEventListener('click', () => {
            this.form.setFormMode('add');
        })
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const noteName = document.getElementById('note-name-input');
        const noteContent = document.getElementById('note-content-input');
        const note = {
            name: noteName.value,
            content: noteContent.value
        };

        if (note.name !== '' && note.content !== '') {
            if (this.noteModel.getCurrentNoteIndex() === null) {
                this.noteModel.addNote(note);
            } else {
                this.noteModel.updateNote(note);
            }

            this.form.resetForm();
            this.form.setFormMode('add');
            this.notesList.update(this.noteModel.getNotes());
        }
    }

    handleNoteClick(note, index) {
        this.noteModel.setCurrentNoteIndex(index);

        const noteName = document.getElementById('note-name-input');
        const noteContent = document.getElementById('note-content-input');

        noteName.value = note.name;
        noteContent.value = note.content;
        this.form.setFormMode('edit');
    }

    handleNoteDelete(index) {
        this.noteModel.deleteNote(index);
        this.form.setFormMode('add');
        this.notesList.update(this.noteModel.getNotes());
    }
}
