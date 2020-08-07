const theatre_seats = require('../models/seating')
const prices = require('../models/prices')
const taxes = require('../models/taxes')
require('../models/taxes')

let totalRevenue = 0
let totalServiceTax = 0
let totalSwachhBharatCess = 0
let totalKrishiKalyanCess = 0

/**
 * @param  {} seatNumbers : Array of all seat numbers selected by user
 * @param  {} showNumber : Show number selected by user
 */
exports.bookTickets = (seatNumbers, showNumber) => {

    const theatre = theatre_seats.seating
    let showNo = "show_" + showNumber
    let msg = ""
    let status = false
    let platinumCount = 0
    let goldCount = 0
    let silverCount = 0
    let seatLength = seatNumbers.length
    for (let i = 0; i < seatLength; i++) {
        let selectedKey = seatNumbers[i]

        if (selectedKey.startsWith("A")) {
            if (theatre[showNo].platinum.hasOwnProperty(selectedKey) && theatre[showNo].platinum[selectedKey] === false) {
                theatre[showNo].platinum[selectedKey] = true
                status = true
                platinumCount++
            } else {
                msg = `${selectedKey} Not Available, Please select different seats\n`
                status = false
                break
            }
        } else if (selectedKey.startsWith("B")) {
            if (theatre[showNo].gold.hasOwnProperty(selectedKey) && theatre[showNo].gold[selectedKey] === false) {
                theatre[showNo].gold[selectedKey] = true
                status = true
                goldCount++
            } else {
                msg = `${selectedKey} Not Available, Please select different seats\n`
                status = false
                break
            }
        } else if (selectedKey.startsWith("C")) {
            if (theatre[showNo].silver.hasOwnProperty(selectedKey) && theatre[showNo].silver[selectedKey] === false) {
                theatre[showNo].silver[selectedKey] = true
                status = true
                silverCount++
            } else {
                msg = `${selectedKey} Not Available, Please select different seats\n`
                status = false
                break
            }
        }
    }
    if (status === true) {
        msg = `Successfully Booked - Show ${showNumber}`
        this.showBookingDetails(msg, platinumCount, goldCount, silverCount)
    } else {
        console.log(msg)
    }
}

/**
 * @param  {} msg           : Message indicating status of booking
 * @param  {} platinumCount : Total platinum tickets
 * @param  {} goldCount     : Total gold tickets
 * @param  {} silverCount   : Total silver tickets
 */
exports.showBookingDetails = (msg, platinumCount, goldCount, silverCount) => {
    let { subTotal, serviceTax, swachhBharatCess, krishiKalyanCess, total } = this.calculateBill(platinumCount, goldCount, silverCount)
    console.log(msg);
    console.log(`Subtotal:Rs. ${subTotal}`)
    console.log(`Service Tax @14%: Rs. ${serviceTax}`)
    console.log(`Swachh Bharat Cess @0.5%: Rs. ${swachhBharatCess}`)
    console.log(`Krishi Kalyan Cess @0.5%: Rs. ${krishiKalyanCess}`)
    console.log(`Total: Rs. ${total}\n`)

    // Calculation of total sales
    totalRevenue += subTotal
    totalServiceTax = Number(totalServiceTax) + Number(serviceTax)
    totalSwachhBharatCess = Number(totalSwachhBharatCess) + Number(swachhBharatCess)
    totalKrishiKalyanCess = Number(totalKrishiKalyanCess) + Number(krishiKalyanCess)
}

/**
 * @param  {} platinumCount : Total platinum tickets for bill caclulation
 * @param  {} goldCount     : Total gold tickets for bill caclulation
 * @param  {} silverCount   : Total silver tickets for bill caclulation
 */
exports.calculateBill = (platinumCount, goldCount, silverCount) => {
    const price = prices.price
    let subTotal = (platinumCount * price.platinum) + (goldCount * price.gold) + (silverCount * price.silver)
    let serviceTax = (subTotal * taxes.service_tax).toFixed(2)
    let swachhBharatCess = (subTotal * taxes.swachh_bharat_cess).toFixed(2)
    let krishiKalyanCess = (subTotal * taxes.krishi_kalyan_cess).toFixed(2)
    let total = Math.round(Number(subTotal) + Number(serviceTax) + Number(swachhBharatCess) + Number(krishiKalyanCess))
    return {
        subTotal,
        serviceTax,
        swachhBharatCess,
        krishiKalyanCess,
        total
    }
}


/**
 * This function shows total sales of a theatre when user opts cancelling the booking
 */
exports.showTotalSalesDetails = () => {
    console.log("\n++++++++++++++++++++++++++++++++++++++++")
    console.log("Total Sales:");
    console.log(`Revenue:Rs. ${totalRevenue}`)
    console.log(`Service Tax:Rs. ${totalServiceTax.toFixed(2)}`)
    console.log(`Swachh Bharat Cess:Rs. ${totalSwachhBharatCess.toFixed(2)}`)
    console.log(`Krishi Kalyan Cess:Rs. ${totalKrishiKalyanCess.toFixed(2)}`)
    console.log("++++++++++++++++++++++++++++++++++++++++\n")

}
