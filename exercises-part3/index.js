const express = require('express');
const morgan = require('morgan');


const app = express();
app.use(morgan('tiny'));
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

app.post('/api/persons',(req, res) => {
    if(req.body.name && req.body.number){
        if(!persons.find(p => p.name === req.body.name)){
            const newPerson = {
                id: Math.floor(Math.random()*200),
                name: req.body.name,
                number: req.body.number
            }
            persons.push(newPerson);
            res.json(persons);
        }
        else {
            res.status(400).send({
                error: 'name must be unique'
            });
        }
        
    }
    else {
        res.status(400).send('name and number most exist');
    }
    
});

const PORT  = 3001;
app.listen(PORT,() => {
    console.log(`backend listens on port ${PORT}`);
})