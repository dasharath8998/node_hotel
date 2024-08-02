const passport = require('passport')
const Person = require('./models/person_model')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(async (uName, pass, done) => {
  try {
    const person = await Person.findOne({username: uName})
    if(!person) {
      return done(null, false, {message: 'Incorrect username'})
    } else if (person.password != pass) {
      return done(null, false, {message: 'Incorrect password'})
    } else {
      return done(null, person)
    }
  } catch(err) {
    return done(err)
  }
}))

const authValidator = passport.authenticate('local',{session: false})

module.exports = {
  authValidator,
  passport
}