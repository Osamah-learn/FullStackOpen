const JWT = require("jsonwebtoken");
const createError = require("http-erros")


module.exports = {
    signAccessToken: (userid) => {
return new Promise((resolve, reject) => {
    const payload = {
        name: "Hello, world",
    }
    const secret = "Osamah"
    const options = {

    }
    jwt.sign(payload, secret, options,(err,token) => {
        if(err) return reject(err)
        resolve(token)
    })
})
    }
}

// we recevide username and password from login router 
// then we make if check if its true we return jwt response else its 404
// when we get the jwt in the front end we gonna save it in the local storage
// when ever we send request from the front end , post blogs we need to put them in header