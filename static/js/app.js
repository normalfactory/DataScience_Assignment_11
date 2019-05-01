// App.js
// JavaScript used with UCSD Data Science assignment 11.
//
// Scott McEachern
// April 28, 2019


console.log('--> Start initial load of page from App.js');

const FILTERNOTUSED = '-1';


//-- Functions

function insertTableRow(sourceRow){
    /*
    Inserts a new row into the table

    Accepts : sourceRow - dictionary from the data.js that contains UFO information

    Returns : undefined
    */


    // Create New Row
    let newRow = d3.select('tbody').append('tr');


    // Add Columns
    newRow.append('td').text(sourceRow.datetime);
    newRow.append('td').text(sourceRow.city);
    newRow.append('td').text(sourceRow.state);
    newRow.append('td').text(sourceRow.country);
    newRow.append('td').text(sourceRow.shape);
    newRow.append('td').text(sourceRow.comments);
}


function updateTable(sourceObservations){
    /*
    Clears the table of existing records and then populates with the array of UFO observations

    Accepts : sourceObservations - array of UFO observations; from Data.js

    Returns : undefined
    */


    //- Clear Existing Rows
    d3.select('tbody').selectAll('*').remove();


    //-- Load All data into table
    sourceObservations.forEach(insertTableRow);


    console.log(`Completed updating table of records. Total Records: ${sourceObservations.length}`)
}


function handleFilterClick() {
    /*
    Applies the filter based on the information from the modal dialog.

    Returns : undefined
    */

    console.log("--> Got click event of adding filter");


    //- Prevent Page Refresh
    d3.event.preventDefault();

    

    //-- Get Filters in use
    //- Date Filter
    let dateFilterValue = d3.select('#dateFilterSelect').node().value;
    let useDateFilter = true;

    if (dateFilterValue == FILTERNOTUSED){
        useDateFilter = false;
    }

    //- City Filter
    let cityFilterValue = d3.select('#cityFilterSelect').node().value;
    let useCityFilter = true;

    if (cityFilterValue == FILTERNOTUSED){
        useCityFilter = false;
    }

    //- State Filter
    let stateFilterValue = d3.select('#stateFilterSelect').node().value;
    let useStateFilter = true;

    if (stateFilterValue == FILTERNOTUSED){
        useStateFilter = false;
    }

    //- Country Filter
    let countryFilterValue = d3.select('#countryFilterSelect').node().value;
    let useCountryFilter = true;

    if (countryFilterValue == FILTERNOTUSED){
        useCountryFilter = false;
    }

    //- Shape Filter
    let shapeFilterValue = d3.select('#shapeFilterSelect').node().value;
    let useShapeFilter = true;

    if (shapeFilterValue == FILTERNOTUSED){
        useShapeFilter = false;
    }


    //-- Apply Filter
    if ((useDateFilter == false) && (useCityFilter == false) && (useStateFilter == false) && (useCountryFilter == false) && (useShapeFilter == false) ) {
        
        console.log("No filter has been selected, loading table with all records");
        
        //- No Filters in use
        updateTable(data);


        //- Update Filter buttons
        clearFilterButton.attr('disabled', true);

        d3.select('#btnOpenFilter').text("Add Filter")
    }
    else
    {
        console.log(`Filter has been found, updating table with subset of records. Date: ${useDateFilter} City: ${useCityFilter} State: ${useStateFilter} Country: ${useCountryFilter} Shape: ${useShapeFilter}`);


        //- Get Subset of data
        //  Only has to match on of the filters provided
        let dataSubset = data.filter(item => {


            let useItem = false;


            //- Date Filter
            if (useDateFilter == true){
                if (item.datetime == dateFilterValue) {
                    useItem = true;
                }
            }

            //- City Filter
            if (useCityFilter == true){
                if (item.city == cityFilterValue){
                    useItem = true;
                }
            }

            //- State Filter
            if (useStateFilter == true){
                if (item.state == stateFilterValue){
                    useItem = true;
                }
            }

            //- Country Filter
            if (useCountryFilter == true){
                if (item.country == countryFilterValue){
                    useItem = true;
                }
            }

            //- Shape filter
            if (useShapeFilter == true){
                if (item.shape == shapeFilterValue){
                    useItem = true;
                }
            }


            return useItem;
        });


        //- Update Table
        updateTable(dataSubset);


        //- Update Filter buttons
        clearFilterButton.attr('disabled', null);

        d3.select('#btnOpenFilter').text("Update Filter")
    }
}


function clearFilterClick() {
    /*
    Updates to the table to have no filters; reloads the table with all of the records, sets the "no filter" option and
    disables the clear filter button.

    Accepts : nothing

    Returns : undefined
    */

    console.log("--> Got click event for clearing filter");


    //- Prevent Page Refresh
    d3.event.preventDefault();


    //- Update table with all records
    updateTable(data);


    //- Update Filter Dialog; set all to "no filter"
    d3.select('#dateFilterSelect').node().value = FILTERNOTUSED;

    d3.select('#cityFilterSelect').node().value = FILTERNOTUSED;

    d3.select('#stateFilterSelect').node().value = FILTERNOTUSED;

    d3.select('#countryFilterSelect').node().value = FILTERNOTUSED;

    d3.select('#shapeFilterSelect').node().value = FILTERNOTUSED;


    //- Disable Clear Button
    clearFilterButton.attr('disabled', true);

    d3.select('#btnOpenFilter').text("Add Filter")
}


function prepareFilter(sourceData) {
    /* Populates the HTML of the filter with unique values for city, state, country and shape.

    Accepts : sourceData (array) list of the dictionaries of the sightings

    Returns : undefined
    */

    //-- Date Filter
    let allDates = data.map(item => item.datetime);

    updateFilterOptions(allDates, '#dateFilterSelect', 'No date filter');


    //- City Filter
    let allCities = data.map(item => item.city);

    updateFilterOptions(allCities, '#cityFilterSelect', 'No city filter');


    //- State Filter
    let allStates = data.map(item => item.state);

    updateFilterOptions(allStates, '#stateFilterSelect', 'No state filter');


    //- Country Filter
    let allCountries = data.map(item => item.country);
    
    updateFilterOptions(allCountries, '#countryFilterSelect', 'No country filter');


    //- Shape Filter
    let allShapes = data.map(item => item.shape);

    updateFilterOptions(allShapes, '#shapeFilterSelect', 'No shape filter');
}


function updateFilterOptions(sourceValues, filterID, noFilterText){
    /* Updates the HTML with the options from the list of values provided; makes unique before adding to HTML.

    Accepts : sourceValues (array) list of the values to add to filter
              filterID (text) ID of the options tag in the HTML; example "#dateFilterSelect"
              noFilterText (text) text used for the no filter option; example "No date filter"
    */

    //- Get Unique Values
    let uniqueValues = [...new Set(sourceValues)];
    uniqueValues.sort();

    //- Set no filter
    d3.select(filterID).append('option').text(noFilterText).attr('value', FILTERNOTUSED);

    //- Add Unique Values
    uniqueValues.forEach(item => d3.select(filterID).append('option').text(item).attr('value', item));
}


//-- Prepare Filter Dialog
prepareFilter(data);


//-- Load All data into table
updateTable(data);



//- Prepare Click Events

// Add Filter
var filterButton = d3.select('#btnFilter');

filterButton.on('click', handleFilterClick);


// Clear Filter
var clearFilterButton = d3.select('#btnClearFilter');

clearFilterButton.on('click', clearFilterClick);


clearFilterButton.attr('disabled', true);


console.log('--> Completed initial loading of page')
