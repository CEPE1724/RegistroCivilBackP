export interface FIROperacionFirma {
  idFIR_OperacionFirma?: string;

  hash_operation: string;
  code_client?: string;
  code_bio?: string;
  link?: string;

  time_signature_validity?: Date | string;
  state?: string;
  task?: string;

  state_fiducia?: string | null;
  message_fiducia?: string | null;

  status: number;
  message?: string;

  fechaSistema?: Date;

  signatories?: FIRFirmante[];
  documents?: FIRDocumento[];
}

export interface FIRFirmante {
  idFIR_Firmante?: string;
  idFIR_OperacionFirma?: string;

  dni: string;
  name: string;
  first_last_name: string;
  second_last_name?: string;
  email?: string;

  sign_state?: string | null;
  signed_at?: Date | string | null;

  fechaSistema?: Date;
}

export interface FIRDocumento {
  idFIR_Documento?: string;
  idFIR_OperacionFirma?: string;

  code: string;
  name: string;
  path: string;
  state_sign: string;

  fechaSistema?: Date;
}

export interface FIRFirmaResponse {
  status: number;
  message: string;
  data: FIROperacionFirma;
}
