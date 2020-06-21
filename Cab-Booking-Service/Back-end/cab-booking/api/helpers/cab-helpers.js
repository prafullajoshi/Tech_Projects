const CABS = require("../../model/cab");

require(`../../model/cab`);

function getClosestCab (location) {
    let closest = null;
    let closestDistance = Infinity;
    CABS.forEach(function(cab) {
      if (!cab.isBooked) {
        let distance = getDistance(cab.location, location);
        if (distance < closestDistance) {
            closestDistance = distance;
            closest = cab;
        }
      }
    });
    return closest;
}

function getDistance(location1, location2) {
    let a = location1.lattitude - location2.lattitude;
    let b = location1.longitude - location2.longitude;
    let c = Math.sqrt(a*a + b*b);
    return c;
}

  module.exports = {
      getClosestCab,
      getDistance
}