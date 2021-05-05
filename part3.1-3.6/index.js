const { response } = require('express');
const express = require('express');
const { request } = require('http');
const app = express();
app.use(express.json());



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
  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateRandomId()
  }
  persons = persons.concat(newPerson);
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});