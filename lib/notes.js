const fs = require('fs')

const createNote = (body, notesArray) => {
    const note = body
    notesArray.push(note)

    fs.writeFileSync(
        './db/db.json',
        JSON.stringify({ notesArray }, null, 2)
    )

    return note;
}

const validateNote = (note) => {
    if (!note.title || typeof note.title != 'string') {
        return false;
    }
    if (!note.text || typeof note.text != 'string') {
        return false;
    }

    if (!note.id || typeof note.id != 'string') {
        return false;
    }

    return true;
}

const findById = (id, notesArray) => {
    const result = notesArray.filter(note => note.id === id)[0]
    return result;
}

const removeNote = (note, notesArray) => {
    const noteIndex = notesArray.map(object => object.id).indexOf(note.id)

    notesArray.splice(noteIndex, 1)

    fs.writeFileSync(
        './db/db.json',
        JSON.stringify({ notesArray }, null, 2)
    )
}



module.exports = { validateNote, createNote, findById, removeNote }