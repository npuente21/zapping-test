const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/dbConfig');


const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json('Faltan campos por llenar');

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(user.rows.length === 0) return res.status(401).json('Usuario no encontrado');
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword) return res.status(401).json('Contraseña incorrecta');
        const token = jwt.sign({id: user.rows[0].id}, process.env.SECRET_KEY, {
            expiresIn: '1 hr',
        });
        res.cookie('accessToken', token, {httpOnly: true, maxAge: 60 * 60 * 1000});
        const {first_name, last_name} = user.rows[0];
        return res.status(200).json({ first_name, last_name, email});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Error de servidor'});
    }
}

const logout = async (req, res) => {
    res.clearCookie('accessToken');
    return res.status(200).json('Logout');
}

module.exports = {
    login,
    logout
}