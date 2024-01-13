const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data
d3.json(url).then(function(data) {

    // create dropdown and populate with values
    let dropdownMenu = d3.select("#selDataset");

    for (let i = 0; i < data.names.length; i++) {
        menuItem = dropdownMenu.append('option')
        menuItem.property("value",`${data.names[i]}`)
        menuItem.text(`${data.names[i]}`)
    }

    // get the sample IDs
    let labels = data.samples[0].otu_ids

    // need to add 'OTU' so that plotly doesn't treat samples as integers
    // in the bar chart
    barLabels = labels.map(item => `OTU ${item}`)

    // get sample values
    let values = data.samples[0].sample_values

    // get sample names
    let hoverLabels = data.samples[0].otu_labels
    
    trace1 = {
        x:values.slice(0,10).reverse(),
        y:barLabels.slice(0,10).reverse(),
        type:'bar',
        orientation:'h',
        text:hoverLabels.slice(0,10).reverse()
    }

    // Apply a title to the layout
    let layout1 = {
        title:"Top 10 OTUs"
    }

    // Render the plot to the div tag with id "bar" on the page
    Plotly.newPlot("bar", [trace1], layout1);

    trace2 = {
        x:labels,
        y:values,
        mode:'markers',
        marker: {color:labels,
                 size:values},
        text:hoverLabels
    }

    let layout2 = {
        title:"Bubble Chart"
    }

    // Render the plot to the div tag with id "bubble" on the page
    Plotly.newPlot("bubble",[trace2],layout2)


    // metadata
    let metadata = data.metadata[0]

    let metaDataTable = d3.select('.panel-body').append("table").classed("table-striped", true)
    
    // metaDataTable.classed("table-striped", true)

    for (let i = 0; i < Object.keys(metadata).length; i++) {

        tableRow = metaDataTable.append('tr')
        tableRow.append('td').text(`${Object.keys(metadata)[i]}: `)
        tableRow.append('td').text(Object.values(metadata)[i])

    }

});