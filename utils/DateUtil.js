export const formatDate = (date) => {
  const formattedDate = date.toISOString().split("T")[0];
  const [year, month, day] = formattedDate.split("-");
  return `${day}-${month}-${year}`;
};

export const reverseDate = (date) => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};
