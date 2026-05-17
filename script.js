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

// --- LIVE PLAYER COUNT SYSTEM (PLAYIT.GG OPTIMIZED) ---
const SERVER_DOMAIN = "lifesteal.moderntm.de";

async function updateServerStatus() {
    const statusText = document.getElementById('server-status-text');
    const playerCount = document.getElementById('player-count');
    const pulseDot = document.querySelector('.pulse-dot');

    if (!statusText || !playerCount || !pulseDot) return;

    try {
        // Wir fragen direkt die offizielle, öffentliche playit.gg API für deine Domain ab
        const response = await fetch(`https://api.playit.gg/v1/tunnels/${SERVER_DOMAIN}`);
        
        if (!response.ok) {
            throw new Error("Playit API didn't respond correctly");
        }

        const data = await response.json();

        // playit liefert den Status des Tunnels. Wenn aktiv, ist der Server online!
        if (data && data.status === "active") {
            statusText.textContent = "Online";
            
            // Da playit.gg im Free-Tarif manchmal die genaue Minecraft-Spieleranzahl filtert,
            // prüfen wir, ob sie mitgesendet wird. Falls nicht, zeigen wir "Active" an.
            if (data.num_players !== undefined) {
                playerCount.textContent = data.num_players;
            } else {
                playerCount.innerHTML = '<i class="fas fa-check" style="color: #2ec4b6;"></i> Ready';
            }
            
            pulseDot.style.backgroundColor = "#2ec4b6";
            pulseDot.style.boxShadow = "0 0 10px #2ec4b6";
        } else {
            setServerOffline(statusText, playerCount, pulseDot);
        }
    } catch (error) {
        console.error("Error fetching status from playit.gg:", error);
        setServerOffline(statusText, playerCount, pulseDot);
    }
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
    // Alle 45 Sekunden aktualisieren (playit mag zu schnelles Spammen nicht)
    setInterval(updateServerStatus, 45000);
});
