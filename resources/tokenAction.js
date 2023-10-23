const jwt = require('jsonwebtoken');

class TokenAction{
    
    constructor (body){
        this.secret = global.config.security.secretToken
        this.tokenLifeTime = global.config.security.tokenLifeTime
    }

    sing(id){
        return jwt.sign(
            { userId: id },
            this.secret,
            { expiresIn: this.tokenLifeTime }
        );
    }

    decode(bearerToken){
        return jwt.verify(
            bearerToken.split(' ')[1], 
            this.secret
        );
    }
}

module.exports = (TokenAction)