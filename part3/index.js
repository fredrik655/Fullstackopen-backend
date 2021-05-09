const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req),
  ].join(' ')
}));

app.use(cors());



let persons = [
  {
    name: "Arto Hellas",
    number: "040-12345",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendick",
    number: "39-23-6423122",
    id: 4
  },
  {
    name: "test",
    number: "39-23-6423122",
    id: 4
  }
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `);
});

app.get('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if(person) {
    response.json(person);
  }
  else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000);
}

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if(!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing"
    });
  }
  else if (persons.find(person => person.name === body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    });
  }
  
  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateRandomId()
  }
  persons = persons.concat(newPerson);
  response.json(newPerson);
});

const PORT = process.env.PORT | 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});