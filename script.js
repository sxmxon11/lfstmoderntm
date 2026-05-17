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
// IPs for the API
const JAVA_IP = "lifesteal.moderntm.de";

async function updateServerStatus() {
    const statusText = document.getElementById('server-status-text');
    const playerCount = document.getElementById('player-count');
    const pulseDot = document.querySelector('.pulse-dot');

    try {
        // Fetch data from MCSrvStat API (Java endpoint covers most proxy setups)
        const response = await fetch(`https://api.mcsrvstat.us/3/${JAVA_IP}`);
        const data = await response.json();

        if (data.online) {
            statusText.textContent = "Online";
            // Displays actual online players, defaults to 0 if empty
            playerCount.textContent = data.players.online !== undefined ? data.players.online : 0;
            
            // Visual green indicator
            pulseDot.style.backgroundColor = "#2ec4b6";
            pulseDot.style.boxShadow = "0 0 10px #2ec4b6";
        } else {
            // Server is offline
            statusText.textContent = "Offline";
            playerCount.textContent = "0";
            
            // Visual red indicator
            pulseDot.style.backgroundColor = "#ff3333";
            pulseDot.style.boxShadow = "0 0 10px #ff3333";
        }
    } catch (error) {
        console.error("Error fetching Minecraft server status:", error);
        statusText.textContent = "Error";
        playerCount.textContent = "-";
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', updateServerStatus);

// Optional: Refresh the player count every 60 seconds automatically
setInterval(updateServerStatus, 60000);
