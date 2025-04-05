const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const port = 3001
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/UserRoutes')

app.use('/api', authRoutes,userRoutes , (req, res) => {
    res.status(404).send('Not Found')
})

app.listen(port, () => {
console.log(`Server is running on port ${port}`)
})
mongoose.connect('mongodb://localhost:27017/SPA-BE', {
}).then(() => {
    console.log('Database connected')
}
).catch(err => {
    console.log(err)
})