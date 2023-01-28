const tokenService = require('./service/Token');
const userDB = require('./modules/user');

class MiddleWare {
    async auth(req, res, next){
        try {
            let {authorization} = req.headers;
            const { userId } = req.body;
            authorization = authorization.split(' ')[1];
            let isUser = await tokenService.validateAccessToken(authorization);
            console.log(authorization);
            if(!isUser){
                throw Error();
            }
            let user = await userDB.getById(userId);
            next(user);
        } catch(e) {
            res.status(401).json({
                error: {}
            });
        }
    }

    async error(error, req, res){

    }
}

module.exports = new MiddleWare();
