const SERVER_IP = "lifesteal.moderntm.de";

async function updateServerStatus() {
    const statusText = document.getElementById('server-status-text');
    const playerCount = document.getElementById('player-count');
    const pulseDot = document.getElementById('pulse-dot');

    try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
        const data = await response.json();

        if (data.online === true) {
            statusText.textContent = "Online";
            playerCount.textContent = data.players?.online ?? 0;
            pulseDot.style.backgroundColor = "#2ec4b6";
            pulseDot.style.color = "#2ec4b6";
        } else {
            setOfflineState(statusText, playerCount, pulseDot);
        }
    } catch (error) {
        setOfflineState(statusText, playerCount, pulseDot);
    }
}

function setOfflineState(statusText, playerCount, pulseDot) {
    statusText.textContent = "Offline";
    playerCount.textContent = "0";
    pulseDot.style.backgroundColor = "#ff3333";
    pulseDot.style.color = "#ff3333";
}

function copyIP(ip, btn) {
    navigator.clipboard.writeText(ip);
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    updateServerStatus();
    setInterval(updateServerStatus, 30000);
});
