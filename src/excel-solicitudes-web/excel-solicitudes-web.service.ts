import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import * as ExcelJS from 'exceljs';
import { DataSource } from 'typeorm';

@Injectable()
export class ExcelSolicitudesWebService {
	constructor(
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async generateExcel(res: any, filtros: { BodegaId?: number; Fecha?: string }) {
    // 1. Ejecutar el procedimiento almacenado "CrearReporteSolicitudesWeb"
    let query = 'EXEC CrearReporteSolicitudesWeb';

	const params: string[] = [];

	if (filtros.BodegaId) {
      params.push(`@BodegaId = ${filtros.BodegaId}`);
    }
    if (filtros.Fecha) {
      params.push(`@Fecha = '${filtros.Fecha}'`);
    }

	if (params.length > 0) {
      query += ' ' + params.join(', ');
    }

    let data: any[] = [];

    try {
      // obtener datos
      const result = await this.dataSource.query(query);
      data = result; 
    } catch (error) {
      console.error('Error al ejecutar el procedimiento:', error);
      throw new Error('Error al obtener los datos.');
    }

    // 2. Crear nuevo Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte Solicitudes Web');

    // 3. encabezados
    worksheet.getCell('B3').value = 'Número Solicitud ';
    worksheet.getCell('C3').value = 'Bodega';
    worksheet.getCell('D3').value = 'Fecha';
    worksheet.getCell('E3').value = 'Nombre cliente';
    worksheet.getCell('F3').value = 'Cédula';
	worksheet.getCell('G3').value = 'Fecha nacimiento cliente';
	worksheet.getCell('H3').value = 'Situación laboral';
	worksheet.getCell('I3').value = 'Actividad económica';
	worksheet.getCell('J3').value = 'Nombre vendedor';
	worksheet.getCell('K3').value = 'Compra encuesta';
	worksheet.getCell('L3').value = 'Celular';
	worksheet.getCell('M3').value = 'Email';
	worksheet.getCell('N3').value = 'Producto';
	worksheet.getCell('O3').value = 'Estado crédito';
	worksheet.getCell('P3').value = 'Resultado';
	worksheet.getCell('Q3').value = 'Tipo cliente';
	worksheet.getCell('R3').value = 'Hora inicio solicitud';
	worksheet.getCell('S3').value = 'Estado solicitud';
	worksheet.getCell('T3').value = 'Hora fin solicitud';
	worksheet.getCell('U3').value = 'Hora corrección solicitud 1';
	worksheet.getCell('V3').value = 'Hora corrección solicitud 2';
	worksheet.getCell('W3').value = 'Hora corrección solicitud 3';
	worksheet.getCell('X3').value = 'Hora corrección solicitud 4';
	worksheet.getCell('Y3').value = 'Hora corrección solicitud 5';
	worksheet.getCell('Z3').value = 'Hora revisión solicitud 1';
	worksheet.getCell('AA3').value = 'Hora revisión solicitud 2';
	worksheet.getCell('AB3').value = 'Hora revisión solicitud 3';
	worksheet.getCell('AC3').value = 'Hora revisión solicitud 4';
	worksheet.getCell('AD3').value = 'Hora revisión solicitud 5';
	worksheet.getCell('AE3').value = 'Hora inicio documental';
	worksheet.getCell('AF3').value = 'Estado verificación documental';
	worksheet.getCell('AG3').value = 'Hora fin documental';
	worksheet.getCell('AH3').value = 'Hora corrección documental 1';
	worksheet.getCell('AI3').value = 'Hora corrección documental 2';
	worksheet.getCell('AJ3').value = 'Hora corrección documental 3';
	worksheet.getCell('AK3').value = 'Hora corrección documental 4';
	worksheet.getCell('AL3').value = 'Hora corrección documental 5';
	worksheet.getCell('AM3').value = 'Hora revisión documental 1';
	worksheet.getCell('AN3').value = 'Hora revisión documental 2';
	worksheet.getCell('AO3').value = 'Hora revisión documental 3';
	worksheet.getCell('AP3').value = 'Hora revisión documental 4';
	worksheet.getCell('AQ3').value = 'Hora revisión documental 5';
	worksheet.getCell('AR3').value = 'Hora inicio telefónica';
	worksheet.getCell('AS3').value = 'Estado verificación telefónica';
	worksheet.getCell('AT3').value = 'Hora fin telefónica';
	worksheet.getCell('AU3').value = 'Hora corrección telefonica 1';
	worksheet.getCell('AV3').value = 'Hora corrección telefonica 2';
	worksheet.getCell('AW3').value = 'Hora corrección telefonica 3';
	worksheet.getCell('AX3').value = 'Hora corrección telefonica 4';
	worksheet.getCell('AY3').value = 'Hora corrección telefonica 5';
	worksheet.getCell('AZ3').value = 'Hora revisión telefonica 1';
	worksheet.getCell('BA3').value = 'Hora revisión telefonica 2';
	worksheet.getCell('BB3').value = 'Hora revisión telefonica 3';
	worksheet.getCell('BC3').value = 'Hora revisión telefonica 4';
	worksheet.getCell('BD3').value = 'Hora revisión telefonica 5';
	worksheet.getCell('BE3').value = 'Nombre verificación domicilio';
	worksheet.getCell('BF3').value = 'Nombre verificación laboral';
	worksheet.getCell('BG3').value = 'Duración solicitud';
	worksheet.getCell('BH3').value = 'Duración documental';
	worksheet.getCell('BI3').value = 'Duración telefónica';
	worksheet.getCell('BJ3').value = 'Nombre analista';
	worksheet.getCell('BK3').value = 'Nombre operador';
	worksheet.getCell('BL3').value = 'Persona que aprobó';
	worksheet.getCell('BM3').value = 'Tiempo que aprobó';
	worksheet.getCell('BN3').value = 'Verificación Domicilio';
	worksheet.getCell('BO3').value = 'Verificación Laboral';


    // formato encabezado
    const headerRow = worksheet.getRow(3);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4F81BD' } };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

	//fechas a string
	const toFechaHoraTexto = (value: any) => {
  if (!value) return '';
  const date = new Date(value);
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.toTimeString().slice(0, 5)}`;
};

    // 4. Insertar datos procedimiento almacenado
    data.forEach((item) => {
  const row = worksheet.addRow([
    item.idCre_SolicitudWeb, 
    item.NumeroSolicitud, 
    item.Bodega, 
    toFechaHoraTexto(item.Fecha), 
    item.NombreCliente, 
    item.Cedula, 
    item.FechaNacimientoCliente,
    item.SituacionLaboral,
    item.ActividadEconomica,
    item.NombreVendedor,
    item.CompraEncuesta,
    item.Celular,
    item.Email,
    item.Producto,
    item.EstadoCredito,
    item.Resultado,
    item.TipoCliente,
    toFechaHoraTexto(item.HoraInicioSolicitud),
    item.EstadoVerificacionSolicitud,
    toFechaHoraTexto(item.HoraFinSolicitud),
    toFechaHoraTexto(item.HoraCorreccionSolicitud_1),
    toFechaHoraTexto(item.HoraCorreccionSolicitud_2),
    toFechaHoraTexto(item.HoraCorreccionSolicitud_3),
    toFechaHoraTexto(item.HoraCorreccionSolicitud_4),
    toFechaHoraTexto(item.HoraCorreccionSolicitud_5),
    toFechaHoraTexto(item.HoraRevisionSolicitud_1),
    toFechaHoraTexto(item.HoraRevisionSolicitud_2),
    toFechaHoraTexto(item.HoraRevisionSolicitud_3),
    toFechaHoraTexto(item.HoraRevisionSolicitud_4),
    toFechaHoraTexto(item.HoraRevisionSolicitud_5),
    toFechaHoraTexto(item.HoraInicioDocumental),
    item.EstadoVerificacionDocumental,
    toFechaHoraTexto(item.HorafinDocumental),
    toFechaHoraTexto(item.HoraCorreccionDocumental_1),
    toFechaHoraTexto(item.HoraCorreccionDocumental_2),
    toFechaHoraTexto(item.HoraCorreccionDocumental_3),
    toFechaHoraTexto(item.HoraCorreccionDocumental_4),
    toFechaHoraTexto(item.HoraCorreccionDocumental_5),
    toFechaHoraTexto(item.HoraRevisionDocumental_1),
    toFechaHoraTexto(item.HoraRevisionDocumental_2),
    toFechaHoraTexto(item.HoraRevisionDocumental_3),
    toFechaHoraTexto(item.HoraRevisionDocumental_4),
    toFechaHoraTexto(item.HoraRevisionDocumental_5),
    toFechaHoraTexto(item.HoraInicioTelefonica),
    item.EstadoVerificacionTelefonica,
    toFechaHoraTexto(item.HoraFinTelefonica),
	toFechaHoraTexto(item.HoraCorreccionTelefonica_1),
	toFechaHoraTexto(item.HoraCorreccionTelefonica_2),
	toFechaHoraTexto(item.HoraCorreccionTelefonica_3),
	toFechaHoraTexto(item.HoraCorreccionTelefonica_4),
	toFechaHoraTexto(item.HoraCorreccionTelefonica_5),
	toFechaHoraTexto(item.HoraRevisionTelefonica_1),
	toFechaHoraTexto(item.HoraRevisionTelefonica_2),
	toFechaHoraTexto(item.HoraRevisionTelefonica_3),
	toFechaHoraTexto(item.HoraRevisionTelefonica_4),
	toFechaHoraTexto(item.HoraRevisionTelefonica_5),
    item.NombreVerificacionDomicilio,
    item.NombreVerificacionLaboral,
    item.DuracionSolicitud,
    item.Duraciondocumental,
    item.DuracionTelefonica,
    item.NombreAnalista,
    item.NombreOperador,
	item.NombreAprobo,
	toFechaHoraTexto(item.TiempoAprobo),
	item.VerificacionDomicilio,
	item.VerificacionLaboral,
  ]);

  row.alignment = { horizontal: 'center', vertical: 'middle' };

  row.getCell(4).numFmt = 'dddd, dd "de" mmmm "de" yyyy';
  row.getCell(6).value = Number(item.Cedula); 
  row.getCell(6).numFmt = '0';
  row.getCell(7).numFmt = 'dddd, dd "de" mmmm "de" yyyy';
  row.getCell(12).value = Number(item.Celular); 
  row.getCell(12).numFmt = '0';
});


    // 5.ancho columnas 
    worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell((cell) => {
      const length = cell.value ? cell.value.toString().length : 0;
      if (length > maxLength) {
        maxLength = length;
      }
    });
    column.width = maxLength + 2;
  });

  worksheet.getColumn(4).width = 30;
  worksheet.getColumn(5).width = 43;
  worksheet.getColumn(7).width = 33;


    // 6. Configurar las cabeceras HTTP para la descarga del archivo Excel
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=reporte_solicitudesWeb.xlsx', // Nombre archivo
    );

    // 7. Escribir el archivo Excel en la respuesta HTTP
    await workbook.xlsx.write(res);
    res.end();
  }
}
