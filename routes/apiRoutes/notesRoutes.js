const router = require('express').Router()
const path = require('path')
const notes = require('../../db/db.json')
const genId = require('../../helpers/genId')
const { validateNote, createNote, findById, removeNote } = require('../../lib/notes.js')

router.get('/api/notes', (req, res) => {
    res.json(notes.notesArray)
})

router.get('/notes/:id', (req, res) => {
    const note = findById(req.params.id, notes.notesArray);
    if (!note) {

        res.status(400).json({ message: 'No notes are found with that ID!' })
        return;
    }
    res.json(note)

})

router.post('/notes', (req, res) => {
    req.body.id = genId()

    if (!validateNote(req.body)) {
        res.status(400).send('note is not formatted correctly!')

    } else {
        const note = createNote(req.body, notes.notesArray)
        res.json(note)
    }

})

router.delete('/notes/:id', (req, res) => {
    const note = findById(req.params.id, notes.notesArray);
    if (note) {

        removeNote(note, notes.notesArray)
        res.sendFile(path.join(__dirname, 'public/notes.html'))
    } else {
        res.status(400).send('Error! Delete failed')
    }
    res.json(note)

})



module.exports = router