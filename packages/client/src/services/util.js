import moment from "moment";

export function ISOtoDateString(ISODate) {
  return moment.utc(ISODate).format("DD-MM-YYYY");
}

export const consverPriceToInternationalFormat = (stringToFix) => {
  if (stringToFix)
    return stringToFix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else return "NA";
};

export const addDashes = (phone) => {
  return phone.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
};

export const textTransform = (str) => {
  const arr = str.replace(/_/g, " ").split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
  }
  const str2 = arr.join(" ");
  return str2;
};
