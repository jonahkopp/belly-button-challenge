const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data
d3.json(url).then(function(data) {

    // get the top 10 sample IDs and reverse them for cleaner plotting later
    let labels = data.samples[0].otu_ids.slice(0,10).reverse()

    // need to add 'OTU' so that plotly doesn't treat samples as integers in plotting
    labels = labels.map(item => `OTU ${item}`)

    values = data.samples[0].sample_values.slice(0,10).reverse()

    hoverLabels = data.samples[0].otu_labels.slice(0,10).reverse()
    
    trace1 = {
        x:values,
        y:labels,
        type:'bar',
        orientation:'h',
        text:hoverLabels
    }

    // Apply a title to the layout
    let layout = {
        title:"Top 10 OTUs"
    }

    // Render the plot to the div tag with id "bar" on the page
    Plotly.newPlot("bar", [trace1], layout);

});