let chartInstance; 

document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById("lineChart").getContext("2d");

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Col 1", "Col 2", "Col 3", "Col 4", "Col 5"],
            datasets: [{
                label: "Selected Row Data",
                data: [], 
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});


function updateChart(row) {
    let rowData = Array.from(row.children).map(cell => parseInt(cell.textContent));

    chartInstance.data.datasets[0].data = rowData;
    chartInstance.update();
}