import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import * as ExcelJS from 'exceljs';
import { DataSource } from 'typeorm';

@Injectable()
export class ExcelSolicitudesWebService {
	constructor(
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async generateExcel(res: any) {
    // 1. Ejecutar el procedimiento almacenado "CrearReporteSolicitudesWeb"
    const query = 'EXEC CrearReporteSolicitudesWeb';

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
	worksheet.getCell('AU3').value = 'Nombre verificación domicilio';
	worksheet.getCell('AV3').value = 'Nombre verificación laboral';
	worksheet.getCell('AW3').value = 'Duración solicitud';
	worksheet.getCell('AX3').value = 'Duración documental';
	worksheet.getCell('AY3').value = 'Duración telefónica';
	worksheet.getCell('AZ3').value = 'Nombre analista';
	worksheet.getCell('BA3').value = 'Nombre operador';


    // formato encabezado
    const headerRow = worksheet.getRow(3);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4F81BD' } };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };


    // 4. Insertar datos procedimiento almacenado
    data.forEach((item) => {
  const row = worksheet.addRow([
    item.idCre_SolicitudWeb, 
    item.NumeroSolicitud, 
    item.Bodega, 
    item.Fecha, 
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
    item.HoraInicioSolicitud,
    item.EstadoVerificacionSolicitud,
    item.HoraFinSolicitud,
    item.HoraCorreccionSolicitud_1,
    item.HoraCorreccionSolicitud_2,
    item.HoraCorreccionSolicitud_3,
    item.HoraCorreccionSolicitud_4,
    item.HoraCorreccionSolicitud_5,
    item.HoraRevisionSolicitud_1,
    item.HoraRevisionSolicitud_2,
    item.HoraRevisionSolicitud_3,
    item.HoraRevisionSolicitud_4,
    item.HoraRevisionSolicitud_5,
    item.HoraInicioDocumental,
    item.EstadoVerificacionDocumental,
    item.HorafinDocumental,
    item.HoraCorreccionDocumental_1,
    item.HoraCorreccionDocumental_2,
    item.HoraCorreccionDocumental_3,
    item.HoraCorreccionDocumental_4,
    item.HoraCorreccionDocumental_5,
    item.HoraRevisionDocumental_1,
    item.HoraRevisionDocumental_2,
    item.HoraRevisionDocumental_3,
    item.HoraRevisionDocumental_4,
    item.HoraRevisionDocumental_5,
    item.HoraInicioTelefonica,
    item.EstadoVerificacionTelefonica,
    item.HoraFinTelefonica,
    item.NombreVerificacionDomicilio,
    item.NombreVerificacionLaboral,
    item.DuracionSolicitud,
    item.Duraciondocumental,
    item.DuracionTelefonica,
    item.NombreAnalista,
    item.NombreOperador
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
