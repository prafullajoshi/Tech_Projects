const prompt = require('prompt-sync')({ sigint: true })
const booking_controller = require('./controllers/ticketBookingController')
const booking_service = require('./services/ticketBooking')

console.log("+++++ Welcome To Movie Ticket Booking System +++++")
console.log("==================================================")


/**
 * This function shows menus to user, accept user's choice and process the request accordingly
 */
exports.acceptMenuChoice = () => {
    let choice
    do {
        console.log("1. Book Tickets\n2. Show Total Sales\n3. Cancel")
        choice = Number(prompt("Enter your choice :"))
        switch (choice) {
            case 1:
                booking_controller.processTickets()
                break
            case 2:
                booking_service.showTotalSalesDetails()
                break
            case 3:
                process.exit(0);
                break
            default:
                console.log("You entered invalid choice, please try again");
                break
        }
    } while (choice !== 3)
}

this.acceptMenuChoice()



