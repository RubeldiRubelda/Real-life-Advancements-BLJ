let baseurl = "https://server5.techsvc.de:2005"
let div
// let baseurl = "https://localhost:2005"

// Load all data
let Username = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
let Password = document.cookie.split('; ').find(row => row.startsWith('password='))?.split('=')[1];

// Add Username
div = document.getElementById("usernameofuser");
div.innerHTML = Username.charAt(0).toUpperCase() + Username.slice(1);



div = document.getElementById("Container");


div.innerHTML +=         <div class="col-lg-2 col-sm-6">
div.innerHTML +=             <div class="item">
div.innerHTML +=             <div class="icon">
div.innerHTML +=                 <img src="assets/images/icon-06.png" alt="">
div.innerHTML +=             </div>
div.innerHTML +=             <h4>Crypto Wallet</h4>
div.innerHTML +=             <h5 class="minifont">#Scammer</h5>
div.innerHTML +=             <div class="icon-button">
div.innerHTML +=                 <a href="#"><i class="fa fa-angle-right"></i></a>
div.innerHTML +=             </div>
div.innerHTML +=             </div>
div.innerHTML +=         </div>
          





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