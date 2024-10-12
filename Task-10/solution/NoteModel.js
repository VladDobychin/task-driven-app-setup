export default class NoteModel {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.currentNoteIndex = null;
    };

    getNotes() {
        return this.notes;
    };

    addNote(note) {
        this.notes.push(note);
        this._commit();
    };

    updateNote(note) {
        this.notes[this.currentNoteIndex] = note;
        this._commit();
    };

    deleteNote(index) {
        this.notes.splice(index, 1);
        this._commit();
    };


    setCurrentNoteIndex(index) {
        this.currentNoteIndex = index;
    };

    getCurrentNoteIndex() {
        return this.currentNoteIndex;
    };

    _commit() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    };
}
