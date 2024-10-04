let notes = [];

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
        deleteButton.classList.add('delete-button'); // Add a class for styling
        deleteButton.addEventListener('click', () => {
            deleteNote(index);
        });

        noteItem.appendChild(noteName);
        noteItem.appendChild(deleteButton);
        notesList.appendChild(noteItem);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

function handleFormSubmit(event) {
    event.preventDefault();

    const noteName = document.getElementById('note-name-input');
    const noteContent = document.getElementById('note-content-input');
    const newNote = {
        name: noteName.value,
        content: noteContent.value
    };

    if (newNote.name !== '' && newNote.content !== '') {
        notes.push(newNote);

        localStorage.setItem('notes', JSON.stringify(notes));

        noteName.value = '';
        noteContent.value = '';
        renderNotes();
    }
}

function loadNotesFromStorage() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
        renderNotes();
    }
}

document.getElementById('note-form').addEventListener('submit', handleFormSubmit);
document.addEventListener('DOMContentLoaded', loadNotesFromStorage);
