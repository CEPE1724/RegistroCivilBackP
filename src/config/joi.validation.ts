/*
DATABASE_HOST="192.168.1.165\\POINTDB"
DATABASE_PORT="1433"
DATABASE_USERNAME="sa"
DATABASE_PASSWORD="password.1"
DATABASE_NAME="POINT"
SQLSERVER_CONNECTION_TIMEOUT="30000"
SQLSERVER_REQUEST_TIMEOUT="30000"

PORT=3008

JWT_SECRET=kjshkTWL09_5u76_-#4hhasñdlñasdlasd

API_URL_ADC=https://apps2.registrocivil.gob.ec/WS-RCivil-Rest/api/ConsultaDAC
API_URL_AUTH=https://apps2.registrocivil.gob.ec/WS-RCivil-Rest/api/auth
RC_USERNAME=credis1
RC_PASSWORD=cs10$PNT

RC_CODIGO_INST=246
RC_CODIGO_AG=305

IP_SERVER="192.168.2.167"



KEYCLOAK_URL=http://app.cognoconsultas.com/keycloak/auth/realms/point/protocol/openid-connect/token
KEYCLOAK_CLIENT_ID=login-data-services
KEYCLOAK_USERNAME=dpozo@point.com.ec
KEYCLOAK_PASSWORD=oneTONGLEmic*/

import * as Joi from 'joi';

export const JoinValidationSchema = Joi.object({
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    SQLSERVER_CONNECTION_TIMEOUT: Joi.number().required(),
    SQLSERVER_REQUEST_TIMEOUT: Joi.number().required(),
    PORT: Joi.number().required(),
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
    });

    

