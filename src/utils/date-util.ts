export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;

  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function getCurrentWeekLabel(): string {
  const today = new Date();

  const monthName = today.toLocaleString('es-CO', { month: 'long' });
  const year = today.getFullYear();
  const weekNumber = getWeekNumber(today);

  return `Semana ${weekNumber} - ${monthName} ${year}`;
}
