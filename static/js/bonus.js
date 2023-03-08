// Get the Belly Button bonus endpoint
const bonus = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(bonus).then(function(data) {
  console.log(data);
});

// Display and initialize the default plot for bonus questions
function init(){
  //assigning variable to the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  d3.json(bbdata).then((data) => {
              // Set a variable for the sample names
              let names = data.names;
      
              // Add  samples to dropdown menu
              data.names.forEach((id) => {
      
                  // Log the value of id for each iteration of the loop
                  console.log(id);
      
                  dropdownMenu.append("bonus")
                  .text(id)
                  .property("value",id);
              });

              // Set the first sample from the list
              let sample_data = names[0];

              // Log the value of sample_one
              console.log(sample_data);

              // Display initial \ default data plots
              GaugeChart(sample_data);
  });
}

// Function that builds the gauge chart
function GaugeChart(sample) {

  // Use D3 to retrieve all of the data
  d3.json(bonus).then((data) => {

      // Retrieve all metadata
      let metadata = data.metadata;

      /// Filter value of the samples data
      let value = metadata.filter(result => result.id == sample);

      // Log the data to the console
      console.log(value)

      // Get the first index from the array
      let valueData = value[0];

      // Use Object.values to get the frequency vale to be added to the gauge chart
      let wfreq = Object.values(valueData)[6];
      
      // Set up the plotly trace for the gauge chart
      let trace2 = {
          domain: {x: [0, 1], y: [0, 1]},
          value: wfreq,
          type: "indicator",
          mode: "gauge+number",
          title: {
              text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
              font: {color: "black", size: 16}
          },
          gauge: {
              axis: {range: [0,10], tickwidth: 1,},
              BarP: {color: "green"},
              steps: [
                  {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                  {range: [1, 2], color: "rgba(222, 222, 202, 0.5)"},
                  {range: [2, 3], color: "rgba(200, 209, 145, 0.5)"},
                  {range: [3, 4], color:  "rgba(200, 219, 95, 0.5)"},
                  {range: [4, 5], color:  "rgba(174, 215, 68, 0.5)"},
                  {range: [5, 6], color: "rgba(160, 212, 42, 0.5)"},
                  {range: [6, 7], color: "rgba(132, 198, 35 , 0.5)"},
                  {range: [7, 8], color:  "rgba(120, 174, 22, 0.5)"},
                  {range: [8, 9], color: "rgba(60, 163, 10, 0.5)"},
                  {range: [9, 10], color: "rgba(24, 157, 7, 0.5)"},
              ]
          } 
      };

      // Set up the Layout
      let layout = {
          width: 500, 
          height: 500,
          margin: {t: 0, b:0}
      };

      // Use d3.Plotly to plot the gauge chart
      Plotly.newPlot("gauge", [trace2], layout)
  });
};

init();