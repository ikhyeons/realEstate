import mysql from 'mysql2/promise'
import { mysqlKey } from '../secretKeysB'

let pool = mysql.createPool(mysqlKey)
export const getConnection = () => pool.getConnection()
export default getConnection
