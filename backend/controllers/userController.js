const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');


function passwordIsValid(password) {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!re.test(password)) {
        return false;
    }
    return true;
}

async function hashPassword(password) {
    
    try{
        const salt = await bcrypt.genSalt(1000);
        return await bcrypt.hash(password, salt);
    }
    catch(error){
        console.log(error);
        return null;
    }
    
}

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    return res.status(200).json(response.rows);
}

const createUsers = async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    try{
        if (!passwordIsValid(password)) {
            return res.status(400).json({ mensaje: 'La contraseña es insegura' });
        }
        const passwordHash = await hashPassword(password);
        if (!passwordHash) {
            return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
        const response = await pool
            .query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, email, password]);
        if (response.rowCount === 0) {
            return res.status(400).json({ mensaje: 'No se ha podido crear el usuario' });
          }
        return res.json({
                        message: 'User added successfully',
                        body: {
                            user: {first_name, last_name, email, password}
                        }
    });
    }catch(error){
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ mensaje: 'Error de conexión a la base de datos' });
          } else if (error.code === '23505') {
            return res.status(409).json({ mensaje: 'Ya existe un usuario con ese correo electrónico' });
          } else {
            return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }

}

module.exports ={
    getUsers,
    createUsers
}