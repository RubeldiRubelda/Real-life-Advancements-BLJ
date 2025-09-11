let baseurl = "https://server5.techsvc.de:2005"

// let baseurl = "https://localhost:2005"

// Load all data
let Username = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
let Password = document.cookie.split('; ').find(row => row.startsWith('password='))?.split('=')[1];

// Add Username
let usernamediv = document.getElementById("usernameofuser");
usernamediv.innerHTML = Username.charAt(0).toUpperCase() + Username.slice(1);



let tasksdiv = document.getElementById("Container");


tasksdiv.innerHTML += '         <div class="col-lg-2 col-sm-6">                              '
tasksdiv.innerHTML += '            <div class="item">                                        '
tasksdiv.innerHTML += '              <div class="icon">                                      '
tasksdiv.innerHTML += '                <img src="assets/images/icon-06.png" alt="">          '
tasksdiv.innerHTML += '              </div>                                                  '
tasksdiv.innerHTML += '              <h4>Crypto Wallet</h4>                                  '
tasksdiv.innerHTML += '              <h5 class="minifont">#Scammer</h5>                      '
tasksdiv.innerHTML += '              <div class="icon-button">                               '
tasksdiv.innerHTML += '                <a href="#"><i class="fa fa-angle-right"></i></a>     '
tasksdiv.innerHTML += '              </div>                                                  '
tasksdiv.innerHTML += '            </div>                                                    '
tasksdiv.innerHTML += '        </div>                                                        '






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