const express = require('express');


const app = express();
app.use(express.json());

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

// fix for exercise 3.3
app.get('/api/person/:id', (req, res) => {
    const person = persons.filter(p => p.id === +req.params.id);
    if(person.length > 0){
        res.json(person);
    }
    else{
        res.status(404).send('person not found');
    }
})

app.get('/info', (req, res) => {
    const date = Date();
    const nrPeople = persons.length;
    res.status(200).send(`
        <p> Phonebook has info for ${nrPeople} people</p>
        <p>${date}</p>
    `);
});

app.delete('/api/person/:id', (req, res) => {
    persons = persons.filter(p => p.id !== +req.params.id);
    res.json(persons);
});

const PORT  = 3001;
app.listen(PORT,() => {
    console.log(`backend listens on port ${PORT}`);
})