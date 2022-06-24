declare namespace NodeJS {
  interface ProcessEnv {
    readonly RPC_URL: string;
    readonly PRIVATE_KEY: string;
  }
}
