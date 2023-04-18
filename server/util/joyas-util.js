const pool = require("../database/db");
const format = require("pg-format");




const obtenerJoyas = async ({ limits = 6, page = 1, order_by = 'id_ASC' }) => {
  const [campo, direccion] = order_by.split("_");
  const offset = (page - 1) * limits;

  const query = format('SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
  const { rows: joyas, rowCount } = await pool.query(query);

  if (rowCount === 0) {
    throw { code: 404, message: `No se encontraron resultados` };
  };

  return joyas;
};
const prepararHATEOAS = (joyas) => {
  const results = joyas.map((j) => {
    return {
      name: j.nombre,
      href: `joyas/joya/${j.id}`,
    }
  });
  const totalJoyas = joyas.length
  const totalStock = joyas.reduce((total, j) => total + j.stock, 0);
  const HATEOAS = {
    totalJoyas,
    totalStock,
    results
  }

  return HATEOAS;
};


const filtrosDeJoyas = async ({ precio_min, precio_max,categoria,metal }) => {
  let filtros = []
  const values = []
  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor)
    const { length } = filtros
    filtros.push(`${campo} ${comparador} $${length + 1}`)
  }
  if (precio_max) agregarFiltro('precio', '<=', precio_max)
  if (precio_min) agregarFiltro('precio', '>=', precio_min)
  if (categoria) agregarFiltro('categoria', '=',categoria)
  if (metal) agregarFiltro('metal', '=', metal)
  let consulta = "SELECT * FROM inventario"
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ")
    consulta += ` WHERE ${filtros}`

  }
  const { rows: inventario } = await pool.query(consulta, values)
  return inventario
}





module.exports = {  prepararHATEOAS, filtrosDeJoyas }




