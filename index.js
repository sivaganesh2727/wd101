if (!localStorage.getItem("firstVisit")) {
    localStorage.setItem("firstVisit", "true");  // Set first visit flag
    localStorage.removeItem("userEntries");      // Clear previous entries
}
let dob = document.getElementById("dob");
let date = new Date();
let year = date.getFullYear() - 55;
let minDate = String(year);
if (date.getMonth() + 1 < 10) {
  minDate = minDate + "-" + "0" + String(date.getMonth() + 1);
} else {
  minDate = minDate + "-" + String(date.getMonth() + 1);
}
if (date.getDate() < 10) {
  minDate = minDate + "-" + "0" + String(date.getDate());
} else {
  minDate = minDate + "-" + String(date.getDate());
}

const year1 = date.getFullYear() - 18;
let maxDate = String(year1);
if (date.getMonth() + 1 < 10) {
  maxDate = maxDate + "-" + "0" + String(date.getMonth() + 1);
} else {
  maxDate = maxDate + "-" + String(date.getMonth() + 1);
}
if (date.getDate() < 10) {
  maxDate = maxDate + "-" + "0" + String(date.getDate());
} else {
  maxDate = maxDate + "-" + String(date.getDate());
}

dob.setAttribute("max", maxDate);
dob.setAttribute("min", minDate);
console.log(document.getElementById("dob"));
dob.addEventListener("input", () => validatedob(dob));
function validatedob(dob) {
    const date = new Date();
    const birthDate = new Date(dob.value);
    var age = date.getFullYear() - birthDate.getFullYear();
    var m = date.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && date.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(age);
    if (age < 18 || age > 55) {
        console.log("Age is not between 18 and 55");
        dob.setCustomValidity("Age should be between 18 and 55");
        dob.reportValidity();
    } else {
        console.log("Age is between 18 and 55");
        dob.setCustomValidity("");
    }
}

const retrieveEntries = () => {
    let entries = localStorage.getItem("userEntries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

let retEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries
        .map((entry) => {
            const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
            const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
            const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
            const dateCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
            const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptTerms}</td>`;

            const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dateCell} ${acceptTermsCell}</tr>`;
            return row;
        })
        .join("\n");

    const table = `<table class="table-auto w-full">
            <tr>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Email</th>
                <th class="px-4 py-2">Password</th>
                <th class="px-4 py-2">DOB</th>
                <th class="px-4 py-2">Accepted terms?</th>
            </tr> ${tableEntries}
        </table>`;

    let details = document.getElementById("userEntries");
    details.innerHTML = table;
};
let userForm = document.getElementById("user-form");
let userEntries = [];

const saveUserForm = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;
    const password = document.getElementById("password").value;

    const entry = {
        name,
        email,
        dob,
        acceptTerms,
        password,
    };

    userEntries.push(entry);

    localStorage.setItem("userEntries", JSON.stringify(userEntries));
    displayEntries();

    userForm.reset();
};

userForm.addEventListener("submit", (e) => saveUserForm(e));
displayEntries();