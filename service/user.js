const userModel = require('../modules/user');
const tokenS = require('./Token');
class User {
    async auth(req, res, next){
        try {
            const {login, password} = req.body;

            let isUser = await userModel.auth(login, password);
            if(isUser.length < 1){
                throw  Error();
            }
            let token = await tokenS.generateTokens(isUser[0]['userid']);
            return res.json({success: true, user: isUser[0], token: token['access']});
        } catch (e){
            return res.json({error: 'Не вреный логин или пороль'})
        }

    }

    async addUser(user, req, res, next){
        try {
            const {login, password} = req.body;
            let isUser = await userModel.auth(login, password);

            if(isUser.length > 0){
                return res.json({error: 'Такой пользователь уже есть'});
            }
            await userModel.addUser(login, password);
            return res.json({success: ''});
        } catch (e){
            next(e);
        }
    }

    async deleteUser(user, req, res, next){
        try {
            const {id} = req.body;
            await userModel.deleteUser(id);
        } catch (e){
            next(e);
        }
    }

    async getUser(user, req, res, next){
        try {
            let users = await userModel.getUser();
            return res.json({answer: users});
        } catch (e){
            next(e);
        }
    }

}

module.exports = new User();