const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const cmp = bcrypt.compareSync(myPlaintextPassword, hash);
    return cmp;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { hashPassword, comparePassword };
