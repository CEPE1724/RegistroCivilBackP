export interface DFLAnalisisBiometrico {
    status:      number;
    data:        Data;
    tipo:        string;
    codigo:      string;
    error:      string;
    indicadores: Indicadores;
    messages:    Messages;
}
export interface Messages {
    error: string;
}

export interface Data {
    rostroSimilitud:        number;
    rostroSimilitudFrontal: number;
    rostroSimilitudSelfie:  number;
    img_frontal:            string;
    img_reverso:            string;
    img_selfie:             string;
    bio_intento_frontal:    number;
    bio_intento_reverso:    number;
    bio_intento_selfie:     number;
    bio_intento_dactilar:   number;
    img_rostro_uno:         string;
    img_rostro_dos:         string;
    bio_fuente:             string;
    ip_registrada:          string;
}

export interface Indicadores {
    anverso:  Anverso;
    reverso:  Reverso;
    metadata: Metadata;
}

export interface Anverso {
    identificacion: string;
    metadata:       string;
    esFotoEspejo:   string;
}

export interface Metadata {
    procesada:  Procesada;
    referencia: Referencia;
    resultado:  Resultado;
}

export interface Procesada {
    identificacion:   string;
    nombre_completo:  string;
    codigo_dactilar:  string;
    nacionalidad:     string;
    estado_civil:     string;
    sexo:             string;
    fecha_nacimiento: Date;
    lugar_nacimiento: string;
    fecha_emision:    Date;
    fecha_caducidad:  Date;
}

export interface Referencia {
    identificacion:   string;
    codigo_dactilar:  string;
    fecha_nacimiento: Date;
    fecha_mayor_edad: Date;
    edad_actual:      string;
    fecha_actual:     Date;
}

export interface Resultado {
    ok_selfie_fuente:           boolean;
    es_selfie_valida:           boolean;
    ok_frontal_fuente:          boolean;
    existe_fuente:              boolean;
    cliente_en_lista_blanca:    boolean;
    codigo_dactilar_detectado:  boolean;
    es_cedula_mayor_edad:       boolean;
    es_cedula_vigente:          boolean;
    es_horario_valido:          boolean;
    fecha_nacimiento_detectada: boolean;
    identificacion_detectada:   boolean;
    selfie_intentos_moderado:   boolean;
    texto_resumen:              string;
}

export interface Reverso {
    confianza:                number;
    metadata:                 string;
    codigoDactilar:           string;
    confianza_indicadores:    string;
    codigoDactilarEncontrado: string;
}
