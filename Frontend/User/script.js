let baseurl = "https://server5.techsvc.de:2005"
// let baseurl = "https://localhost:2005"


let Username = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
let Password = document.cookie.split('; ').find(row => row.startsWith('password='))?.split('=')[1];

let div = document.getElementById("username-of-user");
div = Username.charAt(0).toUpperCase() + variable.slice(1);