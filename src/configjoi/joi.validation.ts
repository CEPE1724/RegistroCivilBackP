import * as Joi from 'joi';

export const JoinValidationSchema = Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),  // Se asume que ya es un número por la conversión
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  SQLSERVER_CONNECTION_TIMEOUT: Joi.number().required(),
  SQLSERVER_REQUEST_TIMEOUT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  API_URL_ADC: Joi.string().required(),
  API_URL_AUTH: Joi.string().required(),
  RC_USERNAME: Joi.string().required(),
  RC_PASSWORD: Joi.string().required(),
  RC_CODIGO_INST: Joi.string().required(),
  RC_CODIGO_AG: Joi.string().required(),
  IP_SERVER: Joi.string().required(),
  KEYCLOAK_URL: Joi.string().required(),
  KEYCLOAK_CLIENT_ID: Joi.string().required(),
  KEYCLOAK_USERNAME: Joi.string().required(),
  KEYCLOAK_PASSWORD: Joi.string().required(),
  GOOGLE_CLOUD_KEYFILE: Joi.string().required(),
});
