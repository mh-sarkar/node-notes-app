const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return "Your notes..."
}


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find((note) => note.title === title)
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold('Your Note is added!'))
    } else
        console.log(chalk.red.bold('Note Title already taken!'))
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    // console.log(dataJSON) 
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const bufferData = fs.readFileSync('notes.json')
        const dataJson = bufferData.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notesToKeep.length === notes.length) {
        console.log(chalk.red.bold('No notes found to remove!'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.green.bold('This note is removed!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach((note) => console.log(chalk.blue.bold(note.title)))
}

const readNotes = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title)
    if (findNote) {
        console.log(chalk.magenta.bold("Title: ") + chalk.blue(findNote.title))
        console.log(chalk.magenta.bold("Body: ") + chalk.blue(findNote.body))
    } else {
        console.log(chalk.red.bold('Unable to found!'))
    }
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}