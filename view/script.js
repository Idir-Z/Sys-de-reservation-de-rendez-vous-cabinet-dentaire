document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});
const addBtn = document.querySelector('#add-name-btn')
addBtn.onclick = function(){
    const nameInput = document.querySelector('#name-input')
    const name = nameInput.value
    nameInput.value = ""
    fetch('http://localhost:3000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name : name})
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']))
    
}

function insertRowIntoTable(data) {
    
}

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input');


    console.log(updateNameInput);

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}






function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    console.log(data)
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({user_id, name, dateAdded}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${user_id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(dateAdded).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${user_id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${user_id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}