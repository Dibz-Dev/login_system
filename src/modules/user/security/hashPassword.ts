import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Hash:", hash);
    return hash;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt
    .compare(password, hash)
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((err) => {
      console.error(err.message);
      return false;
    });
};
