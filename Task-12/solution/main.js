import NoteModel from './NoteModel.js';
import NoteItem from './NoteItem.js';

const noteModel = new NoteModel();
const notesList = document.getElementById('notes-list');

function renderNotes() {
    notesList.innerHTML = '';

    const notes = noteModel.getNotes();

    notes.forEach((note, index) => {
        const noteItem = new NoteItem(
            note,
            index,
            () => handleNoteClick(note, index),
            () => handleNoteDelete(index))
        noteItem.init();
        noteItem.render(notesList);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const noteName = document.getElementById('note-name-input');
    const noteContent = document.getElementById('note-content-input');
    const note = {
        name: noteName.value,
        content: noteContent.value
    };

    if (note.name !== '' && note.content !== '') {
        if (noteModel.getCurrentNoteIndex() === null) {
            // Add new note
            noteModel.addNote(note);
        } else {
            // Update existing note
            noteModel.updateNote(note);
        }

        noteName.value = '';
        noteContent.value = '';
        setFormMode('add');
        renderNotes();
    }
}

function handleNoteClick(note, index) {
    noteModel.setCurrentNoteIndex(index);

    const noteName = document.getElementById('note-name-input');
    const noteContent = document.getElementById('note-content-input');

    noteName.value = note.name;
    noteContent.value = note.content;
    setFormMode('edit');
}

function handleNoteDelete(index) {
    noteModel.deleteNote(index);
    setFormMode('add');
    renderNotes();
}


function setFormMode(formMode) {
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
        noteModel.setCurrentNoteIndex(null);
    }
}

function loadNotesFromStorage() {
    const savedNotes = noteModel.getNotes();
    if (savedNotes) {
        renderNotes();
    }
}

document.getElementById('cancel-button').addEventListener('click', () => {
    setFormMode('add');
})
document.getElementById('add-note-btn').addEventListener('click', () => {
    setFormMode('add');
})
document.getElementById('note-form').addEventListener('submit', handleFormSubmit);
document.addEventListener('DOMContentLoaded', loadNotesFromStorage);
