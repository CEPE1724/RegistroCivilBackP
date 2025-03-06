
/*
DATABASE_HOST="192.168.1.165\\POINTDB"
DATABASE_PORT="1433"
DATABASE_USERNAME="sa"
DATABASE_PASSWORD="password.1"
DATABASE_NAME="POINT"
SQLSERVER_CONNECTION_TIMEOUT="30000"
SQLSERVER_REQUEST_TIMEOUT="30000"

IP_SERVER=3008

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
export const ApiConfig = () => ({
    enviroment : process.env.NODE_ENV || 'dev',
    port : process.env.PORT || 3008,
    database : {
        host : process.env.DATABASE_HOST,
        port : process.env.DATABASE_PORT,
        username : process.env.DATABASE_USERNAME,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_NAME,
        connectionTimeout : process.env.SQLSERVER_CONNECTION_TIMEOUT,
        requestTimeout : process.env.SQLSERVER_REQUEST_TIMEOUT
    },
    jwt : {
        secret : process.env.JWT_SECRET
    },
    api_adc : {
        url : process.env.API_URL_ADC
    },
    api_auth : {
        url : process.env.API_URL_AUTH
    },
    rc : {
        username : process.env.RC_USERNAME,
        password : process.env.RC_PASSWORD,
        codigo_inst : process.env.RC_CODIGO_INST,
        codigo_ag : process.env.RC_CODIGO_AG
    },
    keycloak : {
        url : process.env.KEYCLOAK_URL,
        client_id : process.env.KEYCLOAK_CLIENT_ID,
        username : process.env.KEYCLOAK_USERNAME,
        password : process.env.KEYCLOAK_PASSWORD
    }
})