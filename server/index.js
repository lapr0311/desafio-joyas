const express = require ('express');
const morgan = require ('morgan');
const cors = require ('cors');
const routerJoyas = require("./router/joyas.router");
const pool = require("../server/database/db")

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(routerJoyas)



app.use((err, req, res, next) => {
	return res.json({
		message:err.message
	})
})


app.listen(8000,()=>{console.log('iniciando servidor')})