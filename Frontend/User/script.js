let baseurl = "https://server5.techsvc.de:2005"

// let baseurl = "https://localhost:2005"

// Load all data
let Username = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
let Password = document.cookie.split('; ').find(row => row.startsWith('password='))?.split('=')[1];

// Add Username
let usernamediv = document.getElementById("usernameofuser");
usernamediv.innerHTML = Username.charAt(0).toUpperCase() + Username.slice(1);


async function load_tasks() {
    try {
        let names = await fetch(baseurl + "/api/TDB/get/name")
        let disciptions = await fetch(baseurl + "/api/TDB/get/discription")
        let image = await fetch(baseurl + "/api/TDB/get/image")
        // let response = await fetch(baseurl + "/api/TDB/" +  Username + "/" + Password + "/" + )
        // response = await response.json()
        names = await names.json()
        disciptions = await disciptions.json()
        image = await image.json()

        let tasksdiv = document.getElementById("Container");
        if (names.length == 0) {
        tasksdiv.textContent = "No tasks found.";
        return;
        }

        let i = 0
        tasksdiv.innerHTML = `
            <div class="section-heading">
            <div class="line-dec"></div>
            <h2>Aktive <em>Achievements Test</em>:</h2>
            </div>`;
        while (i < names.length) {
        tasksdiv.innerHTML += `
            <div class="col-lg-2 col-sm-6">
            <div class="item">
                <div class="icon">
                    <img src="${image[i]}" alt="">
                </div>
                <h4>${names[i]}</h4>
                <h5 class="minifont">${disciptions[i]}</h5>
                <div class="icon-button">
                    <a href="${i}"><i class="fa fa-angle-right"></i></a>
                </div>
            </div>
            </div>
            `;
            i++
        }
  } catch (error) {
    document.getElementById('task-list').textContent = "Failed to load tasks.";
    console.error(error);
  }


}

load_tasks()






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