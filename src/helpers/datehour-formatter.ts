export class DateFormatterHour {


  // Nueva: fecha + hora
  static dateTimeFormatter = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24h format
  });



  static getDDMMYYYYWithTime(date: Date): string {
    return this.dateTimeFormatter.format(date);
  }
}
