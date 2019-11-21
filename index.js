const express = require('express');
const app = express();
var morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'));

morgan.token('request-body', function (req, res) { return JSON.stringify(req.body) });

morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['request-body'](req, res)
  ].join(' ')
})


let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  },
  { 
    "name": "Kunle Shaba", 
    "number": "080-123-4567",
    "id": 5
  }
];

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Phonebook Home Page</h1>');
});

app.get('/info', (req, res) => {
  const count = persons.length;
  const date = new Date();
  res.send(`<p>Phonebook has info for ${count}</p>  <p>${date}</p>`);
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
});

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name && !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    const checkPerson = persons.find(person => person.name === body.name);
    if (checkPerson != undefined) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

const port = process.env.PORT || 3001 ;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});