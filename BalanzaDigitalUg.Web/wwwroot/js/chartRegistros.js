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
                // Ajustes de tooltips con tamaño de fuente mayor
                tooltips: {
                    bodyFontSize: 14,
                    titleFontSize: 15,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            const idx = tooltipItem.index;
                            const val = data.datasets[tooltipItem.datasetIndex].data[idx];
                            const pct = (Number(val) / total * 100).toFixed(1);
                            // Mostrar etiqueta base (sin porcentaje duplicado) + valor + porcentaje
                            return `${baseLabels[idx]}: ${val} (${pct}%)`;
                        }
                    }
                }
            }
        });
    }
};