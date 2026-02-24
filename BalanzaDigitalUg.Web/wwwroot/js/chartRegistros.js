let chartRegistrosInstance = null;
window.renderChartRegistros = (labels, values) => {
    const canvas = document.getElementById('chartRegistros');
    if (!canvas) {
        chartRegistrosInstance = null;
        return;
    }
    const ctx = canvas.getContext('2d');
    // Si la instancia existe pero el canvas cambió, destrúyela
    if (chartRegistrosInstance && chartRegistrosInstance.ctx.canvas !== canvas) {
        chartRegistrosInstance.destroy();
        chartRegistrosInstance = null;
    }

    // Evitar división por cero
    const total = values.reduce((acc, v) => acc + (Number(v) || 0), 0) || 1;
    const baseLabels = labels;
    const percentLabels = labels.map((l, i) => `${l} (${((Number(values[i]) || 0) / total * 100).toFixed(1)}%)`);

    // Paleta simple (repite si hay más elementos)
    const palette = [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(199, 199, 199, 0.8)',
        'rgba(83, 102, 255, 0.8)',
        'rgba(255, 102, 255, 0.8)',
        'rgba(102, 255, 178, 0.8)',
        'rgba(0, 0, 0, 0.8)',
        'rgba(255, 204, 153, 0.8)'
    ];
    const backgroundColor = labels.map((_, i) => palette[i % palette.length]);

    if (chartRegistrosInstance) {
        chartRegistrosInstance.data.labels = percentLabels;
        chartRegistrosInstance.data.datasets[0].data = values;
        chartRegistrosInstance.data.datasets[0].backgroundColor = backgroundColor;
        chartRegistrosInstance.update();
    } else {
        chartRegistrosInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: percentLabels,
                datasets: [{
                    label: 'Peso total por tipo',
                    data: values,
                    backgroundColor: backgroundColor,
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                // Aumentar tamaño de las etiquetas de la leyenda
                legend: {
                    position: 'bottom',
                    labels: {
                        fontSize: 20,
                        fontFamily: 'Arial, sans-serif',
                        fontColor: '#333'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            let value = context.raw;
                            return `${label}: ${Math.round(value)}`;
                        }
                    }
                }
            }
        });
    }
};

let chartComunasInstance = null;
window.renderChartComunas = (labels, values) => {

    const canvas = document.getElementById('chartComunas');
    if (!canvas) {
        chartComunasInstance = null;
        return;
    }

    const ctx = canvas.getContext('2d');

    if (chartComunasInstance) {
        chartComunasInstance.destroy();
        chartComunasInstance = null;
    }

    chartComunasInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cantidad de registros',
                data: values.map(v => parseInt(v)),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'x',

            scales: {
                x: {
                    ticks: {
                        autoSkip: false
                    }
                },
                y: {
                    type: 'linear',
                    beginAtZero: true,
                    min: 0,
                    ticks: {
                        stepSize: 1,
                        precision: 0
                    }
                }
            },

            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
};