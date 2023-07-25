import mysql from 'mysql2'

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  database: 'sboipc',
  password: '',
  connectionLimit: 10
})

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err)
    throw new Error('Error de conexión a la base de datos')
  }

  console.log('Conexión exitosa a la base de datos.')

  // Importante liberar la conexión después de comprobarla
  connection.release()
})

const promisePool = pool.promise()

export default promisePool
