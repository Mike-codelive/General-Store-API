const express = require('express')
const connectDB = require('./config/db')

const app = express()

app.get('/', (req, res) => {
	res.json({ msg: 'welcome to my family store API...'})
})

connectDB()

// init middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server up an runinng on port ${PORT}`))