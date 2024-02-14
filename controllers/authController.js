const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message: 'Faltan campos por llenar'});

    try {
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if(user.rows.length === 0) return res.status(401).json({message: 'Usuario no encontrado'});

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword) return res.status(401).json({message: 'Contraseña incorrecta'});

        const token = jwt.sign({id: user.rows[0].id}, process.env.SECRET, {
            expiresIn: '1 hr',
        });
        return res.status(200).json({ token });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Error de servidor'});
    }
}