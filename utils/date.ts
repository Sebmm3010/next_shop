export const formatDate = (date: string) => {
  const newDate = new Date(date).toLocaleString();
  return newDate;
};
