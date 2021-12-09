const url = `http://localhost:3000/articles`;
const path = localStorage.getItem('path');

// init html elements as js objects
const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const description = document.querySelector('#description');
const authorDateDiv = document.querySelector('#a-d-div')
const submitBtn = document.querySelector('#submit-btn')
authorDateDiv.classList.add('a-d-div');

getArticle();

async function updateArticle() {
    const data = {
        path: path,
        title: title.value,
        name: author.value,
        archive_date: getDate(),
        description: description.value
    }

    const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    await fetch(`${url}/${path}`, options);

    submitBtn.textContent = "EDIT";
    disableInputs();
    initEditListener();
}

async function getArticle() {
    console.log("Getting article");
    const response = await fetch(`${url}/${path}`);
    const data = await response.json();

    // initialise input fields with data
    const date = document.createElement("p");
    title.value = data.title;
    author.value = data.author
    date.value = `⚫️ ${data.date}`;
    description.value = data.description;
    authorDateDiv.append(date);

    disableInputs();
    initEditListener();
}

function allowEdit() {
    submitBtn.textContent = "PUBLISH";
    enableInputs();
    initSubmitListener();
}

function getDate() {
    const date = new Date();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${day}-${month}`;
}

function initSubmitListener() {
    form.removeEventListener("submit", allowEdit);
    form.addEventListener("submit", updateArticle);
}

function initEditListener() {
    form.removeEventListener("submit", updateArticle);
    form.addEventListener("submit", allowEdit);
}

function disableInputs() {
    title.disabled = true;
    author.disabled = true;
    description.disabled = true;
}

function enableInputs() {
    title.disabled = false;
    author.disabled = false;
    description.disabled = false;
}