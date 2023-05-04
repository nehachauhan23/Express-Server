// const logger = require('./middleware/logger')

const express = require('express')
const path = require('path')
const handleBars = require('express-handlebars')
const members = require('./models/Members')

const app = express() 

// Init middleware 
// app.use(logger)
// console.log("handleBars",handleBars);

// express handlebars templating engine
app.engine('handlebars', handleBars.engine({defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Home
app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Members App',
        members
    })
})


//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Body parser middleware 
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 5500;

app.listen(PORT, 
    ()=> console.log(`server started on port ${PORT}` )
);


