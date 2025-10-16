/*CREATE TABLE DFL_Resultado (
    idDFL_Resultado UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER NOT NULL,
    ok_selfie_fuente BIT,
    es_selfie_valida BIT,
    ok_frontal_fuente BIT,
    existe_fuente BIT,
    cliente_en_lista_blanca BIT,
    codigo_dactilar_detectado BIT,
    es_cedula_mayor_edad BIT,
    es_cedula_vigente BIT,
    es_horario_valido BIT,
    fecha_nacimiento_detectada BIT,
    identificacion_detectada BIT,
    selfie_intentos_moderado BIT,
    texto_resumen NVARCHAR(MAX),
    FOREIGN KEY (idDFL_AnalisisBiometrico) REFERENCES DFL_AnalisisBiometrico(idDFL_AnalisisBiometrico)
);*/



import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateDflResultadoDto {
  @IsString()
  @IsNotEmpty()
  idDFL_AnalisisBiometrico: string;

  @IsBoolean()
  @IsOptional()
  ok_selfie_fuente: boolean;

  @IsBoolean()
  @IsOptional()
  es_selfie_valida: boolean;

  @IsBoolean()
  @IsOptional()
  ok_frontal_fuente: boolean;

  @IsBoolean()
  @IsOptional()
  existe_fuente: boolean;

  @IsBoolean()
  @IsOptional()
  cliente_en_lista_blanca: boolean;

  @IsBoolean()
  @IsOptional()
  codigo_dactilar_detectado: boolean;

  @IsBoolean()
  @IsOptional()
  es_cedula_mayor_edad: boolean;

  @IsBoolean()
  @IsOptional()
  es_cedula_vigente: boolean;

  @IsBoolean()
  @IsOptional()
  es_horario_valido: boolean;

  @IsBoolean()
  @IsOptional()
  fecha_nacimiento_detectada: boolean;

  @IsBoolean()
  @IsOptional()
  identificacion_detectada: boolean;

  @IsBoolean()
  @IsOptional()
  selfie_intentos_moderado: boolean;

  @IsString()
  @IsOptional()
  texto_resumen: string;
}
