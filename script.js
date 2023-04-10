function setErrorState(childrenElements) {
  childrenElements[0].classList.add("error");
  childrenElements[1].classList.add("error");
  childrenElements[2].style.display = "block";
}

function clearErrorState(childrenElements) {
  childrenElements[0].classList.remove("error");
  childrenElements[1].classList.remove("error");
  childrenElements[2].style.display = "none";
}

function validateDate() {
  let error = false;
  const daysInput = Number(document.getElementById("day").value);
  const monthsInput = Number(document.getElementById("month").value);
  const yearsInput = Number(document.getElementById("year").value);

  document.querySelectorAll("input").forEach((input) => {
    const name = input.name;

    if (name === "day" && (daysInput <= 0 || daysInput > 31)) {
      error = true;
      setErrorState(document.getElementById(name + "Group").children);
    } else if (name === "day" && !(daysInput <= 0 || daysInput > 31)) {
      clearErrorState(document.getElementById(name + "Group").children);
    }

    if (name === "month" && (monthsInput <= 0 || monthsInput > 12)) {
      error = true;
      setErrorState(document.getElementById(name + "Group").children);
    } else if (name === "month" && !(monthsInput <= 0 || monthsInput > 12)) {
      clearErrorState(document.getElementById(name + "Group").children);
    }

    if (name === "year" && yearsInput.toString().length !== 4) {
      error = true;
      setErrorState(document.getElementById(name + "Group").children);
    } else if (name === "year" && yearsInput.toString().length === 4) {
      clearErrorState(document.getElementById(name + "Group").children);
    }
  });

  return { error, daysInput, monthsInput, yearsInput };
}

// YYYY-MM-DD string
function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    months += 12;
    years--;
    console.log(months);
  }

  if (days < 0) {
    months--;
    const numOfDaysInCurrentMonth = new Date(
      birthDate.getFullYear(),
      birthDate.getMonth(),
      0
    ).getDate();

    const remDaysInBirthMonth = numOfDaysInCurrentMonth - birthDate.getDate();

    const daysElaspsedInCurrentMonth = today.getDate();
    days = remDaysInBirthMonth + daysElaspsedInCurrentMonth;
  }

  const age = {
    years,
    months,
    days,
  };

  return age;
}

function onSubmitHandler(e) {
  e.preventDefault();
  validateDate();

  const { error, daysInput, monthsInput, yearsInput } = validateDate();

  if (!error) {
    const { days, months, years } = calculateAge(
      `${yearsInput}-${monthsInput}-${daysInput}`
    );
    document.getElementById("daysResult").innerText = days;
    document.getElementById("monthsResult").innerText = months;
    document.getElementById("yearsResult").innerText = years;
  }
}

document.querySelector("form").addEventListener("submit", onSubmitHandler);
