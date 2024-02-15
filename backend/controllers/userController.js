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
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
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

const getProfile = async (req, res) => {
    try{
        const {id} = req.user;
        const response = await pool.query('SELECT first_name, last_name, email FROM users WHERE id = $1', [id]);
        return res.status(200).json(response.rows[0]);
    }catch(error){
        return res.status(500).json('Error interno del servidor');
    }  
    
}

const createUsers = async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    try{
        if (!passwordIsValid(password)) {
            return res.status(400).json('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
        }
        const passwordHash = await hashPassword(password);
        if (!passwordHash) {
            return res.status(500).json('Error interno del servidor');
        }
        const response = await pool
            .query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, email, passwordHash]);
        if (response.rowCount === 0) {
            return res.status(400).json('No se pudo agregar el usuario');
          }
        return res.json({
                        message: 'User added successfully',
                        body: {
                            user: {first_name, last_name, email, password}
                        }
    });
    }catch(error){
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json('Error de conexión a la base de datos');
          } else if (error.code === '23505') {
            return res.status(409).json('Ya existe un usuario con ese email');
          } else {
            return res.status(500).json('Error interno del servidor');
        }
    }

}

module.exports ={
    getUsers,
    createUsers,
    getProfile
}