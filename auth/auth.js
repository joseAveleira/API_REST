var User = require('../models/user');
var service = require('./service');
exports.aliasLogin = async function (req, res) {
    try {
        console.log('aliasLogin');
        //muestra el request
        console.log(req.body);
        const user = await User.findOne({alias: req.body.alias}).exec();

        if (user === null) {
            return res.status(401).send({ mensaje: 'El usuario no es correcto' });
        } else {
            return res.status(200).send({ token: service.createToken(user) });
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
