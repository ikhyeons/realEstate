const mysql = require('mysql2/promise')
const { mysqlKey } = require('../secretKeys')
let pool = mysql.createPool(mysqlKey)
export const getConnection = () => pool.getConnection((conn: any) => {})
export default getConnection
