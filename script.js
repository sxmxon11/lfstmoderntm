// Funktion zum Kopieren der Server-IP
function copyIP() {
    const ipText = "lifesteal.moderntm.de"; // Hier deine echte IP eintragen
    
    navigator.clipboard.writeText(ipText).then(() => {
        const copyBtn = document.querySelector('.btn-copy');
        const originalText = copyBtn.innerHTML;
        
        // Visuelles Feedback für den Spieler
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Kopiert!';
        copyBtn.style.background = '#2ec4b6';
        copyBtn.style.boxShadow = '0 0 15px #2ec4b6';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            copyBtn.style.boxShadow = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Fehler beim Kopieren: ', err);
    });
}

// Optional: Hier kannst du in Zukunft eine Minecraft-API einbinden,
// um die echten Spielerzahlen in Echtzeit anzuzeigen.
