import type { TDocumentDefinitions } from "pdfmake/interfaces";
import * as fs from 'fs';
import { WebSolicitudgrande } from 'src/web_solicitudgrande/entities/web_solicitudgrande.entity';
import { CreReferenciasclientesweb } from 'src/cre-referenciasclientesweb/entities/cre-referenciasclientesweb.entity'
import { CreNacionalidad } from 'src/cre_nacionalidad/entities/cre_nacionalidad.entity'


export const CreditoDirectoReport = (data: WebSolicitudgrande, refer: CreReferenciasclientesweb[], nacionalidades: CreNacionalidad[], local, actEconomica, provincias, cantones,  parroquias, barrios, profesiones): TDocumentDefinitions => {

	const parentescos = [
		{idParentesco:  1 , Nombre: 'ABUELO/ABUELA', },
    	{idParentesco:  2 , Nombre: 'AMIGO / AMIGA', },
    	{idParentesco:  3 , Nombre: 'COMPAÑERO DE TRABAJO', },
    	{idParentesco:  4 , Nombre: 'CONOCIDO/VECINO', },
    	{idParentesco:  5 , Nombre: 'CONVIVIENTE', },
    	{idParentesco:  6 , Nombre: 'CUÑADO / CUÑADA', },
    	{idParentesco:  7 , Nombre: 'CÓNYUGE', },
    	{idParentesco:  8 , Nombre: 'HIJO/HIJA', },
    	{idParentesco:  9 , Nombre: 'HERMANO / HERMANA', },
    	{idParentesco:  10, Nombre: 'MADRE', },
    	{idParentesco:  11, Nombre: 'NIETO / NIETA', },
    	{idParentesco:  12, Nombre: 'NO DEFINIDO', },
    	{idParentesco:  13, Nombre: 'NUERA', },
    	{idParentesco:  14, Nombre: 'PADRE', },
    	{idParentesco:  15, Nombre: 'PRIMO / PRIMA', },
    	{idParentesco:  16, Nombre: 'SOBRINO / SOBRINA', },
    	{idParentesco:  17, Nombre: 'SUEGRO/SUEGRA ', },
    	{idParentesco:  18, Nombre: 'TIO / TIA', },
    	{idParentesco:  19, Nombre: 'YERNO', },
    	{idParentesco:  20, Nombre: 'CLIENTE', },
    	{idParentesco:  21, Nombre: 'OTRA PERSONA', },
	]

	const cargoCog = [
		{idCognoTrabajoCargo: 1	, NombreCargo: 'GERENTE / AFINES' },
		{idCognoTrabajoCargo: 2	, NombreCargo: 'ASISTENTE / AYUDANTE / AUXILIAR ADMINISTRATIVO' },
		{idCognoTrabajoCargo: 3	, NombreCargo: 'JEFE / AFINES' },
		{idCognoTrabajoCargo: 4	, NombreCargo: 'JEFE DE COBRANZAS' },
		{idCognoTrabajoCargo: 5	, NombreCargo: 'PASANTE' },
		{idCognoTrabajoCargo: 6	, NombreCargo: 'JEFE ADMINISTRATIVA' },
		{idCognoTrabajoCargo: 7	, NombreCargo: 'SUPERVISOR / AFINES' },
		{idCognoTrabajoCargo: 8	, NombreCargo: 'ANALISTA / AFINES' },
		{idCognoTrabajoCargo: 9	, NombreCargo: 'SERVICIO DOMESTICO' },
		{idCognoTrabajoCargo: 10, NombreCargo: 'VENDEDOR / A' },
		{idCognoTrabajoCargo: 11, NombreCargo: 'JEFE DE ADMINISTRACION' },
		{idCognoTrabajoCargo: 12, NombreCargo: 'EMPLEADO' },
		{idCognoTrabajoCargo: 13, NombreCargo: 'Trabajador/a No Remunerado del Hogar' },
		{idCognoTrabajoCargo: 14, NombreCargo: 'CHOFER: OTROS CAMIONES' },
	]

	const fondoBase64 = fs.readFileSync('src/assets/page-0001_credito.jpg', 'base64');
	const fondo2Base64 = fs.readFileSync('src/assets/page-0002_credito.jpg', 'base64');
	const NombNacionalidad = nacionalidades.find( n => n.idNacionalidad == data.idNacionalidad).Nombre
	const fecha = (() => {
		const d = new Date(data.Fecha);
		const day = String(d.getDate()).padStart(2, '0');
		const month = String(d.getMonth() + 1).padStart(2, '0');
		const year = d.getFullYear();
		return `${day}/${month}/${year}`;
	})();

	const pagina1 = [


		//INFORMACION SOLICITUD
		{ text: fecha , absolutePosition: { x: 135, y: 70 }, fontSize: 10},
		{ text: '000019238', absolutePosition: { x: 300, y: 70 }, fontSize: 10},
		{ text: local.Nombre, absolutePosition: { x: 410, y: 70 }, fontSize: 10},
		{ text: '1,073.43', absolutePosition: { x: 62, y: 93 }, fontSize: 9},
		{ text: '18', absolutePosition: { x: 153, y: 93 }, fontSize: 10},
		{ text: '12', absolutePosition: { x: 262, y: 93 }, fontSize: 10},
		{ text: 'X', absolutePosition: { x: 353, y: 93 }, fontSize: 10},

		
		//DATOS PERSONALES CLIENTE
		...(data.idTipoDoc === 1
    	? [{ text: 'X', absolutePosition: { x: 167, y: 160 }, fontSize: 12, }]
    	: data.idGenero === 2
    	? [{ text: 'X', absolutePosition: { x: 210, y: 160 }, fontSize: 12, }]
    	: []),
		{ text: data.Cedula, absolutePosition: { x: 48, y: 195 }, fontSize: 10},
		{ text: data.ApellidoPaterno, absolutePosition: { x: 125, y: 195 }, fontSize: 10},
		{ text: data.ApellidoMaterno, absolutePosition: { x: 210, y: 195 }, fontSize: 10},
		{ text: `${data.PrimerNombre} ${data.SegundoNombre}`, absolutePosition: { x: 280, y: 195 }, fontSize: 10},
		{ text: `${NombNacionalidad}`  , absolutePosition: { x: 400, y: 195 }, fontSize: 10},
		{ text: provincias.find( p => p.idProvincia == data.idProvinciaNacimiento )?.Nombre, absolutePosition: { x: 465, y: 195 }, fontSize: 10},
		...(data.idGenero === 1
    	? [{ text: 'X', absolutePosition: { x: 550, y: 195 }, fontSize: 12, }]
    	: data.idGenero === 2
    	? [{ text: 'X', absolutePosition: { x: 532, y: 195 }, fontSize: 12, }]
    	: []),
		{ text: data?.FechaNacimiento ? `${data.FechaNacimiento}` : '' , absolutePosition: { x: 50, y: 237 }, fontSize: 10},
		//estado civil
		...(data.idEdoCivil === 3 //soltero
    	? [{ text: 'X', absolutePosition: { x: 148, y: 227 }, fontSize: 10, }]
    	: data.idEdoCivil === 2 //divorciado
    	? [{ text: 'X', absolutePosition: { x: 185, y: 227 }, fontSize: 10, }]
    	: data.idEdoCivil === 5 // viudo
    	? [{ text: 'X', absolutePosition: { x: 233, y: 227 }, fontSize: 10, }]
    	:data.idEdoCivil === 1 //casado
    	? [{ text: 'X', absolutePosition: { x: 148, y: 237 }, fontSize: 10, }]
    	:data.idEdoCivil === 4 //union libre
    	? [{ text: 'X', absolutePosition: { x: 185, y: 237 }, fontSize: 10, }]
    	: []),
		{ text: data.NumeroHijos ? data.NumeroHijos : 0 , absolutePosition: { x: 285, y: 232 }, fontSize: 12},
		//nivel estudio
		...(data.idNivelEducacion === 3 //primario
    	? [{ text: 'X', absolutePosition: { x: 435, y: 227 }, fontSize: 10, }]
    	: data.idNivelEducacion === 6 //superior
    	? [{ text: 'X', absolutePosition: { x: 482, y: 227 }, fontSize: 10, }]
    	: data.idNivelEducacion === 2 // ninguno
    	? [{ text: 'X', absolutePosition: { x: 523, y: 227 }, fontSize: 10, }]
    	:data.idNivelEducacion === 4 //secundario
    	? [{ text: 'X', absolutePosition: { x: 435, y: 238 }, fontSize: 10, }]
    	:data.idNivelEducacion === 5 //tecnico
    	? [{ text: 'X', absolutePosition: { x: 482, y: 238 }, fontSize: 10, }]
    	: []),
		{ text: provincias.find (p => p.idProvincia == data.idProvinciaDomicilio )?.Nombre , absolutePosition: { x: 42, y: 266 }, fontSize: 10},
		{ text: cantones.find(c => c.idCanton == data.idCantonDomicilio )?.Nombre , absolutePosition: { x: 108, y: 266 }, fontSize: 10},
		{ text: parroquias.find(p => p.idParroquia == data.idParroquiaDomicilio)?.Nombre , absolutePosition: { x: 180, y: 266 }, fontSize: 10},
		{ text: barrios.find(b => b.idBarrio == data.idBarrioDomicilio)?.Nombre , absolutePosition: { x: 285, y: 266 }, fontSize: 10},
		//tipo vivienda
		...(data.idTipoVivienda === 3 //propio
    	? [{ text: 'X', absolutePosition: { x: 393, y: 262 }, fontSize: 9, }]
    	: data.idTipoVivienda === 1 //arrendado
    	? [{ text: 'X', absolutePosition: { x: 442, y: 262 }, fontSize: 9, }]
    	: data.idTipoVivienda === 0 // herencia 
    	? [{ text: 'X', absolutePosition: { x: 492, y: 262 }, fontSize: 9, }]
    	:data.idTipoVivienda === 0 //otro
    	? [{ text: 'X', absolutePosition: { x: 537, y: 262 }, fontSize: 9, }]
    	:data.idTipoVivienda === 2 //familiares
    	? [{ text: 'X', absolutePosition: { x: 393, y: 272 }, fontSize: 9, }]
		:data.idTipoVivienda === 4 //hipotecada
    	? [{ text: 'X', absolutePosition: { x: 442, y: 272 }, fontSize: 9, }]
		:data.idTipoVivienda === 6 //anticresis
    	? [{ text: 'X', absolutePosition: { x: 492, y: 272 }, fontSize: 9, }]
    	: []),
		{ text: data.CallePrincipal , absolutePosition: { x: 40, y: 298 }, fontSize: 9},
		{ text: data.NumeroCasa , absolutePosition: { x: 200, y: 298 }, fontSize: 8},
		{ text: data.CalleSecundaria , absolutePosition: { x: 250, y: 298 }, fontSize: 10},
		{ text: data.idCre_Tiempo === 1 ? '0-3 MESES' : data.idCre_Tiempo === 2 ? '3-6 MESES' : data.idCre_Tiempo === 3 ? '6-12 MESES' : data.idCre_Tiempo === 5 ? '1-5 AÑOS' : data.idCre_Tiempo === 6 ? '5-10 AÑOS' : data.idCre_Tiempo === 7 ? 'MAS DE 10 AÑOS' : ''  , absolutePosition: { x: 352, y: 298 }, fontSize: 8 },
		{ text: data.NombreArrendador ? data.NombreArrendador : ''  , absolutePosition: { x: 425, y: 298 }, fontSize: 10},
		{ text: data.TelefonoDomicilio ? data.TelefonoDomicilio : ''  , absolutePosition: { x: 25, y: 325 }, fontSize: 10},
		{ text: data.TelefonoDomiliarDos ? data.TelefonoDomiliarDos : ''  , absolutePosition: { x: 78, y: 325 }, fontSize: 10},
		{ text: data.Celular ? data.Celular : ''  , absolutePosition: { x: 137, y: 327 }, fontSize: 8},
		{ text: 'ejemplo@hotmail.com', absolutePosition: {x: 200, y: 325}, fontSize: 10 },
		{ text: data.ReferenciaUbicacion, absolutePosition: {x: 380, y: 325}, fontSize: 10 },


		//DATOS CONYUGUE (solo si estadocivil es 1 casado)
		...(data.idEdoCivil === 1 ? [
		{ text: data.CedulaConyuge, absolutePosition: {x: 35, y: 373}, fontSize: 10 },
		{ text: data.ApellidoPaternoConyuge , absolutePosition: {x: 120, y: 373}, fontSize: 10 },
		{ text: 'apellidomaterno', absolutePosition: {x: 220, y: 373}, fontSize: 10 },
		{ text: data.PrimerNombreConyuge != null ? `${data.PrimerNombreConyuge} ${data.SegundoNombreConyuge}` : '', absolutePosition: {x: 330, y: 373}, fontSize: 10 },
		{ text: nacionalidades.find( n => n.idNacionalidad == data.idNacionalidadConyuge).Nombre , absolutePosition: {x: 30, y: 410}, fontSize: 10 },
		{ text: `${data.FechaNacimientoConyuge}`, absolutePosition: {x: 110, y: 410}, fontSize: 10 },
		{ text: '097777777', absolutePosition: {x: 450, y: 405}, fontSize: 10 },
		
		...(data.idNivelEducacionConyuge === 3 //primario  3
    	? [{ text: 'X', absolutePosition: { x: 311, y: 405 }, fontSize: 10, }]
    	: data.idNivelEducacionConyuge === 6 //superior 6
    	? [{ text: 'X', absolutePosition: { x: 361, y: 405 }, fontSize: 10, }]
    	: data.idNivelEducacionConyuge === 2 // ninguno 2
    	? [{ text: 'X', absolutePosition: { x: 404, y: 405 }, fontSize: 10, }]
    	:data.idNivelEducacionConyuge === 4 //secundario 4
    	? [{ text: 'X', absolutePosition: { x: 311, y: 417 }, fontSize: 10, }]
    	:data.idNivelEducacionConyuge === 5 //tecnico 5
    	? [{ text: 'X', absolutePosition: { x: 361, y: 417 }, fontSize: 10, }]
    	: []),
		] :  []),


		//REFERENCIAS FAMILIARES
		{ text: refer[0]?.ApellidoPaterno , absolutePosition: {x: 34, y: 550}, fontSize: 10 },
		{ text: refer[0]?.PrimerNombre ? `${refer[0]?.PrimerNombre} ${refer[0]?.SegundoNombre}` : '' , absolutePosition: {x: 150, y: 550}, fontSize: 10 },
		{ text: refer[0]?.Celular , absolutePosition: {x: 323, y: 550}, fontSize: 8 },
		{ text: parentescos.find(p => p.idParentesco === refer[0]?.idParentesco)?.Nombre , absolutePosition: {x: 430, y: 550}, fontSize: 8 },

		{ text: refer[1]?.ApellidoPaterno , absolutePosition: {x: 34, y: 605}, fontSize: 10 },
		{ text: refer[1]?.PrimerNombre ? `${refer[1]?.PrimerNombre} ${refer[1]?.SegundoNombre}` : '' , absolutePosition: {x: 150, y: 605}, fontSize: 10 },
		{ text: refer[1]?.Celular , absolutePosition: {x: 323, y: 605}, fontSize: 8 },
		{ text: parentescos.find(p => p.idParentesco === refer[1]?.idParentesco)?.Nombre , absolutePosition: {x: 440, y: 605}, fontSize: 8 },
		
		{ text: refer[2]?.ApellidoPaterno , absolutePosition: {x: 34, y: 663}, fontSize: 10 },
		{ text: refer[2]?.PrimerNombre ? `${refer[2]?.PrimerNombre} ${refer[2]?.SegundoNombre}` : '' , absolutePosition: {x: 150, y: 663}, fontSize: 10 },
		{ text: refer[2]?.Celular , absolutePosition: {x: 323, y: 663}, fontSize: 8 },
		{ text: parentescos.find(p => p.idParentesco === refer[2]?.idParentesco)?.Nombre , absolutePosition: {x: 440, y: 663}, fontSize: 8},
	]

	const pagina2 = [
		
		//SECCION A  Negocio 
		
		...(data.NombreNegocio !== null ? [
		{ text: 'X', absolutePosition: {x: 295, y: 23}, fontSize: 10 },
		{ text: data.NombreNegocio === null ? '' : data.NombreNegocio , absolutePosition: {x: 100, y: 68}, fontSize: 10 },
		{ text: data.idCre_TiempoNegocio === 1 ? '0-3 MESES' : data.idCre_TiempoNegocio === 2 ? '3-6 MESES' : data.idCre_TiempoNegocio === 3 ? '6-12 MESES' : data.idCre_TiempoNegocio === 5 ? '1-5 AÑOS' : data.idCre_TiempoNegocio === 6 ? '5-10 AÑOS' : data.idCre_TiempoNegocio === 7 ? 'MAS DE 10 AÑOS' : ''  , absolutePosition: { x: 280, y: 68 }, fontSize: 10 }, 
		{ text: provincias.find (p => p.idProvincia == data.idProvinciaNegocio )?.Nombre , absolutePosition: {x: 350, y: 68}, fontSize: 10 },
		{ text: cantones.find(c => c.idCanton == data.idCantonNegocio )?.Nombre , absolutePosition: {x: 450, y: 68}, fontSize: 10 },
		{ text: parroquias.find(p => p.idParroquia == data.idParroquiaNegocio)?.Nombre , absolutePosition: {x: 50, y: 96}, fontSize: 10 },
		{ text: barrios.find(b => b.idBarrio == data.idBarrioNegocio)?.Nombre , absolutePosition: {x: 140, y: 96}, fontSize: 10 },
		{ text: data.CallePrincipalNegocio , absolutePosition: {x: 250, y: 96}, fontSize: 10 },
		{ text: data.NumeroCasaNegocio , absolutePosition: {x: 429, y: 96}, fontSize: 10 },
		{ text: data.CalleSecundariaNegocio , absolutePosition: {x: 480, y: 96}, fontSize: 10 },
		{ text: data.ReferenciaUbicacionNegocio , absolutePosition: {x: 47, y: 122}, fontSize: 10 },
		{ text: data.TelefonoNegocio , absolutePosition: {x: 205, y: 122}, fontSize: 10 },
		{ text: data.CelularNegocio , absolutePosition: {x: 260, y: 122}, fontSize: 10 },
		
		] :  []),


		// SECCION B  Trabajo

		...(data.NombreEmpresa !== "" ? [
		{ text: 'X', absolutePosition: {x: 443, y: 23}, fontSize: 10 },
		...(data.idTipoContrato === 1
		? [{ text: 'x', absolutePosition: {x: 418, y: 372}, fontSize: 10, }]
		: data.idTipoContrato === 2
		? [{ text: 'x', absolutePosition: {x: 465, y: 372}, fontSize: 10, }]
		: []),
		{ text: `${data.FechaIngresoEmpresa}` , absolutePosition: {x: 223, y: 400}, fontSize: 10 },
		...(data.idTipoSueldo === 2
		? [{ text: 'x', absolutePosition: {x: 405, y: 398}, fontSize: 10, }]
		: data.idTipoSueldo === 1
		? [{ text: 'x', absolutePosition: {x: 446, y: 398}, fontSize: 10, }]
		: []),
		{ text: data.DiaPago , absolutePosition: {x: 50, y: 425}, fontSize: 10 },
		{ text: cargoCog.find( c => c.idCognoTrabajoCargo == data.idCargo).NombreCargo , absolutePosition: {x: 150, y: 425}, fontSize: 10 },
		{ text: data.Departaento , absolutePosition: {x: 255, y: 425}, fontSize: 10 },
		{ text: provincias.find (p => p.idProvincia == data.idProvinciaTrabajo )?.Nombre , absolutePosition: {x: 38, y: 452}, fontSize: 10 },
		{ text: cantones.find(c => c.idCanton == data.idCantonTrabajo )?.Nombre , absolutePosition: {x: 110, y: 452}, fontSize: 10 },
		{ text: parroquias.find(p => p.idParroquia == data.idParroquiaTrabajo)?.Nombre , absolutePosition: {x: 173, y: 452}, fontSize: 10 },
		{ text: barrios.find(b => b.idBarrio == data.idBarrioTrabajo)?.Nombre , absolutePosition: {x: 282, y: 452}, fontSize: 9 },
		{ text: data.ReferenciaUbicacionTrabajo , absolutePosition: {x: 400, y: 452}, fontSize: 7 },
		{ text: data.CallePrincipalTrabajo , absolutePosition: {x: 37, y: 480}, fontSize: 8 },
		{ text: data.NumeroCasaTrabajo , absolutePosition: {x: 200, y: 480}, fontSize: 8 },
		{ text: data.CalleSecundariaTrabajo , absolutePosition: {x: 250, y: 480}, fontSize: 10 },
		{ text: data.TelefonoTrabajo , absolutePosition: {x: 357, y: 480}, fontSize: 8 },
		{ text: 'email@hotmail.com' , absolutePosition: {x: 450, y: 480}, fontSize: 10 },

		
		] :  []),




		
	]
	const gridLines = [];

for (let i = 0; i <= 595; i += 50) { // Líneas verticales cada 50 pt
  gridLines.push({
    type: 'line',
    x1: i,
    y1: 0,
    x2: i,
    y2: 842,
    lineWidth: 0.5,
    lineColor: '#cccccc',
  });
}

for (let j = 0; j <= 842; j += 50) { // Líneas horizontales cada 50 pt 
  gridLines.push({
    type: 'line',
    x1: 0,
    y1: j,
    x2: 595,
    y2: j,
    lineWidth: 0.5,
    lineColor: '#cccccc',
  });
}

    const docDefinition: TDocumentDefinitions = {
		pageSize: 'A4',
      pageMargins: [0, 0, 0, 0],

	background: function(currentPage) {
    return [
      {
        image:
          currentPage === 1
            ? 'data:image/jpeg;base64,' + fondoBase64
            : 'data:image/jpeg;base64,' + fondo2Base64,
        width: 595,
        height: 842,
      }
    ];
  },
	
    content: [
		
		...pagina1,
		{
		  table: {
		    widths: [55],  
		    body: [
		      [
		        {
		          text: actEconomica.find (p => p.idActEconomica == data.idActEconomica)?.Nombre,
		          fontSize: 5,
		        }
		      ]
		    ]
		  },
		  layout: 'noBorders',
		  absolutePosition: { x: 373, y: 230 },
		},
		
		{
		  table: {
		    widths: [69],  
		    body: [
		      [
		        {
		          text: profesiones.find (p => p.idProfesion == data.idProfesionConyuge)?.Nombre,
		          fontSize: 5,
		        }
		      ]
		    ]
		  },
		  layout: 'noBorders',
		  absolutePosition: {x: 228, y: 410},
		},
		
		{ text: '', pageBreak: 'after'},
		// {
		//   canvas: gridLines
		// },

		...pagina2,	
		{
		  table: {
		    widths: [125],  
		    body: [
		      [
		        {
		          text: data.NombreEmpresa,
		          fontSize: 5,
		        }
		      ]
		    ]
		  },
		  layout: 'noBorders',
		  absolutePosition: { x: 93, y: 397 },
		},
		

  ]
    };
    return docDefinition;
};