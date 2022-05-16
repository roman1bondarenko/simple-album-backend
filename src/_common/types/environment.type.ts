export enum Environments {
  local = 'local',
  development = 'development',
  qa = 'qa',
  production = 'production',
}

export type Environment = {
  env: string;
};
