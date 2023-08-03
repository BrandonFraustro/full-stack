const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

//Middleware
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('body:', request.body);
    console.log('---');
    next()
}
app.use(requestLogger)

const unknownEndpont = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

let notes = [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2019-05-30T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2019-05-30T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2019-05-30T19:20:14.298Z",
      "important": true
    }
]

//Imprime Hello World en la página principal
app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

//Muestra todas las notas disponibles
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

//Muestra una sola nota enviada como parámetro usando el ID
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

//Eliminar una nota donde se envía el id como parámetro de la nota que se quiere eliminar
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0 
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

//Agrega una nota 
app.post('/api/notes', (request, response) => {
    const body = request.body
    
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})

app.use(unknownEndpont)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})