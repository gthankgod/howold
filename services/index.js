function calculateAge({ dob }) {
  let dateObj =
    typeof Number(dob) === "number" && dob.length > 4
      ? new Date(Number(dob))
      : new Date(dob);

  let dateIsValid = dateObj instanceof Date && !isNaN(dateObj);
  if (!dateIsValid) throw new Error("Please pass in a valid date");

  const getCurrentYear = new Date().getFullYear();
  const getYearOfBirth = dateObj.getFullYear();

  let ageDifference = getCurrentYear - getYearOfBirth;
  if (ageDifference < 0)
    throw new Error(
      "Invalid Date of Birth. Date of Birth cannot be in the future."
    );

  return ageDifference;
}

module.exports = {
  calculateAge,
};
