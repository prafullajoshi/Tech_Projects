const prompt = require('prompt-sync')({ sigint: true })
const booking_service = require('../services/ticketBooking')
const app = require('../app')
exports.processTickets = () => {
    let seatNumbers
    let showNumber = Number(prompt("Enter show number :"))

    let show = "show_"


    if (showNumber < 0 || !Number.isInteger(showNumber)) {
        console.log("Invalid show. Please try again")
        app.acceptMenuChoice()
    }

    let seatNos = prompt("Enter seats :")
    seatNumbers = seatNos.trim().toUpperCase().split(' ')

    switch (showNumber) {
        case 1:
            booking_service.bookTickets(seatNumbers, showNumber)
            break;
        case 2:
            booking_service.bookTickets(seatNumbers, showNumber)
            break;
        case 3:
            booking_service.bookTickets(seatNumbers, showNumber)
            break;
        default:
            console.log("You selected invalid show. Please try again.")
            break;
    }
}
