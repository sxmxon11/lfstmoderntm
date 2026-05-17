// Function to copy IP addresses dynamically
function copyIP(ipText, buttonElement) {
    navigator.clipboard.writeText(ipText).then(() => {
        const originalText = buttonElement.innerHTML;
        
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
        buttonElement.style.background = '#2ec4b6';
        buttonElement.style.boxShadow = '0 0 15px #2ec4b6';
        buttonElement.style.borderColor = 'transparent';
        
        setTimeout(() => {
            buttonElement.innerHTML = originalText;
            buttonElement.style.background = 'rgba(255, 255, 255, 0.1)';
            buttonElement.style.boxShadow = 'none';
            buttonElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// --- LIVE PLAYER COUNT SYSTEM ---
const SERVER_IP = "lifesteal.moderntm.de";

async function updateServerStatus() {
    const statusText = document.getElementById('server-status-text');
    const playerCount = document.getElementById('player-count');
    const pulseDot = document.querySelector('.pulse-dot');

    if (!statusText || !playerCount || !pulseDot) return;

    try {
        // Wir nutzen Minetools als primäre API, da sie extrem stabil mit Velocity läuft
        const response = await fetch(`https://api.minetools.eu/ping/${SERVER_IP}`);
        const data = await response.json();

        if (data.error) {
            // Falls Minetools einen Fehler meldet, versuchen wir es mit MCSrvStat als Backup
            const backupResponse = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
            const backupData = await backupResponse.json();

            if (backupData.online) {
                setServerOnline(backupData.players.online, statusText, playerCount, pulseDot);
            } else {
                setServerOffline(statusText, playerCount, pulseDot);
            }
        } else {
            // Minetools war erfolgreich
            setServerOnline(data.players.online, statusText, playerCount, pulseDot);
        }
    } catch (error) {
        console.error("Error fetching Minecraft server status:", error);
        // Falls ALLES fehlschlägt (z.B. Werbeblocker blockiert die API), zeige Offline statt Dauer-Laden
        setServerOffline(statusText, playerCount, pulseDot);
    }
}

function setServerOnline(players, statusText, playerCount, pulseDot) {
    statusText.textContent = "Online";
    playerCount.textContent = players !== undefined ? players : 0;
    pulseDot.style.backgroundColor = "#2ec4b6";
    pulseDot.style.boxShadow = "0 0 10px #2ec4b6";
}

function setServerOffline(statusText, playerCount, pulseDot) {
    statusText.textContent = "Offline";
    playerCount.textContent = "0";
    pulseDot.style.backgroundColor = "#ff3333";
    pulseDot.style.boxShadow = "0 0 10px #ff3333";
}

// Ausführen beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    updateServerStatus();
    // Alle 30 Sekunden aktualisieren
    setInterval(updateServerStatus, 30000);
});
