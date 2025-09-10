let baseurl = "https://server5.techsvc.de:2005"


document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = e.target[0].value.trim();
  const password = e.target[1].value;

  if (!username || !password) {
    alert("Bitte Benutzername und Passwort eingeben.");
    return;
  }

  const combined = `${username}:${password}`;
  const hash = await sha256(combined);

  try {
    // Statt JSON bekommst du nun HTML zurück
    const response = await fetch(baseurl + "/api/login/" + username + "/" + hash);

    if (response.ok) {
        document.cookie = "username=" + username + "; path=/";
        document.cookie = "password=" + hash + "; path=/";
    } else {
      alert("Zugang verweigert");
    }
  } catch (error) {
    console.error("Fehler beim Login:", error);
    alert("Login fehlgeschlagen.");
  }

});