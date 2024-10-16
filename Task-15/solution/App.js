import NotesList from './NotesList.js';
import NoteModel from './NoteModel.js';

export default class App {
    constructor() {
        this.noteModel = new NoteModel();
        this.notesList = new NotesList(
            this.noteModel.getNotes(),
            this.handleNoteClick.bind(this),
            this.handleNoteDelete.bind(this)
        )
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.notesList.init();
            this.setupEventListeners();
        });
    }

    setupEventListeners() {
        document.getElementById('cancel-button').addEventListener('click', () => {
            this.setFormMode('add');
        })
        document.getElementById('add-note-btn').addEventListener('click', () => {
            this.setFormMode('add');
        })
        document.getElementById('note-form').addEventListener('submit', this.handleFormSubmit);
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

            noteName.value = '';
            noteContent.value = '';
            this.setFormMode('add');
            this.notesList.update(this.noteModel.getNotes());
        }
    }

    handleNoteClick(note, index) {
        this.noteModel.setCurrentNoteIndex(index);

        const noteName = document.getElementById('note-name-input');
        const noteContent = document.getElementById('note-content-input');

        noteName.value = note.name;
        noteContent.value = note.content;
        this.setFormMode('edit');
    }

    handleNoteDelete(index) {
        this.noteModel.deleteNote(index);
        this.setFormMode('add');
        this.notesList.update(this.noteModel.getNotes());
    }

    setFormMode(formMode) {
        const mainHeader = document.getElementById('main-content-header');
        const submitBtn = document.getElementById('submit-button');
        const cancelBtn = document.getElementById('cancel-button');
        const noteName = document.getElementById('note-name-input');
        const noteContent = document.getElementById('note-content-input');

        if (formMode === 'edit') {
            mainHeader.textContent = 'Edit existing note';
            submitBtn.textContent = 'Save changes';
            cancelBtn.style.display = 'inline';
        }

        if (formMode === 'add') {
            mainHeader.textContent = 'Add a New Note';
            submitBtn.textContent = 'Add Note';
            cancelBtn.style.display = 'none';
            noteName.value = '';
            noteContent.value = '';
            this.noteModel.setCurrentNoteIndex(null);
        }
    }
}
