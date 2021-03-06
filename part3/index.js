const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json()); // middleware that looks at http header and if it is of type json it parses it and attach it to the req body

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
};

app.use(requestLogger);


let notes = [  
  {    
    id: 1,    
    content: "HTML is easy",    
    date: "2019-05-30T17:30:31.098Z",    
    important: true  },
  {    
    id: 2,   
    content: "Browser can execute only Javascript",    
    date: "2019-05-30T18:39:34.091Z",    
    important: false  },  
  {    
    id: 3,    
    content: "GET and POST are the most important methods of HTTP protocol",    
    date: "2019-05-30T19:20:14.298Z",    
    important: true  
  }
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return maxId + 1;
};

app.get('/api/notes', (req, res) => {
  res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id); // or Number(req.params.id)
  const note = notes.find(note => note.id === id);
  console.log(note);

  if(note) {
    res.json(note);
  }
  else {
    res.status(404).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log(notes);
  notes = notes.filter(note => note.id !== id);
  console.log(notes);

  res.status(204).end();
});

app.post('/api/notes', (req, res) => {
  
  const body = req.body;

  if(!body.content) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note);
  res.json(note);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT =  3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});