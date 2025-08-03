require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)
module.exports = Person

/*mongoose.connect(process.env.MONGODB_URI)
    .then(result => {
        console.log('Connected to database')
        if (process.argv.length < 3) {
            console.log('give password as argument')
            process.exit(1)
        }

        if (process.argv.length > 5) {
            console.log('Invalid number of arguments')
            process.exit(1)
        }

        if (process.argv.length == 3) {
            Person.find({}).then(result => {
                result.forEach(person => {
                    console.log(person)
                })
            })
        } else if (process.argv.length == 5){
            const name = process.argv[3]
            const number = process.argv[4]
            const person = new Person({
                name: name,
                number: number
            })
            person.save().then(result => {
                console.log(`${name} number ${number} added to phonebook`)
            })
            .catch(error => {
            console.error('Error saving person:', error.message);
            })
        }
    })
    .catch(error => {
        console.log('error connecting to database: ', error.message)
    })*/