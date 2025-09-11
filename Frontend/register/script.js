let baseurl = "https://server5.techsvc.de:2005"


document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = e.target[0].value.trim();
  const password = e.target[1].value;
  const password2 = e.target[2].value;

  if (!username || !password || !password2) {
    alert("Bitte Benutzername und Passwort eingeben.");
    return;
  }

  if (password !== password2) {
    alert("Passwörter stimmen nicht überein.");
    return;
  }

  const combined = `${username}:${password}`;
  const hash = await sha256(combined);

  try {
    const response = await fetch(baseurl + "/api/user/add/" + username + "/" + hash);

    if (response.Okay) {
        document.cookie = "username=" + username + "; path=/";
        document.cookie = "password=" + hash + "; path=/";
        window.location.href = "/user";
    } else {
      alert("Serverside Error, please contact support");
      console.log(response)
    }
  } catch (error) {
    console.error("Fehler beim Login:", error);
    alert("Registrierung fehlgeschlagen.");
  }

});


async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
