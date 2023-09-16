export const createdAt = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy.MM.dd");
  return formattedDate;
};
