const inputBox = document.getElementById("input-box");
const inputBtn = document.querySelector(".input-button");
const listContainer = document.getElementById("list-container");

function addTask(){
    let task = inputBox.value.trim();

    if(task === ''){
        alert("Write something");
        return;
    }

    let exists = [...document.querySelectorAll("#list-container li")]
        .some(li => li.firstChild.nodeValue.trim().toLowerCase() === task.toLowerCase());

    if(exists){
        alert("Task is already added");
        inputBox.value = "";
        return;
    }

    let li = document.createElement("li");
    li.textContent = task;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    inputBox.value = "";
    inputBox.focus();
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
});

inputBtn.addEventListener("click", addTask);

inputBox.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        e.preventDefault();
        addTask();
    }
});

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

showTask();