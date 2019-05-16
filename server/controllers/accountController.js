const bcrypt = require('bcryptjs')

module.exports = {

  register: async (req, res) => {

//  Gets database instance into the register function

    const db = req.app.get('db')

// Gives you all the goodies you need to set up the account 

    const { firstname, lastname, email, username, password, phone, facebook, instagram, profilePic } = req.body

// Set up a session

    const { session } = req

// Checks to see if the email is already in the system
    
    let emailTaken = await db.account.verifyEmail({email})
    .catch(err => console.log(33333, err))
    emailTaken = +emailTaken[0].count
    
    if(emailTaken !== 0) {
      return res.sendStatus(409)
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

// Creates a sesion user to avoid having to login

    session.user = {
      email,
      hash,
      login_id: user_id[0].balance_id
    }
    res.status(200).send(user_id)

  },

  login: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req

//   pulls loginEmail as email off the req body

    const { loginEmail : email } = req.body

    // Bryan uses 'try' but it works so we are going with it

    try {
      let user = await db.account.login({email})
      
      // Sets the user's session

      session.user = user[0]

// Uses bcypt magic to see if the password is the right one with it's hash and salting

      const authenticated = bcrypt.compareSync(req.body.loginPassword, user[0].password)
      
// If the password matches it logs them in
// Or it throws the error if the password doesn't match

      if(authenticated){
        res.status(200).send({authenticated, user_id: user[0].login_id, loginEmail: user[0].email})
      } else {
        throw new Error(401)
      }
    } catch(err) {
      res.sendStatus(401)
    }
  },

  getDetails: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    try {
      const { email } = session.user
      const data = await db.account.getDetails({email})
      res.status(200).send(data[0])
    } catch(err) {
      res.sendStatus(500)
    }
  },

  getSession: (req, res) => {
    res.send(req.session.user)
  },

  updateUser: async (req, res) => {

    const db = req.app.get('db')

// Gives you the id of the User you want to update from params

    const { id } = req.params

// Gives you all the goodies you need to update the account 

    const { email, firstname, lastname, phone, facebook, instagram, profilePic } = req.body

// updates the user info
    
   db.account.updateUser({
      id,
      firstname, 
      lastname, 
      email, 
      phone,
      facebook,
      instagram,
      profilePic
    })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  getAllUsers: (req, res) => {
    const db = req.app.get('db')
    db.account.getAllUsers().then((data) => {
      res.status(200).send(data)
    })
    .catch(() => console.log('err with getAllUsers in accCtrl'))
  },

  inviteToTrip: async (req, res) => {
    const db = req.app.get('db')
    const { invited, trip_id } = req.body
    for(let i = 0; i < invited.length; i++){
      let user_id = invited[i].user_id
      await db.group.inviteToTrip({ user_id, trip_id })
    }
    res.sendStatus(200)
  },

  getTripGroupMembers: (req, res) => {
    const db = req.app.get('db')
    const { trip_id } = req.params
    db.group.getAllGroupMembers({trip_id})
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(err => console.log(err))
  }
}