// Load registrations when page opens
document.addEventListener("DOMContentLoaded", loadRegistrations);


// Select event from event card
function selectEvent(eventName) {

    document.getElementById("eventName").value = eventName;

    document.getElementById("register").scrollIntoView({
        behavior: "smooth"
    });
}


// Registration form
document.getElementById("registrationForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const studentId = document.getElementById("studentId").value;
    const department = document.getElementById("department").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const eventName = document.getElementById("eventName").value;


    const registration = {

        name: studentName,
        id: studentId,
        department: department,
        email: email,
        phone: phone,
        event: eventName

    };


    let registrations =
        JSON.parse(localStorage.getItem("registrations")) || [];


    registrations.push(registration);


    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    alert("Registration successful!");


    document.getElementById("registrationForm").reset();


    loadRegistrations();


    document.getElementById("registrations").scrollIntoView({
        behavior: "smooth"
    });

});


// Display registrations
function loadRegistrations() {

    const table =
        document.getElementById("registrationTable");

    let registrations =
        JSON.parse(localStorage.getItem("registrations")) || [];


    table.innerHTML = "";


    registrations.forEach(function(registration, index) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${registration.name}</td>

            <td>${registration.id}</td>

            <td>${registration.department}</td>

            <td>${registration.event}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteRegistration(${index})">
                    Delete
                </button>
            </td>

        `;


        table.appendChild(row);

    });


    document.getElementById("registrationCount").textContent =
        registrations.length;

}


// Delete registration
function deleteRegistration(index) {

    let registrations =
        JSON.parse(localStorage.getItem("registrations")) || [];


    registrations.splice(index, 1);


    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    loadRegistrations();

}


// Search events
function searchEvents() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();


    const cards =
        document.querySelectorAll(".event-card");


    cards.forEach(function(card) {

        const text =
            card.innerText.toLowerCase();


        if (text.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}