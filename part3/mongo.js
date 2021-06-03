const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('you need to pass the password (and new entry)')
  process.exit(1)
}

const password = process.argv[2]



const url =
 `mongodb+srv://adminp:${password}@cluster0.ptmre.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String

})

const Contact = mongoose.model('Contact', phonebookSchema)

if (process.argv.length > 3){
  console.log('creating new contact...')
  const newName = process.argv[3]
  const newNumber = process.argv[4]

  const contact = new Contact({
    name:newName,
    number:newNumber
  })
  contact.save().then(() => {
    console.log('contact saved')
    mongoose.connection.close()
  })

}
else{
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}



