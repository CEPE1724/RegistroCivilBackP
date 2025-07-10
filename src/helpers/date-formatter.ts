export class DateFormatter {
  static  formatter = new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
static getDDMMYYYY(date: Date): string {
    
    return this.formatter.format(date);
    }
}