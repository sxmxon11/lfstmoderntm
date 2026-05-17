// Function to copy IP addresses dynamically
function copyIP(ipText, buttonElement) {
    navigator.clipboard.writeText(ipText).then(() => {
        const originalText = buttonElement.innerHTML;
        
        // Visual feedback for the player
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
