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

export const comparePasswords = async (password: string, hash: string) => {
  const isPasswordMatched = await bcrypt.compare(password, hash);
  console.log("Hash:", hash);
  return isPasswordMatched;
};
