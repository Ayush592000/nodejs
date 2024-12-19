const express = require('express')
const jwt = require('jsonwebtoken')
const appRoute = require('./routes/app')
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
app.use(express.json());
app.use('/api', appRoute)
// app.post('/login', (req, res) => {
//   const user = {
//     id: 1,
//     name: 'Anku',
//     email: 'anku12@gmali.com'
//   }
//   jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '300s' }, (err, token) => {
//     res.json({
//       token
//     })
//   })
// })
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})