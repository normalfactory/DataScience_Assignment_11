// App.js
// JavaScript used with UCSD Data Science assignment 11.
//
// Scott McEachern
// April 28, 2019


console.log('--> Start initial load of page from App.js');



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


    //- Get DateTime Filter
    let dateFilterValue = d3.select('#dateFilterInput').property('value');


    //- Get Subset of data
    let dataSubset = data.filter(item => {
        if (item.datetime == dateFilterValue)
        {
            return true;
        }
        else
        {
            return false;
        }
    });


    //- Update Table
    updateTable(dataSubset);


    //- Update Filter buttons
    clearFilterButton.attr('disabled', null);

    d3.select('#btnOpenFilter').text("Update Filter")
}


function clearFilterClick() {
    /*
    Updates to the table to have no filter

    Accepts : nothing

    Returns : undefined
    */

    console.log("--> Got click event for clearing filter");


    //- Update table with all records
    updateTable(data);


    //- Disable Clear Button
    clearFilterButton.attr('disabled', true);

    d3.select('#btnOpenFilter').text("Add Filter")
}


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