"use strict";


// --------------------------------------------- //
// ------------- DAYTRIP GENERATOR ------------- //
// --------------------------------------------- //

// Description:
// Generate a day trip from provided data.
// Day trips should consist of a destination, restaurant, entertainment, and mode of transportation.
// If the day trip isn't satisfactory, the user can re-roll any of the categories.
// Prints the day trip to the console.
// Each function should have only one responsibility.

// Ideas for expanding scope:
// - Add ability to provide list as csv or json
// - Get options from default csv/json and eliminate hard-coded options
// - Build UI for re-rolling each feature, entire trip, and confirming
// - Filter options based on destination. Different destination have different things

//
// Randomly select from a given array of options
//
function randomlySelectOption(options) {
    let selectionIndex = getSelectionIndex(options.length);
    return options[selectionIndex];
}

function getSelectionIndex(length) {
    return Math.floor(Math.random() * length);
}



//
// Build out selections
//


function selectDestination(destinations) {
    return randomlySelectOption(destionations);
}

let destinations = [
    {
        "name" : "Rochester",
        "transportation":   ["Automobile", "Bike", "Bus", "Taxi", "Walk"],
        "entertainment":    ["Museum", "Winery", "Art Center", "Shopping", "Hiking", "Concert", "Tours", "Park", "Theater", "Brewery", "Zoo"],
        "restaurant":       ["Seafood", "Noodles", "Pizza", "Italian", "American", "Indian", "Mexican", "Breakfast", "BBQ", "Chinese", "Steakhouse"]
    },
    {
        "name" : "Minneapolis",
        "transportation":   ["Automobile", "Bike", "Bus", "Rail", "Taxi", "Walk"],
        "entertainment":    ["Museum", "Winery", "Art Center", "Shopping", "Hiking", "Concert", "Tours", "Park", "Theater", "Brewery", "Zoo", "Sports", "Boating", "Aquarium", "Amusement park"],
        "restaurant":       ["Pizza", "Italian", "Caribbean Fusion", "Somali", "Comfort", "American", "Southern", "Japanese", "Bakery", "Cuban", "Mexican", "Pho", "Nordic", "BBQ", "Soup and Sandwich"]
    },
    {
        "name" : "Duluth",
        "transportation":   ["Automobile", "Bike", "Bus", "Taxi", "Walk"],
        "entertainment":    ["Museum", "Art Center", "Shopping", "Hiking", "Concert", "Park", "Theater", "Brewery", "Zoo", "Sports", "Boating", "Aquarium"],
        "restaurant":       ["Pizza", "Steakhouse", "American", "BBQ", "Soup and Sandwich", "Soul", "Mexican", "Seafood", "Breakfast", "Caribbean", "Mexican"]
    },
    {
        "name" : "Bemidji",
        "transportation":   ["Automobile", "Bike", "Bus", "Taxi", "Walk"],
        "entertainment":    ["Museum", "Art Center", "Shopping", "Hiking", "Concert", "Park", "Theater", "Brewery", "Boating"],
        "restaurant":       ["American", "Mexican", "Breakfast", "Chinese", "Italian", "BBQ", "Bakery", "Thai", "Pizza", "Wings", "Steakhouse"]
    },
    {
        "name" : "Boundary Waters Canoe Area",
        "transportation":   ["Walk", "Kayak", "Canoe", "Swim"],
        "entertainment":    ["Birdwatching", "Hiking", "Fishing", "Sight seeing", "Boating", "Swimming", "Camping"],
        "restaurant":       ["Grill", "Picnic", "Forage"]
    },
    {
        "name" : "Superior National Forest",
        "transportation":   ["Automobile", "OHV", "Walk", "Hike", "Canoe", "Kayak", "Bike"],
        "entertainment":    ["Birdwatching", "Hiking", "Fishing", "Sight seeing", "Boating", "Swimming", "Camping", "Hunting", "Snowmobiling", "Skiing"],
        "restaurant":       ["Grill", "Picnic", "Forage"]
    }
]




//
// Build and reroll trip
//

function generateTrip(destinations) {
    let trip = [];
    let destination = randomlySelectOption(destinations);

    // Using key value pairs to make data access cleaner during reroll of values
    trip["destination"] = destination["name"];
    trip["transportation"] = randomlySelectOption(destination["transportation"]);
    trip["entertainment"] = randomlySelectOption(destination["entertainment"]);
    trip["restaurant"] = randomlySelectOption(destination["restaurant"]);
    // Storing all data for the selected destination to allow rerolling other aspects without changing the entire trip
    trip["destinationData"] = destination;

    return trip;
}

function rerollCategory(category, trip, destinations) {
    switch (category) {
        case "1":
            trip = rerollDestination(trip, destinations);
            break;
        case "2":
            trip["transportation"] = randomlySelectOption(trip["destinationData"]["transportation"]);
            break;
        case "3":
            trip["entertainment"] = randomlySelectOption(trip["destinationData"]["entertainment"]);
            break;
        case "4":
            trip["restaurant"] = randomlySelectOption(trip["destinationData"]["restaurant"]);
            break;
        case "5":
            trip = generateTrip(destinations);
            break;

        default:
            break;
    }

    return trip;
}

function rerollDestination(trip, destinations) {
    // NOTE: This is getting a bit big... Might be best to swap out for subfunctions.


    // Storing current values to keep the trip as similar as possible after new destination assingment
    let currentTransport = trip["transportation"];
    let currentEntertainment = trip["entertainment"]
    let currentRestaurant = trip["restaurant"]

    // Get new destination, and see if the other options are options for the new destination
    let newDestination = randomlySelectOption(destinations);
    let sameTransport = (-1 != newDestination["transportation"].findIndex((element) => element === currentTransport));
    let sameEntertainment = (-1 != newDestination["entertainment"].findIndex((element) => element === currentEntertainment));
    let sameRestaurant = (-1 != newDestination["restaurant"].findIndex((element) => element === currentRestaurant));

    // Build out a new trip and match as much as possible to the old one
    // Since destinations have different features, need to go through point by point
    let newTrip = [];
    newTrip["destination"] = newDestination["name"];
    newTrip["destinationData"] = newDestination;
    if (sameTransport) {
        newTrip["transportation"] = trip["transportation"];
    } else {
        newTrip["transportation"] = randomlySelectOption(trip["destinationData"]["transportation"])
    }
    if (sameEntertainment) {
        newTrip["entertainment"] = trip["entertainment"];
    } else {
        newTrip["entertainment"] = randomlySelectOption(trip["destinationData"]["entertainment"])
    }
    if (sameRestaurant) {
        newTrip["restaurant"] = trip["restaurant"];
    } else {
        newTrip["restaurant"] = randomlySelectOption(trip["destinationData"]["restaurant"])
    }

    return newTrip;
}




//
// Display functions
//

function stringifyCompletedTrip(trip) {
    // Trip: Transportation, Destination, Entertainment, Restaurant
    return `Here is your complete trip:
    Destination: ${trip["destination"]}
    Transportation: ${trip["transportation"]}
    Entertainment: ${trip["entertainment"]}
    Restaurant: ${trip["restaurant"]}`;
}

function consoleLogCompletedTrip(tripString) {
    console.log(tripString);
    //console.log("\n\nWould you like to change the trip?");

}

function promptCompletedTrip(tripString) {
    let promptString = tripString + "\n\nWould you like to change the trip? Y/N"
    let userResponse = prompt(promptString);

    return userResponse;
}

function promptRerollCategory() {
    let userResponse = prompt(`Which category would you like to replace?
    1. Destination
    2. Transportation
    3. Entertainment
    4. Restaurant
    5. All`)

    if (userResponse === "1" ||
        userResponse === "2" ||
        userResponse === "3" ||
        userResponse === "4" ||
        userResponse === "5") {
        return userResponse;
    } else {
        return promptRerollCategory();
    }
}





//
// MAIN FUNCTION
//

function main() {
    // Initialize options and trip
    let trip = generateTrip(destinations);

    let tripApproved = false;
    let tripString;

    // Let the user modify the trip until they get what they want
    while (!tripApproved) {
        tripString = stringifyCompletedTrip(trip);
        let tripApproval = promptCompletedTrip(tripString);
        if (tripApproval === "y" || tripApproval === "Y") {
            let category = promptRerollCategory();
            trip = rerollCategory(category, trip, destinations);
        }
        else if (tripApproval === "n" || tripApproval === "N") {
            tripApproved = true;
        }
    }

    consoleLogCompletedTrip(tripString);
}

main();