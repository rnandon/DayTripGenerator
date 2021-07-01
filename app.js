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
// NOTE: Making functions for this now so if json/csv stuff is included later I can refactor these
//

function buildOptionsTransportation() {
    return ["Plane", "Train", "Automobile", "Boat", "Walk"];
}

function buildOptionsDestinations() {
    return ["Duluth", "Minneapolis", "North Shore", "Park"];
}

function buildOptionsEntertainment() {
    return ["Shopping", "Concert", "Museum", "Relax", "Movie"];
}

function buildOptionsRestaurants() {
    return ["American", "Italian", "Fusion", "Indian", "Asian", "Fast food", "Mexican"];
}

function buildOptionsAll(transportation, destinations, entertainment, restaurants) {
    let options = [];
    options["transportation"] = buildOptionsTransportation();
    options["destination"] = buildOptionsDestinations();
    options["entertainment"] = buildOptionsEntertainment();
    options["restaurant"] = buildOptionsRestaurants();

    return options;
}




//
// Build and reroll trip
//

function generateTrip(options) {
    let trip = [];
    trip["transportation"] = randomlySelectOption(options["transportation"]);
    trip["destination"] = randomlySelectOption(options["destination"]);
    trip["entertainment"] = randomlySelectOption(options["entertainment"]);
    trip["restaurant"] = randomlySelectOption(options["restaurant"]);

    return trip;
}

function rerollCategory(category, trip, options) {
    switch (category) {
        case "1":
            trip["transportation"] = randomlySelectOption(options["transportation"]);
            break;
        case "2":
            trip["destination"] = randomlySelectOption(options["destination"]);
            break;
        case "3":
            trip["entertainment"] = randomlySelectOption(options["entertainment"]);
            break;
        case "4":
            trip["restaurant"] = randomlySelectOption(options["restaurant"]);
            break;
        case "5":
            trip = generateTrip(options);
            break;

        default:
            break;
    }

    return trip;
}




//
// Display functions
//

function stringifyCompletedTrip(trip) {
    // Trip: Transportation, Destination, Entertainment, Restaurant
    return `Here is your complete trip:
    Transportation: ${trip["transportation"]}
    Destination: ${trip["destination"]}
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
    1. Transportation
    2. Destination
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
    let options = buildOptionsAll();
    let trip = generateTrip(options);

    let tripApproved = false;
    let tripString;

    // Let the user modify the trip until they get what they want
    while (!tripApproved) {
        tripString = stringifyCompletedTrip(trip);
        let tripApproval = promptCompletedTrip(tripString);
        if (tripApproval === "y" || tripApproval === "Y") {
            let category = promptRerollCategory();
            trip = rerollCategory(category, trip, options);
        }
        else if (tripApproval === "n" || tripApproval === "N") {
            tripApproved = true;
        }
    }

    consoleLogCompletedTrip(tripString);
}

main();