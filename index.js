require('dotenv').config();
const express = require('express');
const app = express();
var morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'));

morgan.token('request-body', function (req, res) { return JSON.stringify(req.body); });

morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['request-body'](req, res)
  ].join(' ');
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Phonebook Home Page</h1>');
});

app.get('/info', (req, res) => {
  Person.countDocuments({}).then(count => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${count}</p>  <p>${date}</p>`);
  });

});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});