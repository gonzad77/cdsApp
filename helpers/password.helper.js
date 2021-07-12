const bcrypt = require('bcryptjs');

const hashIt = (password) => {
    const salt = bcrypt.genSaltSync();
    const result =  bcrypt.hashSync(password, salt)
    return result;
}
  
const match = (pTry, password) => {
    const result = bcrypt.compareSync(pTry, password);
    return result;
}

module.exports = {
    hashIt,
    match
}