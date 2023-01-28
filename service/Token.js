const jwt = require('jsonwebtoken');


class Token {
    generateTokens(userId) {
        const accessToken = jwt.sign({payload: userId}, 'salt', {expiresIn: '24h'})

        return {
            access: accessToken,
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, 'salt', );
            return userData;
        } catch (e) {
            return null;
        }
    }


}

module.exports = new Token();