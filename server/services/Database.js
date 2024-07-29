const MySQL = require('mysql2/promise');
const CommonHelper = require('../helpers/CommonHelper');

const connectionPool = MySQL.createPool({
  host: process.env.MYSQL_CONFIG_HOST || 'localhost',
  user: process.env.MYSQL_CONFIG_USER || 'root',
  password: process.env.MYSQL_CONFIG_PASSWORD || 'password',
  database: process.env.MYSQL_CONFIG_DATABASE || 'phincon_academy_db',
  port: Number(process.env.MYSQL_PORT) || 3306,
  connectionLimit: Number(process.env.MYSQL_CONN_LIMIT) || 0
});

const phoneBookTable = process.env.PHONEBOOK_TABLE || 'phonebook';

const executeQuery = async (query, values = []) => {
  let connection = null;
  try {
    connection = await connectionPool.getConnection();
    const timeStart = process.hrtime();
    const [result] = await connection.query(query, values);
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'Operation', 'INFO'], {
      message: { query, timeTaken }
    });
    if (connection) connection.release();
    return result;
  } catch (error) {
    CommonHelper.log(['Database', 'Operation', 'ERROR'], {
      message: `${error}`
    });
    if (connection) connection.release();
    throw error;
  }
};

const getListPhonebook = async () => {
  const query = `SELECT * FROM ${phoneBookTable}`;
  const rawResult = await executeQuery(query);
  return Object.values(JSON.parse(JSON.stringify(rawResult)));
};

const addPhonebook = async (name, number) => {
  const query = `INSERT INTO ${phoneBookTable} (name, number) VALUES (?, ?)`;
  await executeQuery(query, [name, number]);
};

const editPhonebook = async (id, name, number) => {
  const query = `UPDATE ${phoneBookTable} SET name = ?, number = ? WHERE id = ?`;
  const result = await executeQuery(query, [name, number, id]);
  return result?.affectedRows > 0;
};

const deletePhonebook = async (id) => {
  const query = `DELETE FROM ${phoneBookTable} WHERE id = ?`;
  const result = await executeQuery(query, [id]);
  return result?.affectedRows > 0;
};

module.exports = { getListPhonebook, addPhonebook, editPhonebook, deletePhonebook };
