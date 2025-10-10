import Chart from "chart.js/auto";

// ===============================
// 🔹 Donut Chart with HTML Legend
// ===============================
const htmlLegendPlugin = {
    id: "htmlLegend",
    afterUpdate(chart, args, options) {
        const container = document.getElementById(options.containerID);
        if (!container) return;

        let list = container.querySelector("ul");
        if (!list) {
            list = document.createElement("ul");
            container.appendChild(list);
        }

        while (list.firstChild) {
            list.firstChild.remove();
        }

        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach((item, index) => {
            const li = document.createElement("li");
            const box = document.createElement("span");
            box.style.background = item.fillStyle;

            const value = chart.data.datasets[0].data[index];
            const percent = ((value / total) * 100).toFixed(1);
            const text = document.createTextNode(`${item.text} ${percent}%`);

            li.appendChild(box);
            li.appendChild(text);

            li.onclick = () => {
                chart.toggleDataVisibility(item.index);
                chart.update();
            };

            list.appendChild(li);
        });
    },
};

function createDonutChartWithLegend(
    canvasId,
    legendId,
    data,
    colors,
    cutout = "60%"
) {
    const ctx = document.getElementById(canvasId);
    const legendContainer = document.getElementById(legendId);

    if (ctx && legendContainer) {
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: data.labels,
                datasets: [
                    {
                        data: data.values,
                        backgroundColor: colors,
                        hoverOffset: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout,
                plugins: {
                    legend: {
                        display: false,
                    },
                    htmlLegend: {
                        containerID: legendId,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const dataset = context.dataset.data;
                                const total = dataset.reduce(
                                    (a, b) => a + b,
                                    0
                                );
                                const value = dataset[context.dataIndex];
                                const percentage = (
                                    (value / total) *
                                    100
                                ).toFixed(1);
                                return `${context.label}: ${percentage}%`;
                            },
                        },
                    },
                },
            },
            plugins: [htmlLegendPlugin],
        });
    }
}

// ===============================
// 🔹 Donut Chart with Center Text
// ===============================
function createDonutChartWithText(canvasId, progress, colors) {
    const ctx = document.getElementById(canvasId).getContext("2d");

    const centerText = {
        id: "centerText",
        afterDraw(chart) {
            const {
                ctx,
                chartArea: { width, height },
            } = chart;
            ctx.save();
            ctx.font = "600 12px sans-serif";
            ctx.fillStyle = "#333";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`+${progress}%`, width / 2, height / 2);
        },
    };

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Progress", "Sisa"],
            datasets: [
                {
                    data: [progress, 100 - progress],
                    backgroundColor: colors,
                    borderWidth: 0,
                },
            ],
        },
        options: {
            cutout: "75%",
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
            },
        },
        plugins: [centerText],
    });
}

// ===============================
// 🔹 Init All Charts
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    createDonutChartWithLegend(
        "donutChartUsers",
        "legend-container-users",
        {
            labels: ["New", "Return", "Inactive"],
            values: [62, 26, 12],
        },
        ["#9B5DE0", "#D78FEE", "#FDCFFA"],
        "60%"
    );

    createDonutChartWithLegend(
        "donutChartSubscriptions",
        "legend-container-subscriptions",
        {
            labels: ["Paid", "Trial"],
            values: [70, 30],
        },
        ["#8FA31E", "#C6D870"],
        "60%"
    );

    createDonutChartWithText("donutChartInvoices", 12, ["#DC143C", "#F7CAC9"]);
    createDonutChartWithText("donutChartReceived", 59, ["#4CAF50", "#C8E6C9"]);
});
