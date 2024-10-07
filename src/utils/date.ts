export const formatDate = (dateTime: number) => {
  const date = new Date(dateTime);
  const formattedDate = date
    .toLocaleString("en-US", { timeZoneName: "short" })
    .split(" ")
    .slice(0, 3)
    .join(" ");
  return formattedDate;
};
