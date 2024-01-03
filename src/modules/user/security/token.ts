import jwt from "jsonwebtoken";

const secret_token = process.env.SECRET_ACCESS_TOKEN;

export const generateToken = (id: number) => {
  if (!secret_token) return;
  const payload = {
    id: id,
  };
  return jwt.sign(payload, secret_token, {
    expiresIn: "20m",
  });
};
