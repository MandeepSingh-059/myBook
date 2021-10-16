//Run the express server with npm run serve
const express = require('express')
const connectToMongo = require('./db')

connectToMongo()
const app = express()
const port = 3000

app.use(express.json())

//These are the diffrent api endpoints (auth, notes)/routes available to us
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})