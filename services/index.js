function calculateAge({ dob }) {
  console.time("calculateAge")
  let ageDifference;
  let dateObj = new Date(dob);

  if (dateObj == "Invalid Date") {
    dateObj = new Date(Number(dob));
  }

  let dateIsValid = dateObj instanceof Date && !isNaN(dateObj);
  if (!dateIsValid) throw new Error("Please pass in a valid date");

  const getCurrentYear = new Date().getFullYear();
  const getYearOfBirth = dateObj.getFullYear();

  const currentMonth = new Date().getMonth();
  const monthOfBirth = dateObj.getMonth();

  const currentDate = new Date().getDate();
  const dateOfBirth = dateObj.getDate();

  ageDifference = getCurrentYear - getYearOfBirth;
  if (ageDifference < 0)
    throw new Error(
      "Invalid Date of Birth. Date of Birth cannot be in the future."
    );

  if (
    monthOfBirth > currentMonth ||
    (currentMonth == monthOfBirth && dateOfBirth > currentDate)
  ) {
    ageDifference = ageDifference - 1;
  }
  console.timeEnd("calculateAge");
  return ageDifference;
}

module.exports = {
  calculateAge,
};
