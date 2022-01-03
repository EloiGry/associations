const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const port = 5000

const associationsRoutes = require("./routes/associations")

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

app.use('/associations', associationsRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})