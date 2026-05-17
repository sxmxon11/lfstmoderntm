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

    // Sicherheitscheck: Falls die HTML-Elemente noch nicht existieren, brich ab
    if (!statusText || !playerCount || !pulseDot) return;

    try {
        // Abfrage der primären Minecraft-API
        const response = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
        
        if (!response.ok) {
            throw new Error("API response error");
        }
        
        const data = await response.json();

        if (data.online === true) {
            statusText.textContent = "Online";
            // Falls Spieler da sind, zeige die Zahl, ansonsten 0
            playerCount.textContent = (data.players && data.players.online !== undefined) ? data.players.online : 0;
            
            // Grüner Punkt
            pulseDot.style.backgroundColor = "#2ec4b6";
            pulseDot.style.boxShadow = "0 0 10px #2ec4b6";
        } else {
            // Server wird von der API als offline erkannt
            setOfflineState(statusText, playerCount, pulseDot);
        }
    } catch (error) {
        console.error("Error fetching server status:", error);
        // Falls die API blockiert wird, fangen wir den Fehler ab, damit es nicht unendlich lädt
        setOfflineState(statusText, playerCount, pulseDot);
    }
}

function setOfflineState(statusText, playerCount, pulseDot) {
    statusText.textContent = "Offline";
    playerCount.textContent = "0";
    pulseDot.style.backgroundColor = "#ff3333";
    pulseDot.style.boxShadow = "0 0 10px #ff3333";
}

// Skript starten, sobald das HTML bereit ist
document.addEventListener('DOMContentLoaded', () => {
    updateServerStatus();
    // Alle 30 Sekunden im Hintergrund aktualisieren
    setInterval(updateServerStatus, 30000);
});
