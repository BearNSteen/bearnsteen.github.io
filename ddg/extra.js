renderGuildMap() {
    if (!this.characters[this.currentUserId].location === "guild_lobby") {
        if (this.guildAnimationFrame) {
            cancelAnimationFrame(this.guildAnimationFrame);
            this.guildAnimationFrame = null;
        }
        return;
    }

    const width = this.mapCanvas.width;
    const height = this.mapCanvas.height;

    // Clear the canvas
    this.ctx.clearRect(0, 0, width, height);

    // Draw wooden floor
    this.ctx.fillStyle = '#8B4513';  // Brown
    this.ctx.fillRect(0, height * 0.8, width, height);

    // Draw wall
    this.ctx.fillStyle = '#D2B48C';  // Tan
    this.ctx.fillRect(0, 0, width, height * 0.8);

    // Draw large guild emblem on the wall
    this.drawGuildEmblem(width * 0.5, height * 0.3, width * 0.4);

    // Draw reception desk
    this.drawReceptionDesk(width * 0.1, height * 0.6, width * 0.8, height * 0.2);

    // Draw guild member behind the desk
    this.drawGuildMember(width * 0.5, height * 0.7);

    // Draw animated quest board
    this.drawQuestBoard(width * 0.05, height * 0.1, width * 0.3, height * 0.5);

    // Draw player character
    this.drawPlayer(width * 0.8, height * 0.9);

    // Request next animation frame
    this.guildAnimationFrame = requestAnimationFrame(() => this.renderGuildMap());
}

drawGuildEmblem(x, y, size) {
    const now = Date.now();
    const glowIntensity = (Math.sin(now * 0.002) + 1) / 2; // Oscillates between 0 and 1

    this.ctx.save();
    this.ctx.translate(x, y);

    // Draw outer circle
    this.ctx.beginPath();
    this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 215, 0, ${0.3 + glowIntensity * 0.2})`;  // Golden glow
    this.ctx.fill();

    // Draw shield shape
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size * 0.4);
    this.ctx.lineTo(size * 0.3, -size * 0.2);
    this.ctx.lineTo(size * 0.3, size * 0.3);
    this.ctx.lineTo(0, size * 0.4);
    this.ctx.lineTo(-size * 0.3, size * 0.3);
    this.ctx.lineTo(-size * 0.3, -size * 0.2);
    this.ctx.closePath();
    this.ctx.fillStyle = '#4169E1';  // Royal Blue
    this.ctx.fill();
    this.ctx.strokeStyle = '#FFD700';  // Gold
    this.ctx.lineWidth = 5;
    this.ctx.stroke();

    // Draw sword
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size * 0.3);
    this.ctx.lineTo(0, size * 0.3);
    this.ctx.moveTo(-size * 0.15, -size * 0.1);
    this.ctx.lineTo(size * 0.15, -size * 0.1);
    this.ctx.strokeStyle = '#C0C0C0';  // Silver
    this.ctx.lineWidth = 8;
    this.ctx.stroke();

    this.ctx.restore();
}

drawReceptionDesk(x, y, width, height) {
    this.ctx.fillStyle = '#8B4513';  // Dark wood color
    this.ctx.fillRect(x, y, width, height);

    // Add some detail to the desk
    this.ctx.fillStyle = '#A0522D';  // Lighter wood color
    this.ctx.fillRect(x + 10, y + 10, width - 20, height - 20);
}

drawGuildMember(x, y) {
    const now = Date.now();
    const bobAmount = Math.sin(now * 0.005) * 5; // Slight bobbing motion

    // Body
    this.ctx.fillStyle = '#4B0082';  // Indigo for uniform
    this.ctx.fillRect(x - 30, y - 60 + bobAmount, 60, 80);

    // Head
    this.ctx.fillStyle = '#FFA07A';  // Light Salmon for skin
    this.ctx.beginPath();
    this.ctx.arc(x, y - 80 + bobAmount, 30, 0, Math.PI * 2);
    this.ctx.fill();

    // Eyes
    this.ctx.fillStyle = '#000000';
    this.ctx.beginPath();
    this.ctx.arc(x - 10, y - 80 + bobAmount, 5, 0, Math.PI * 2);
    this.ctx.arc(x + 10, y - 80 + bobAmount, 5, 0, Math.PI * 2);
    this.ctx.fill();
}

drawQuestBoard(x, y, width, height) {
    // Draw board background
    this.ctx.fillStyle = '#8B4513';  // Dark wood color
    this.ctx.fillRect(x, y, width, height);

    // Draw quest papers
    const now = Date.now();
    for (let i = 0; i < 5; i++) {
        const paperX = x + width * 0.1 + (i * width * 0.18);
        const paperY = y + height * 0.1 + Math.sin(now * 0.002 + i) * 5; // Slight wave motion
        this.ctx.fillStyle = '#F0E68C';  // Light yellow for paper
        this.ctx.fillRect(paperX, paperY, width * 0.15, height * 0.3);

        // Add some "text" lines
        this.ctx.fillStyle = '#000000';
        for (let j = 0; j < 3; j++) {
            this.ctx.fillRect(paperX + 5, paperY + 10 + (j * 15), width * 0.12, 2);
        }
    }
}

drawPlayer(x, y) {
    const now = Date.now();
    const bobAmount = Math.sin(now * 0.005) * 3; // Slight bobbing motion

    // Body
    this.ctx.fillStyle = '#FF6347';  // Tomato color for player
    this.ctx.fillRect(x - 20, y - 50 + bobAmount, 40, 60);

    // Head
    this.ctx.fillStyle = '#FFA07A';  // Light Salmon for skin
    this.ctx.beginPath();
    this.ctx.arc(x, y - 60 + bobAmount, 20, 0, Math.PI * 2);
    this.ctx.fill();
}

drawText(text, x, y) {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '12px OpenDyslexic';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x, y);
}

updateGuildLegend() {
    const legendOutput = document.getElementById('legendOutput');
    legendOutput.innerHTML = `
        <h4>Guild Legend:</h4>
        <ul>
            <li><span style="color: #3da8a0;">■</span> Rooms</li>
            <li><span style="color: #ff6b6b;">●</span> Player</li>
        </ul>
        <p>Rooms: Lobby, Mission Board, Training Area, Offices</p>
    `;
}