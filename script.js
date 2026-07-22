function toggle_nav() {
    document.getElementById('mainNav').classList.toggle('open');
}



function openUserScreen() {
    if (!currentTripId) {
        alert ("BItte zuerst eine Reise auswählen");
        return;
    }

    document.getElementById('addUserScreen').style.display = 'block';
}

function closeUserScreen() {
    document.getElementById('addUserScreen').style.display = 'none';
}

function openCostScreen() {
    if (!currentTripId) {
        alert("Bitte zuerst eine Reise auswählen.");
        return;
    }
    fillCostForm();
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

            const trip = trips[id];
            renderPersons();
            renderCosts();
            renderBalances();
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
    renderBalances(); 
});

function fillCostForm() {
    const trips = loadTrips();
    const persons = trips[currentTripId].persons;

    const dropdown = document.getElementById('dropdownPayed');
    dropdown.innerHTML = '<option value="">-- Bitte wählen --</option>';
    persons.forEach(function(person) {
        const opt = document.createElement('option');
        opt.value = person;
        opt.textContent = person;
        dropdown.appendChild(opt);
    });

    const checkboxContainer = document.getElementById('splitCheckboxes');
    checkboxContainer.innerHTML = '';
    persons.forEach(function(person) {
        const label = document.createElement('label');
        label.style.display = "block";

        const cb = document.createElement('input');
        cb.type = "checkbox";
        cb.value = person;
        cb.className = "splitCheckbox";
        cb.checked = true; 
        label.appendChild(cb);
        label.appendChild(document.createTextNode(" " + person));
        checkboxContainer.appendChild(label);
    });
}

function createCost() {
    const description = document.getElementById('costDescription').value.trim();
    const amount = parseFloat(document.getElementById('costAmount').value);
    const paidBy = document.getElementById('dropdownPayed').value;

    const splitBetween = Array.from(document.querySelectorAll('.splitCheckbox:checked'))
                               .map(cb => cb.value);

    if (description === "" || isNaN(amount) || amount <= 0 || paidBy === "" || splitBetween.length === 0) {
        alert("Bitte alle Felder ausfüllen.");
        return;
    }

    const trips = loadTrips();
    const trip = trips[currentTripId];
    if (!trip.costs) trip.costs = [];

    trip.costs.push({
        id: "cost_" + Date.now(),
        description: description,
        amount: amount,
        paidBy: paidBy,
        splitBetween: splitBetween
    });

    saveTrips(trips);

    document.getElementById('costDescription').value = "";
    document.getElementById('costAmount').value = "";

    renderCosts();
    renderBalances();
}

function calculateBalances(trip) {
    const balance = {};
    trip.persons.forEach(p => balance[p] = 0);

    (trip.costs || []).forEach(cost => {
        const anteil = cost.amount / cost.splitBetween.length;
        balance[cost.paidBy] += cost.amount;
        cost.splitBetween.forEach(person => {
            balance[person] -= anteil;
        });
    });

    return balance;
}

function renderBalances() {
    const trips = loadTrips();
    const trip = trips[currentTripId];
    const balance = calculateBalances(trip);

    const container = document.getElementById('balances');
    if (!container) return;
    container.innerHTML = '';

    Object.keys(balance).forEach(function(person) {
        const wert = balance[person];

        const nameEl = document.createElement('div');
        nameEl.className = 'balance_name';
        nameEl.textContent = person;

        const wertEl = document.createElement('div');
        wertEl.className = 'balance_value';

        if (wert > 0.01) {
            wertEl.textContent = "+" + wert.toFixed(2) + " €";
            wertEl.classList.add('positive');
        } else if (wert < -0.01) {
            wertEl.textContent = "-" + Math.abs(wert).toFixed(2) + " €";
            wertEl.classList.add('negative');
        } else {
            wertEl.textContent = "0.00 €";
            wertEl.classList.add('neutral');
        }

        container.appendChild(nameEl);
        container.appendChild(wertEl);
    });
}

function renderCosts() {
    const trips = loadTrips();
    const trip = trips[currentTripId];

    const container = document.getElementById('costsList'); // musst du im HTML noch anlegen, siehe unten
    if (!container) return;
    container.innerHTML = '';

    (trip.costs || []).forEach(function(cost) {
        const li = document.createElement('li');
        li.textContent = cost.description + ": " + cost.amount.toFixed(2) + " € (bezahlt von " + cost.paidBy + ")";
        container.appendChild(li);
    });
}