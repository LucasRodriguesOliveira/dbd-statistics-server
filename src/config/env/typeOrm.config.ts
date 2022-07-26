export interface TypeOrmConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export const typeOrmLoadEnv = (): { database: TypeOrmConfig } => {
  const {
    DATABASE_HOST: host,
    DATABASE_PORT: port,
    DATABASE_USER: username,
    DATABASE_PASSWORD: password,
    DATABASE_NAME: database,
  } = process.env;

  return {
    database: {
      host,
      port: parseInt(port, 10) || 5432,
      username,
      password,
      database,
    },
  };
};
