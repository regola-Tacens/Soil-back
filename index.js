const express  = require ('express')
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')
const cors = require('cors')
const userRouter = require ('./Routes/user.js')
const themeRouter = require ('./Routes/theme.js')
const pictureRouter = require ('./Routes/picture.js')
const tagRouter = require ('./Routes/tag.js')

const app = express()

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());

const url = 'mongodb://localhost/soil'

app.use(express.json())

mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected')
})

app.use('/user', userRouter )
app.use('/theme', themeRouter)
app.use('/picture', pictureRouter)
app.use('/tag', tagRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('server started')
})

mongoose.set('useFindAndModify', false);