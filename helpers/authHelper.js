const bcrypt = require("bcrypt");

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const cmp = bcrypt.compareSync(myPlaintextPassword, hash);
    return cmp;
  } catch (error) {
    console.log(error);
  }
};
