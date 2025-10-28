export interface FiduciaPayload {
  code_client: string; // Código del cliente
  code_bio: string;    // Código biométrico o identificador adicional
  type_process: string; // Tipo de proceso o flujo (ej. "E" = emisión)

  data_fiducia: {
    CodigoNegocio: string;               // Código del tipo de negocio
    TipoOperacion: string;               // Ejemplo: "E" = emisión
    NumeroOperacion: string;             // Número único de operación
    FechaEmision: string;                // Fecha de emisión (YYYY-MM-DD HH:mm:ss)
    FechaVencimiento: string;            // Fecha de vencimiento
    FechaFirma: string;                  // Fecha de firma
    Plazo: string;                       // Plazo en meses o días
    Tasa: string;                        // Tasa de interés
    Monto: string;                       // Monto total
    Cuota: string;                       // Valor de la cuota
    DistribucionGeografica: string;      // Provincia o región

    Acreedor: {
      CodigoTipoIdentificacion: string;  // Tipo de identificación del acreedor
      NumeroIdentificacion: string;      // Identificación del acreedor
      RazonSocial: string;               // Nombre o razón social del acreedor
    };

    Deudor: {
      CodigoTipoPersona: string;          // 1 = natural, 2 = jurídica
      CodigoTipoIdentificacion: string;   // Tipo de identificación (1 = cédula, etc.)
      NumeroIdentificacion: string;       // Número de identificación
      CodigoNacionalidad: string;         // Código de nacionalidad
      Nacionalidad: string;               // Descripción de nacionalidad
      RazonSocial: string;                // Nombre completo o razón social
      PrimerNombre: string;
      SegundoNombre: string;
      PrimerApellido: string;
      SegundoApellido: string;
      Correo: string;
      Celular: string;
      Telefono: string;
      Direccion: string;                  // Dirección completa
      CallePrincipal: string;
      Numeracion: string;
      CalleSecundaria: string;
      ReferenciaDireccion: string;
      CodigoPaisDireccion: string;
      CodigoProvinciaDireccion: string;
      CodigoCiudadDireccion: string;
      CodigoParroquiaDireccion: string;
    };
  };

  signatories: Array<{
    dni: string;              // Número de identificación del firmante
    name: string;             // Nombres
    first_last_name: string;  // Primer apellido
    second_last_name: string; // Segundo apellido
    email: string;            // Correo electrónico
    phone: string;            // Teléfono o celular
    address: string;          // Dirección
    city: string;             // Ciudad
  }>;

  documents: Array<{
    code: string;             // Código del documento
    name: string;             // Nombre del documento (ej. “autorizacion.pdf”)
    base64: string;           // Contenido en Base64 del PDF
  }>;
}
