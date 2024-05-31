// RESPONSIBILITY BY: HO HUU NHAN

/**
 * Formats a date object into a string in the format "dd-mm-yyyy".
 *
 * @param {Date} date - The date object to format.
 *
 * This function first converts the date object to an ISO string and splits it at "T" to get the date part.
 * It then splits the date part at "-" to get the year, month, and day.
 * Finally, it returns a string in the format "dd-mm-yyyy".
 *
 * @returns {string} The formatted date string.
 */
export const formatDate = (date) => {
  const formattedDate = date.toISOString().split("T")[0];
  const [year, month, day] = formattedDate.split("-");
  return `${day}-${month}-${year}`;
};

/**
 * Reverses a date string from the format "dd-mm-yyyy" to "yyyy-mm-dd".
 *
 * @param {string} date - The date string to reverse.
 *
 * This function splits the date string at "-" to get the day, month, and year.
 * It then returns a string in the format "yyyy-mm-dd".
 *
 * @returns {string} The reversed date string.
 */
export const reverseDate = (date) => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};
