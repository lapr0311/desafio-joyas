const {Router} = require ("express");
const {mostrasJoyas,filtrosJoyas} = require ("../controller/consultas");



const router = Router();

router.get ("/joyas",mostrasJoyas)

router.get ('/joyas/filtros',filtrosJoyas)

module.exports= router;