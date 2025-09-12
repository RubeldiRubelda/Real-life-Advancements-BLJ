// let baseurl = "https://server5.techsvc.de:2005"

let baseurl = "https://localhost:2005"

// Load all data
let Username = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
let Password = document.cookie.split('; ').find(row => row.startsWith('password='))?.split('=')[1];

if (Username == "") {
    window.location.href = '/login'
}


async function update_score_and_username() {
    //Username form Cookie
    let usernamediv = document.getElementById("username_of_user");
    usernamediv.innerHTML = Username.charAt(0).toUpperCase() + Username.slice(1);

    //Score form Backend
    let score = await fetch(baseurl + "/api/score/" + Username + "/" + Password);
    score = await score.json();
    if (score.Okay) {
        let scorediv = document.getElementById("pints_of_user");
        scorediv.innerHTML = score.Score
    }
}

update_score_and_username()


async function load_tasks() {

    let names = await fetch(baseurl + "/api/TDB/get/name")
    let hashtag = await fetch(baseurl + "/api/TDB/get/hashtag")
    let image = await fetch(baseurl + "/api/TDB/get/image")
    let description = await fetch(baseurl + "/api/TDB/get/description")
    let usertasks = await fetch(baseurl + "/api/advancements/get/" + Username + "/" + Password)
    // let response = await fetch(baseurl + "/api/TDB/" +  Username + "/" + Password + "/" + )
    // response = await response.json()
    names = await names.json()
    hashtag = await hashtag.json()
    image = await image.json()
    description = await description.json()
    usertasks = await usertasks.json()



    let tasksdiv = document.getElementById("Container");
    if (names.length == 0) {
    tasksdiv.textContent = "No tasks found.";
    return;
    }

    let i = 0
    tasksdiv.innerHTML = `
        <div class="section-heading">
        <div class="line-dec"></div>
        <h2>Aktive <em>Achievements</em>:</h2>
        </div>
        </div>`;
    while (i < names.length) {

        if (usertasks[i]) {
            tasksdiv.innerHTML += `
            <div class="col-lg-2 col-sm-6">
            <div class="item">
                <div class="icon">
                    <img src="${image[i]}" alt="Dies ist ein Icon welches das Achievement repräsentiert.">
                </div>
                <h4>${names[i]}</h4>
                <h5 class="minifont">${hashtag[i]}</h5>
                <div class="icon-button">
                    <a href="#" class="show-overlay" data-index="${i}"><i class="fa fa-angle-right"></i></a>
                </div>
            </div>
            </div>
            `;
            i++
        }
    }
    // Event Listener für alle Pfeile
    setTimeout(() => {
      document.querySelectorAll('.show-overlay').forEach(el => {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          const idx = this.getAttribute('data-index');
          document.getElementById('overlay-title').innerText = names[idx];
          document.getElementById('overlay-text').innerText = description[idx];
          document.getElementById('overlay-img').src = image[idx];
          overlayDiv.style.display = 'flex';
        });
      });
    }, 0);
}

load_tasks()








// Overlay-DIV für Achievement-Details einfügen
const overlayDiv = document.createElement('div');
overlayDiv.id = 'achievement-overlay';
overlayDiv.style.display = 'none';
overlayDiv.style.position = 'fixed';
overlayDiv.style.top = '0';
overlayDiv.style.left = '0';
overlayDiv.style.width = '100vw';
overlayDiv.style.height = '100vh';
overlayDiv.style.background = 'rgba(0,0,0,0.7)';
overlayDiv.style.zIndex = '9999';
overlayDiv.style.justifyContent = 'center';
overlayDiv.style.alignItems = 'center';
overlayDiv.innerHTML = `
  <div id="overlay-content" style="background:#2a2a2a;color:#ffffff;padding:2rem;border-radius:1rem;max-width:500px;max-height:80vh;overflow:auto;position:relative;box-shadow:0 4px 32px rgba(0,0,0,0.2);display:flex;flex-direction:column;align-items:center;">
    <span id="close-overlay" style="position:absolute;top:1rem;right:1rem;cursor:pointer;font-size:2rem;color:#ffffff;">&times;</span>
    <h3 id="overlay-title" style="margin-bottom:0.5rem;text-align:center;color:#ffffff;"></h3>
    <img id="overlay-img" src="" alt="Achievement Icon" style="width:80px;height:80px;object-fit:contain;margin-bottom:1rem;">
    <button class="button-87" role="button" style="margin-bottom:1rem;" onclick="document.getElementById('achievement-overlay').style.display='none';">ERLEDIGT</button>
    <div id="overlay-text" style="text-align:center;font-size:1.1rem;color:#ffffff;"></div>
  </div>
`;
document.body.appendChild(overlayDiv);

document.getElementById('close-overlay').onclick = function() {
  overlayDiv.style.display = 'none';
};

// Cookies löschen beim Ausloggen
const logoutBtn = document.getElementById('startbacon');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Alle Cookies löschen
    document.cookie.split(';').forEach(function(c) {
        document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
    });
    // Optional: Weiterleitung zur Login-Seite
    window.location.href = '/';
    });
}

