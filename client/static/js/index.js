const serverUrl = `http://localhost:3000/articles`;
const url = new URL(window.location.href); // create the URL 

// init html elements as js objects
const form = document.querySelector('form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const descriptionInput = document.querySelector('#description-input');
const title = document.querySelector('#title-info');
const nameInfo = document.querySelector('#name-info');
const dateInfo = document.querySelector('#date-info');
const description = document.querySelector('#description-info');
const content = document.querySelector('#content');
// const submitBtn = document.querySelector('#submit-btn');

initListeners();

function initListeners() {
    let url_ref = window.location.href
    if(url_ref === `${url.origin}/client/index.html`){
    form.addEventListener("submit", upload)
    }
    else{
        retrieve(url_ref);

    }
}

function getDate() {
    const date = new Date();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${day}-${month}`;
}

function getPath() {
    const randNum = Math.floor((Math.random() * 100) +1);
    return `${titleInput.value}-${getDate()}-${randNum}`;
}

function checkState(e) {
    // page reload
    if (e.state) {
        console.log(e.state.path);
    }
}

/**
 * Uploads the article to the server.
 * 
 */
async function upload(e) {
    e.preventDefault();
    form.style.display = "none";

    const path = getPath();
    const date = getDate();

    const data = {
        path: path,
        title: titleInput.value,
        name: authorInput.value,
        archive_date: date,
        description: descriptionInput.value
    }

    console.log(data);
    console.log(JSON.stringify(data));

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    } 
    articlePath = path;
    window.location.hash = articlePath;
 
    try {
        await fetch(serverUrl, options)
    } catch (err) {
        console.log(err);
    }

   try {
       await fetch(serverUrl+"/"+path)
       .then(response => response.json())
       .then(data => {
        title.textContent = data.title;
        nameInfo.textContent = data.name;
        dateInfo.textContent = data.archive_date;
        description.textContent = data.description;
       })
    }
    catch (err) {
        console.log(err)
    }
   }


async function retrieve(url_ref){
    const newPath = url_ref.substring(url_ref.indexOf("#")+1)
        form.style.display = "none"
        try {
            await fetch(serverUrl+"/"+newPath)
            .then(response => response.json())
            .then(data => {
             title.textContent = data.title;
             nameInfo.textContent = data.name;
             dateInfo.textContent = data.archive_date;
             description.textContent = data.description;
            })
         }
         catch (err) {
             console.log(err)
         }
}

function getPath() {
    const randNum = Math.floor((Math.random() * 100) +1);
    return `${titleInput.value}-${getDate()}-${randNum}`;
}

function getDate() {
    const date = new Date();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${day}-${month}`;
}


