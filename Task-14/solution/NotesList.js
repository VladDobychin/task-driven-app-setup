import NoteItem from './NoteItem.js';

export default class NotesList {
    constructor(notes, handleNoteClick, handleNoteDelete) {
        this.notes = notes;
        this.handleNoteClick = handleNoteClick;
        this.handleNoteDelete = handleNoteDelete
    }

    init() {
        this.notesList = document.getElementById('notes-list');
        this.render()
    }

    render() {
        this.notesList.innerHTML = '';

        this.notes.forEach((note, index) => {
            const noteItem = new NoteItem(
                note,
                index,
                () => this.handleNoteClick(note, index),
                () => this.handleNoteDelete(index))
            noteItem.init();
            noteItem.render(this.notesList);
        });
    }

    update(notes) {
        this.notes = notes;
        this.render();
    }
}
