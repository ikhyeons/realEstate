import mysql from 'mysql2/promise'
import { mysqlKey } from '../secretKeys'

let pool = mysql.createPool(mysqlKey)
export const getConnection = () => pool.getConnection()
export default getConnection
