var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class BillDate {
  static build() {
    const date = new Date();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return [months[month], day, year].join(", ");
  }
}

export default BillDate;
