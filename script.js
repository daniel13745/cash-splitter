
function toggle_nav() {
    document.getElementById('mainNav').classList.toggle('open');
}
    
document.addEventListener("DOMContentLoaded", function() {

    function close_nav() {
        document.getElementById('mainNav').classList.remove('open');
    }

    const titel = document.getElementById("title");
    const Vication = document.querySelectorAll(".Vication.nv_txt");

    Vication.forEach(function(punkt) {
        punkt.addEventListener("click", function() {
            titel.textContent = this.textContent;
            close_nav();
        });
    });

}); 


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



function createUser(){

    let name = document.getElementById('name');
    const text = name.value.trim();
    
    if (text === "") return;

    const liste = document.getElementById("persons");
    const newPerson = document.createElement('li');
    
    newPerson.textContent = text
    liste.appendChild(newPerson);
    name.value = "";

    console.log(text);
}

