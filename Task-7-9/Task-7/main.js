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
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            deleteNote(index);
        });

        noteItem.addEventListener('click', () => {
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

// Rest of the code is the same
