const jwt = require ('jsonwebtoken')

const secret = 'test';

const auth = async (req, res, next) => {
    
    try {
        console.log('ok dans AUth')
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test')
            if(decodedData){req.userId = decodedData.id};
        } else {
            decodedData = jwt.decode(token)
            if(decodedData){req.userId = decodedData.sub};
        }
        
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    auth : auth,

}