const { obtenerJoyas, prepararHATEOAS, filtrosDeJoyas } = require("../util/joyas-util");
const pool = require("../database/db");






const mostrasJoyas = async (req, res, next) => {
    try {
        const queryString = req.query;
        const joyas = await obtenerJoyas(queryString);
        const HATEOAS = await prepararHATEOAS(joyas);
        res.json(HATEOAS);
    } catch (error) {
        next(error)
    }

}

const filtrosJoyas = async (req, res, next) => {
    try {
        const queryStrings = req.query
        const jewells = await filtrosDeJoyas(queryStrings)
        res.json(jewells)
    } catch (error) {

        next(error)
    }
}




// Exportamos la función
module.exports = { mostrasJoyas , filtrosJoyas}
