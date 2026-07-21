
function toggle_nav() {
    document.getElementById('mainNav').classList.toggle('open');
}


function openUserScreen() {
    document.getElementById('addUserScreen').style.display = 'block';
}

function closeUserScreen() {
    document.getElementById('addUserScreen').style.display = 'none';
}

function openCostScreen() {
    document.getElementById('addCostScreen').style.display = 'block';
}

function closeCostScreen() {
    document.getElementById('addCostScreen').style.display = 'none';
}

const STORAGE_KEY = "reisen_data";
let currentTripId = null;

function loadTrips() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
}

function saveTrips(trips) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

function openTripScreen() {
    document.getElementById('addTripScreen').style.display = 'block';
}

function closeTripScreen() {
    document.getElementById('addTripScreen').style.display = 'none';
}

function createTrip() {
    const input = document.getElementById('tripName');
    const text = input.value.trim();
    if (text === "") return;

    const trips = loadTrips();
    const id = "trip_" + Date.now();
    trips[id] = { name: text, persons: [] };
    saveTrips(trips);

    input.value = "";
    renderTripNav();
}

function renderTripNav() {
    const trips = loadTrips();
    const container = document.getElementById("tripNav");
    container.innerHTML = "";

    Object.keys(trips).forEach(function(id) {
        const p = document.createElement("p");
        p.className = "Vication nv_txt";
        p.textContent = trips[id].name;
        p.addEventListener("click", function() {
            currentTripId = id;
            document.getElementById("title").textContent = trips[id].name;
            close_nav();
            renderPersons();
        });
        container.appendChild(p);
    });
}

function createUser() {
    if (!currentTripId) {
        alert("Bitte zuerst eine Reise auswählen.");
        return;
    }

    let name = document.getElementById('name');
    const text = name.value.trim();
    if (text === "") return;

    const trips = loadTrips();
    trips[currentTripId].persons.push(text);
    saveTrips(trips);

    name.value = "";
    renderPersons();
}

function renderPersons() {
    const liste = document.getElementById("persons");
    liste.innerHTML = "";

    if (!currentTripId) return;

    const trips = loadTrips();
    trips[currentTripId].persons.forEach(function(person) {
        const li = document.createElement('li');
        li.textContent = person;
        liste.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    function close_nav() {
        document.getElementById('mainNav').classList.remove('open');
    }
    window.close_nav = close_nav; // damit renderTripNav sie nutzen kann

    renderTripNav();
});