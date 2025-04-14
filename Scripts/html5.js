function saveToLocalStorage() {
    let input = document.getElementById("storageInput").value;
    localStorage.setItem("savedText", input);
    alert("Saved to Local Storage!");
}

function loadFromLocalStorage() {
    let storedValue = localStorage.getItem("savedText") || "Nothing stored yet!";
    document.getElementById("storageResult").textContent = "Stored Value: " + storedValue;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById("locationResult").textContent = 
                `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        }, function(error) {
            document.getElementById("locationResult").textContent = "Geolocation not available.";
        });
    } else {
        document.getElementById("locationResult").textContent = "Geolocation not supported.";
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    ev.target.appendChild(draggedElement);
}

function drawOnCanvas() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "blue";
    ctx.fillRect(50, 30, 200, 100);
}

function clearCanvas() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let worker;
function startWorker() {
    if (typeof Worker !== "undefined") {
        if (!worker) {
            worker = new Worker("Scripts/worker.js");
            worker.onmessage = function(event) {
                document.getElementById("workerResult").textContent = "Worker says: " + event.data;
            };
        }
    } else {
        document.getElementById("workerResult").textContent = "Web Workers not supported!";
    }
}

function stopWorker() {
    if (worker) {
        worker.terminate();
        worker = undefined;
        document.getElementById("workerResult").textContent = "Worker stopped.";
    }
}