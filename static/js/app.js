// Get the Belly Button endpoint
const bbdata = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(bbdata).then(function(data) {
  console.log(data);
});

// Display and initialize the default plot
function init(){
    //assigning variable to the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    d3.json(bbdata).then((data) => {
                // Set a variable for the sample.json names object
                let names = data.names;
        
                // Add  samples.names.id to dropdown menu
                data.names.forEach((id) => {

                    // Log the value of id for each iteration of the loop
                    console.log(id);
        
                    dropdownMenu.append("option")
                    .text(id)
                    .property("value",id);
                });

                // Set the first sample from the list
                let sample_data = names[0];

                // Log the value of sample_one
                console.log(sample_data);

                // Display initial \ default data plots
                barbubbleCharts(sample_data);
                Metadata(sample_data);
    });
}

// Function for displaying and adding bar and bubble info \ chart
function barbubbleCharts(sample) {

    // Use D3 to retrieve all of the data
    d3.json(bbdata).then((data) => {

        // Retrieve all samples data
        let sample_data = data.samples;

        // Filter value of the samples data
        let value = sample_data.filter(result => result.id === sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample value data
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);

        // slicing top ten data to display in descending order for the bar chart
        let xticks = sample_values.slice(0,10).reverse();
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let labels = otu_labels.slice(0,10);
        
        // Set up the plotly trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Use d3.Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace])
    

    // Set up the plotly trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            },
            text: otu_labels
        };

    // Set up the layout
        let layout = {
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

    // Use d3.Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function for displaying and adding metadata \ demographic info
function Metadata(sample) {

    // Use D3 to retrieve all of the data
    d3.json(bbdata).then((data) => {

        // Retrieve all metadata data
        let metadata = data.metadata;

        // Filter value of the samples data
        let value = metadata.filter(result => result.id == sample);

        // Log the data to the console
        console.log(value)

        // Get the first index from the array
        let valueData = value[0];

         // Clear out metadata panel on changed
         d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the metadata panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Log the individual key/value pairs to be added in to the metadata panel
            console.log(key,value);
            //add the value pairs into the metadata panel
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

    });

};

// Function that updates dashboard when data is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions to update charts \ data as per user selection
    barbubbleCharts(value);
    Metadata(value);
    GaugeChart(value);
};

// Calling the init function
init();
