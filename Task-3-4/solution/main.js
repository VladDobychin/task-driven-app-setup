let notes = [];

function renderNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.textContent = note.name;
        notesList.appendChild(noteItem);
    });
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

        noteName.value = '';
        noteContent.value = '';
        renderNotes();
    }
}

document.getElementById('note-form').addEventListener('submit', handleFormSubmit);
