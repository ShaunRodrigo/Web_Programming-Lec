document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addForm");
    const tableBody = document.querySelector("#dataTable tbody");
    let idCounter = 11; 

    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let city = document.getElementById("city").value;

        if (name && age && city) {
            let newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${idCounter++}</td>
                <td>${name}</td>
                <td>${age}</td>
                <td>${city}</td>
                <td>
                    <button onclick="editRow(this)">Edit</button>
                    <button onclick="deleteRow(this)">Delete</button>
                </td>
            `;
            tableBody.appendChild(newRow);

            form.reset(); 
        }
    });
});


function editRow(button) {
    let row = button.parentElement.parentElement;
    let cells = row.children;

    let newName = prompt("Enter new name:", cells[1].textContent);
    let newAge = prompt("Enter new age:", cells[2].textContent);
    let newCity = prompt("Enter new city:", cells[3].textContent);

    if (newName && newAge && newCity) {
        cells[1].textContent = newName;
        cells[2].textContent = newAge;
        cells[3].textContent = newCity;
    }
}


function deleteRow(button) {
    let row = button.parentElement.parentElement;
    row.remove();
}