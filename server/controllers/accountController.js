const bcrypt = require('bcryptjs')

module.exports = {

  register: async (req, res) => {

//  Gets database instance into the register function

    const db = req.app.get('db')

// Gives you all the goodies you need to set up the account 

    const { email, firstname, lastname, username, password, phone, facebook, instagram, profilePic } = req.body

    console.log(11111, email, 11111)

// Set up a session

    const { session } = req

// Checks to see if the email is already in the system
    
    let emailTaken = await db.account.verifyEmail({email})
    .catch(err => console.log(33333, err, 33333))
    
    emailTaken = +emailTaken[0].count
    
    if(emailTaken !== 0) {
      return res.status(409).send(alert('That email is already being used'))
    }
    
// Transforms password into hash for security purposes

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

// Registers a new user
    
    const user_id = await db.account.signUp({
      firstname, 
      lastname, 
      email, 
      username, 
      hash,
      phone,
      facebook,
      instagram,
      profilePic
    }).catch(err => console.log(err))

    console.log(22222, user_id, 222222)
// Creates a sesion user to avoid having to login

    session.user = {
      username,
      hash,
      login_id: user_id[0].balance_id
    }
    res.sendStatus(200)

  },

  login: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req

//  Sets username as an alias for LoginUsername and pulls it off the req body

    const { username } = req.body
    // Bryan uses try but it works so we are going with it
    
    try {
      
      let user = await db.account.login({username})
      console.log(11111, user, 11111)
      
      // Sets the user's session
      
      session.user = user[0]
      console.log(22222, session.user, 22222)
      
// Uses bcypt magic to see if the password is the right one with it's hash and salting

      const authenticated = bcrypt.compareSync(req.body.password, user[0].password)

// If the password matches it logs them in

      if(authenticated){
        res.status(200).send({authenticated, user_id: user[0].login_id})
      } 
      
// Or it throws the error if the password doesn't match

      else {
        throw new Error(401)
      }
    } catch(err) {
      console.log(err)
      res.sendStatus(401)
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }
}