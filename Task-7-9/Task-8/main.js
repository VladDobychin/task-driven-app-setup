let notes = [];
// Adding tracking of the current notes index for editing
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
            deleteNote(index);
        });

        noteItem.addEventListener('click', () => {
            // Also add index assignment here
            currentNoteIndex = index;

            const noteName = document.getElementById('note-name-input');
            const noteContent = document.getElementById('note-content-input');

            noteName.value = note.name;
            noteContent.value = note.content;
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
        renderNotes();
    }
}

// Rest is the same
