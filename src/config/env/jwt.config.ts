export interface JWTConfig {
  secret: string;
  expiresIn: number;
}

export const jwtLoadEnv = (): { jwt: JWTConfig } => {
  const { JWT_SECRET } = process.env;

  return {
    jwt: {
      secret: JWT_SECRET,
      expiresIn: 18000,
    },
  };
};
