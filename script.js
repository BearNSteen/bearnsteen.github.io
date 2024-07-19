document.addEventListener('DOMContentLoaded', () => {
    const hoverText = document.getElementById('hover-text');
    const buttons = document.querySelectorAll('.home-button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            hoverText.textContent = button.getAttribute('data-name');
        });

        button.addEventListener('mouseleave', () => {
            hoverText.textContent = '';
        });
    });
});

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

function startTyping() {
    typeWriter("BearNSteen", 0, function() {
        setTimeout(startTyping, 5000);  // Restart after 5 seconds
    });
}

document.addEventListener('DOMContentLoaded', startTyping);