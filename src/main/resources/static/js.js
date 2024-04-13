/*function regTicket() {
    // Extract form values
    let film = document.getElementById("film").value;
    let number = document.getElementById("number").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;

    // Initialize flag variable
    let isFormValid = true;
    // Define regex patterns
    let textPattern = /^[a-zA-Z\s]*$/;
    let numberPattern = /^[0-9]+$/; // Allows only numbers
    let phonePattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate form values
    if (!film) {
        document.getElementById('filmError').innerText = 'Please select a film.';
        isFormValid = false;
    } else {
        document.getElementById('filmError').innerText = '';
    }
    if (!number || !numberPattern.test(number)) {
        document.getElementById('numberError').innerText = 'Please enter a valid number of tickets.';
        isFormValid = false;
    } else {
        document.getElementById('numberError').innerText = '';
    }
    if (!firstName || !textPattern.test(firstName)) {
        document.getElementById('firstNameError').innerText = 'Please enter a valid first name.';
        isFormValid = false;
    } else {
        document.getElementById('firstNameError').innerText = '';
    }
    if (!lastName || !textPattern.test(lastName)) {
        document.getElementById('lastNameError').innerText = 'Please enter a valid last name.';
        isFormValid = false;
    } else {
        document.getElementById('lastNameError').innerText = '';
    }
    if (!phone || !phonePattern.test(phone)) {
        document.getElementById('phoneError').innerText = 'Please enter a valid phone number.';
        isFormValid = false;
    } else {
        document.getElementById('phoneError').innerText = '';
    }
    if (!email || !emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        isFormValid = false;
    } else {
        document.getElementById('emailError').innerText = '';
    }

    // If form is valid, send ticket to server and clear form fields
    if (isFormValid) {
        const ticket = {
            film: film,
            number: number,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email
        }

        $.post("/saveTicket", ticket, function(){
            getTickets();
        });

        // Clear form fields
        document.getElementById("film").value = '';
        document.getElementById("number").value = '';
        document.getElementById("firstName").value = '';
        document.getElementById("lastName").value = '';
        document.getElementById("phone").value = '';
        document.getElementById("email").value = '';
    }
}
*/
const textPattern = /^[a-zA-Z\s]*$/;
const numberPattern = /^[0-9]+$/; // Allows only numbers
const phonePattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateInput = ticket => {
    // Check for empty fields
    if (!ticket.film || !ticket.number || !ticket.firstName ||
        !ticket.lastName || !ticket.phone || !ticket.email) {
        return false;
    }

    // Validate data types
    if (!textPattern.test(ticket.film) || !numberPattern.test(ticket.number) ||
        !textPattern.test(ticket.firstName) || !textPattern.test(ticket.lastName) ||
        !phonePattern.test(ticket.phone) || !emailPattern.test(ticket.email)) {
        return false;
    }

    return true;
};


$(() => {
    $("#regTicket").click(() => {
        const film = $("#film");
        const number = $("#number");
        const firstName = $("#firstName");
        const lastName = $("#lastName");
        const phone = $("#phone");
        const email = $("#email");

        const ticket = {
            film: film.val(),
            number: number.val(),
            firstName: firstName.val(),
            lastName: lastName.val(),
            phone: phone.val(),
            email: email.val()
        };

        if (validateInput(ticket)) {
            $.post("/saveTicket", ticket, () => hent());
            film.val("");
            number.val("");
            firstName.val("");
            lastName.val("");
            phone.val("");
            email.val("");
        } else {
            if (!textPattern.test(ticket.film) || !ticket.film) {
                $("#filmError").text("Please choose a film.");
            } else {
                $("#filmError").text("");
            }

            if (!numberPattern.test(ticket.number) || !ticket.number) {
                $("#numberError").text("Please enter a valid number of tickets.");
            } else {
                $("#numberError").text("");
            }

            if (!textPattern.test(ticket.firstName) || !ticket.firstName) {
                $("#firstNameError").text("Please enter a valid first name.");
            } else {
                $("#firstNameError").text("");
            }

            if (!textPattern.test(ticket.lastName) || !ticket.lastName) {
                $("#lastNameError").text("Please enter a valid last name.");
            } else {
                $("#lastNameError").text("");
            }

            if (!phonePattern.test(ticket.phone) || !ticket.phone) {
                $("#phoneError").text("Please enter a valid phone number.");
            } else {
                $("#phoneError").text("");
            }

            if (!emailPattern.test(ticket.email) || !ticket.email) {
                $("#emailError").text("Please enter a valid email address.");
            } else {
                $("#emailError").text("");
            }
        }
    });
    $("#deleteTickets").click(() => {
        $.ajax("/deleteAllTickets", {
            type: 'DELETE',
            success: () => hent(),
            error: (jqXhr, textStatus, errorMessage) => console.log(errorMessage)
        });
    });
});

const hent = () => $.get("/getTickets", ticket => format(ticket));
const inputval = ticket => {
    if (ticket.film === "") return false
    else if (ticket.number === "") return false
    else if (ticket.firstName === "") return false
    else if (ticket.lastName === "") return false
    else if (ticket.phone === "") return false
    else return ticket.email !== "";
}

const format = tickets => {
    let ut = "<table><tr><th>Film</th><th>Number of tickets</th><th>First name</th>" +
        "<th>Last name</th><th>Phone</th><th>Email</th></tr>";

    for (let ticket of tickets) {
        ut += "<tr><td>" + ticket.film + "</td><td>" + ticket.number + "</td><td>" + ticket.firstName + "</td>" +
            "<td>" + ticket.lastName + "</td><td>" + ticket.phone + "</td><td>" + ticket.email + "</td></tr>";
    }

    ut += "</table>";

    $("#tickets").html(ut);
}



/*function getTickets() {
    $.get( "/getTickets", function(updatedTickets) {
        displayTickets(updatedTickets);
    });
}

function displayTickets(tickets) {
    let ticketDiv = document.getElementById("tickets");
    ticketDiv.innerHTML = ""; // clear existing tickets

    // loop through all tickets and display
    for (let i = 0; i < tickets.length; i++) {
        ticketDiv.innerHTML += JSON.stringify(tickets[i]) + "<br>";
        console.log(tickets);
    }
    /*let ut ="<table><tr><th> Film: </th><th>" +
        "Number of tickets: </th><th> First name: </th><th> Last name: </th><th>" +
        " Phone: </th><th> Email: </th></tr>";
    for(const ticket of tickets){
        ut+="<tr><td>"+ ticket.film+ "</td><td>"+ticket.number+ "</td><td>"
        +ticket.firstName+ "</td><td>"+ticket.lastName+ "</td><td>"+ticket.phone+ "</td><td>"
        +ticket.email+ "</td></tr>";
    }
    ut+="</table>";
    $("#tickets").html(ut);*/
/*}

function deleteAllTickets() {
    $.ajax({
        url: '/deleteAllTickets',
        type: 'DELETE',
        success: function() {
            getTickets();
        }
    });
}*/