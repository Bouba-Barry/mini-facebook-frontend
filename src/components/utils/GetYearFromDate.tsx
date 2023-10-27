const extractYearMonthDayFromDate = (dateString: string): { year: number, month: string, day: number } | null => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return null; // La date n'est pas valide
  }

  const year = date.getFullYear();
  const month = convertMonthNumberToText(date.getMonth() + 1); // Ajoutez 1 pour l'index des mois
  const day = date.getDate();

  return { year, month, day };
}

const convertMonthNumberToText = (monthNumber: number): string  => {
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1]; // Soustrayez 1 pour correspondre à l'index du tableau
  } else {
    return "Mois inconnu";
  }
}
export default extractYearMonthDayFromDate;