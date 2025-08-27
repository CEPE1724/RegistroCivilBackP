import { url } from "inspector";

export const ApiConfig = () => ({
    environment: process.env.NODE_ENV || 'dev',
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 1433, // Agregar valor por defecto para DATABASE_PORT
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      connectionTimeout: parseInt(process.env.SQLSERVER_CONNECTION_TIMEOUT, 10) || 30000, // Agregar valor por defecto
      requestTimeout: parseInt(process.env.SQLSERVER_REQUEST_TIMEOUT, 10) || 30000, // Agregar valor por defecto
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    api_adc: {
      url: process.env.API_URL_ADC,
    },
    api_auth: {
      url: process.env.API_URL_AUTH,
    },
    rc: {
      username: process.env.RC_USERNAME,
      password: process.env.RC_PASSWORD,
      codigo_inst: process.env.RC_CODIGO_INST,
      codigo_ag: process.env.RC_CODIGO_AG,
    },
    keycloak: {
      url: process.env.KEYCLOAK_URL,
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      username: process.env.KEYCLOAK_USERNAME,
      password: process.env.KEYCLOAK_PASSWORD,
    },
    google: {
      urlkeygoogle: process.env.GOOGLE_CLOUD_KEYFILE,
    },
    equifax: {
      EQFX_UAT: process.env.EQFX_UAT,
      EQFX_UAT_url: process.env.EQFX_UAT_url,
      EQFX_UAT_token: process.env.EQFX_UAT_token,

    },
    
  });
  