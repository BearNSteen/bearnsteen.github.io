document.addEventListener('DOMContentLoaded', function() {
    // Existing tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Layout toggle functionality
    const layoutToggle = document.getElementById('layout-toggle');
    const characterContainer = document.querySelector('.character-container');

    layoutToggle.addEventListener('click', function() {
        characterContainer.classList.toggle('stacked-layout');
        layoutToggle.textContent = characterContainer.classList.contains('stacked-layout') 
            ? 'Switch to Side-by-Side Layout' 
            : 'Switch to Stacked Layout';
    });

    // New stat chart functionality
    const ctx = document.getElementById('statChart').getContext('2d');
    const levels = Array.from({length: 99}, (_, i) => i + 1);
    
    const statData = {
        Strength: levels.map(level => Math.floor(200 + (level * 1.5))),
        Agility: levels.map(level => Math.floor(100 + (level * 0.8))),
        Endurance: levels.map(level => Math.floor(180 + (level * 1.4))),
        Intelligence: levels.map(level => Math.floor(80 + (level * 0.7))),
        Charisma: levels.map(level => Math.floor(120 + (level * 0.8))),
        Magic: levels.map(level => Math.floor(50 + (level * 0.5))),
        Tempo: levels.map(level => Math.floor(150 + (level * 1.3)))
    };

    const colors = {
        Strength: 'rgb(255, 99, 132)',
        Agility: 'rgb(75, 192, 192)',
        Endurance: 'rgb(255, 205, 86)',
        Intelligence: 'rgb(54, 162, 235)',
        Charisma: 'rgb(153, 102, 255)',
        Magic: 'rgb(255, 159, 64)',
        Tempo: 'rgb(201, 203, 207)'
    };

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: levels,
            datasets: Object.keys(statData).map(stat => ({
                label: stat,
                data: statData[stat],
                borderColor: colors[stat],
                fill: false,
                tension: 0.1
            }))
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            animation: {
                duration: 0 // general animation time
            },
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }
    });

    function updateStatTable(level) {
        const table = document.getElementById('stat-table');
        table.innerHTML = '';
        Object.keys(statData).forEach(stat => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.innerHTML = `<div class="stat-color-box" style="background-color: ${colors[stat]}"></div> ${stat}`;
            cell2.textContent = statData[stat][level - 1];
            row.setAttribute('data-stat', stat);
            row.addEventListener('click', () => toggleStat(stat));
        });
        document.getElementById('level-display').textContent = level;
    }

    function toggleStat(stat) {
        const isCurrentlyShown = chart.data.datasets.some(dataset => dataset.label === stat);
        if (isCurrentlyShown) {
            chart.data.datasets = chart.data.datasets.filter(dataset => dataset.label !== stat);
        } else {
            chart.data.datasets.push({
                label: stat,
                data: statData[stat],
                borderColor: colors[stat],
                fill: false,
                tension: 0.1
            });
        }
        chart.update();
        updateTableRowStyles();
    }

    function updateTableRowStyles() {
        const rows = document.querySelectorAll('#stat-table tr');
        rows.forEach(row => {
            const stat = row.getAttribute('data-stat');
            const isShown = chart.data.datasets.some(dataset => dataset.label === stat);
            row.classList.toggle('active', isShown);
        });
    }

    document.querySelector('.stat-button[data-stat="all"]').addEventListener('click', function() {
        chart.data.datasets = Object.keys(statData).map(stat => ({
            label: stat,
            data: statData[stat],
            borderColor: colors[stat],
            fill: false,
            tension: 0.1
        }));
        chart.update();
        updateTableRowStyles();
    });

    updateStatTable(99);
    updateTableRowStyles();
});