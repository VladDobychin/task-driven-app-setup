let notes = [];
let currentNoteIndex = null;

function renderNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.classList.add('note-item');

        const noteName = document.createElement('strong');
        noteName.textContent = note.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            event.stopPropagation()
            deleteNote(index);
        });

        noteItem.addEventListener('click', () => {
            currentNoteIndex = index;

            const noteName = document.getElementById('note-name-input');
            const noteContent = document.getElementById('note-content-input');

            noteName.value = note.name;
            noteContent.value = note.content;
            setFormMode('edit');
        })

        noteItem.appendChild(noteName);
        noteItem.appendChild(deleteButton);
        notesList.appendChild(noteItem);
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
        if (currentNoteIndex === null) {
            // Add new note
            notes.push(note);
        } else {
            // Update existing note
            notes[currentNoteIndex] = note;
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        noteName.value = '';
        noteContent.value = '';
        setFormMode('add');
        renderNotes();
    }
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
        submitBtn.textContent = 'Add note';
        cancelBtn.style.display = 'none';
        noteName.value = '';
        noteContent.value = '';
        currentNoteIndex = null;
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    setFormMode('add');
    renderNotes();
}

function loadNotesFromStorage() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
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
