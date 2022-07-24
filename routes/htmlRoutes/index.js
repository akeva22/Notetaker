const router = require('express').Router();
const path = require('path');
const noteRoutes = require('../apiRoutes/notesRoutes');
router.use(noteRoutes);
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
})
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
module.exports = router;