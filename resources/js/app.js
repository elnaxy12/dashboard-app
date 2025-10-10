import Chart from "chart.js/auto";

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

        const items = chart.options.plugins.legend.labels.generateLabels(chart);
        items.forEach((item) => {
            const li = document.createElement("li");
            const box = document.createElement("span");
            box.style.background = item.fillStyle;

            const text = document.createTextNode(item.text);
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

function createDonutChart(canvasId, legendId, data, colors, cutout = "60%") {
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
                },
            },
            plugins: [htmlLegendPlugin],
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createDonutChart(
        "donutChartUsers",
        "legend-container-users",
        {
            labels: ["New", "Returning", "Inactive"],
            values: [62, 26, 12],
        },
        ["#9B5DE0", "#D78FEE", "#FDCFFA"],
        "60%"
    );

    createDonutChart(
        "donutChartSubscriptions",
        "legend-container-subscriptions",
        {
            labels: ["Paid", "Trial"],
            values: [70, 30],
        },
        ["#8FA31E", "#C6D870"],
        "60%"
    );
});
