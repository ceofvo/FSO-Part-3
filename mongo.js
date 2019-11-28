const mongoose = require('mongoose');

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];

const url =
  `mongodb+srv://user-sp:${password}@cluster0-mvvf5.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const name = process.argv[3];
const number = process.argv[4];

if(process.argv.length === 5){
const person = new Person({
  name: `${name}`,
  number: `${number}`
});

person.save().then(response => {
  console.log(`added ${name} ${number} to phonebook`)
  mongoose.connection.close()
});
};


if(process.argv.length === 3){
Person.find({}).then(result => {
    console.log("Phonebook:");
    result.forEach(person => {
      console.log(person.name, person.number);
    })
    mongoose.connection.close()
});
}