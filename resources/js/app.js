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

// ===============================
// 🔹 Bar Chart with HTML Legend
// ===============================

// ===== DATA =====
const dataByYear = {
    2023: [200, 150, 250, 230, 280, 220, 140, 90, 210, 260, 320, 400],
    2024: [180, 190, 230, 260, 290, 270, 150, 100, 200, 310, 350, 420],
    2025: [210, 240, 280, 300, 310, 290, 200, 120, 240, 330, 360, 430],
};

const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];

// ===== CHART PLUGIN ROUND CORNERS =====
const roundCorners = {
    id: "roundCorners",
    afterDatasetsDraw(chart) {
        const { ctx } = chart;
        chart.getDatasetMeta(0).data.forEach((bar) => {
            const { x, y, base } = bar;
            const width = bar.width;
            const radius = 8;

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = bar.options.backgroundColor;

            ctx.moveTo(x - width / 2 + radius, base);
            ctx.lineTo(x + width / 2 - radius, base);
            ctx.quadraticCurveTo(
                x + width / 2,
                base,
                x + width / 2,
                base - radius
            );
            ctx.lineTo(x + width / 2, y + radius);
            ctx.quadraticCurveTo(x + width / 2, y, x + width / 2 - radius, y);
            ctx.lineTo(x - width / 2 + radius, y);
            ctx.quadraticCurveTo(x - width / 2, y, x - width / 2, y + radius);
            ctx.lineTo(x - width / 2, base - radius);
            ctx.quadraticCurveTo(
                x - width / 2,
                base,
                x - width / 2 + radius,
                base
            );
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        });
    },
};

// ===== INIT CHART =====
const ctx = document.getElementById("salesDynamicsChart").getContext("2d");
let chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: months,
        datasets: [
            {
                data: dataByYear["2024"], // default
                backgroundColor: "#0066ff",
                barThickness: 8,
                borderRadius: 8,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "default",
                titleColor: "#fff",
                bodyColor: "#fff",
                callbacks: {
                    label: (context) => `Sales: ${context.formattedValue}k`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false, drawBorder: false },
                border: { display: false },
                ticks: { color: "#bbb", font: { size: 11, weight: 500 } },
            },
            y: {
                min: 0,
                max: 500,
                ticks: {
                    stepSize: 100,
                    color: "#bbb",
                    font: { size: 10 },
                    callback: (value) => `${value}k`,
                },
                grid: { display: false, drawBorder: false },
                border: { display: false },
            },
        },
    },
    plugins: [roundCorners],
});

// ===== DROPDOWN CUSTOM =====
const dropdown = document.getElementById("SalesdynamicsSelect");
const selected = dropdown.querySelector(".selected");
const items = dropdown.querySelectorAll(".dropdown-items div");

// Klik untuk buka/tutup dropdown
selected.addEventListener("click", () => {
    dropdown.classList.toggle("open");

    // Update SVG panah sesuai status
    if (dropdown.classList.contains("open")) {
        selected.innerHTML = `${selected.textContent.trim().split("\n")[0]}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-chevron-up-icon lucide-chevron-up">
                <path d="m18 15-6-6-6 6" />
            </svg>`;
    } else {
        selected.innerHTML = `${selected.textContent.trim().split("\n")[0]}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-chevron-down-icon lucide-chevron-down">
                <path d="m6 9 6 6 6-6" />
            </svg>`;
    }
});

// Pilih item dropdown
items.forEach((item) => {
    item.addEventListener("click", () => {
        const year = item.getAttribute("data-value");
        selected.innerHTML = `${year}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-chevron-down-icon lucide-chevron-down">
                <path d="m6 9 6 6 6-6" />
            </svg>`;

        // Update chart
        chart.data.datasets[0].data = dataByYear[year];
        chart.update();

        dropdown.classList.remove("open");
    });
});

// Tutup dropdown jika klik di luar
window.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");

        // reset panah ke bawah
        selected.innerHTML = `${selected.textContent.trim().split("\n")[0]}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-chevron-down-icon lucide-chevron-down">
                <path d="m6 9 6 6 6-6" />
            </svg>`;
    }
});

// ===============================
// 🔹 Line Chart with HTML Legend
// ===============================

// ===== DATA =====
const salesLineDataByYear = {
    2023: [200, 150, 250, 230, 280, 220, 140, 90, 210, 260, 320, 400],
    2024: [180, 190, 230, 260, 290, 270, 150, 100, 200, 310, 350, 420],
    2025: [210, 240, 280, 300, 310, 290, 200, 120, 240, 330, 360, 430],
};

const salesLineMonths = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];

// ===== INIT LINE CHART =====
const salesLineCtx = document.getElementById("salesLineChart").getContext("2d");
let salesLineChart = new Chart(salesLineCtx, {
    type: "line",
    data: {
        labels: salesLineMonths,
        datasets: [
            {
                label: "Sales (Line)",
                data: salesLineDataByYear["2024"], 
                borderColor: "#00aaff",
                backgroundColor: "white",
                borderWidth: 2,
                tension: 0.4, 
                pointBackgroundColor: "#fff",
                pointBorderColor: "#00aaff",
                pointRadius: 0,
                pointHoverRadius: 0,
                fill: true,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "default",
                titleColor: "#fff",
                bodyColor: "#fff",
                callbacks: {
                    label: (context) => `Sales: ${context.formattedValue}k`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false, drawBorder: false },
                border: { display: false },
                ticks: { color: "#bbb", font: { size: 11, weight: 500 } },
            },
            y: {
                min: 0,
                max: 500,
                ticks: {
                    stepSize: 100,
                    color: "#bbb",
                    font: { size: 10 },
                    callback: (value) => `${value}k`,
                },
                grid: { display: false, drawBorder: false },
                border: { display: false },
            },
        },
    },
});

// ===== DROPDOWN CUSTOM (KHUSUS LINE CHART) =====
const salesLineDropdown = document.getElementById("SalesLineSelect");
const salesLineSelected = salesLineDropdown.querySelector(".selected");
const salesLineItems = salesLineDropdown.querySelectorAll(
    ".dropdown-items div"
);

// Klik untuk buka/tutup dropdown
salesLineSelected.addEventListener("click", () => {
    salesLineDropdown.classList.toggle("open");

    const iconUp = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="m18 15-6-6-6 6" />
        </svg>`;
    const iconDown = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6" />
        </svg>`;

    salesLineSelected.innerHTML = salesLineDropdown.classList.contains("open")
        ? `${salesLineSelected.textContent.trim().split("\n")[0]} ${iconUp}`
        : `${salesLineSelected.textContent.trim().split("\n")[0]} ${iconDown}`;
});

// Pilih item dropdown
salesLineItems.forEach((item) => {
    item.addEventListener("click", () => {
        const year = item.getAttribute("data-value");
        salesLineSelected.innerHTML = `${year}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
            </svg>`;

        // Update chart data
        salesLineChart.data.datasets[0].data = salesLineDataByYear[year];
        salesLineChart.update();

        salesLineDropdown.classList.remove("open");
    });
});

// Tutup dropdown jika klik di luar
window.addEventListener("click", (e) => {
    if (!salesLineDropdown.contains(e.target)) {
        salesLineDropdown.classList.remove("open");
        salesLineSelected.innerHTML = `${
            salesLineSelected.textContent.trim().split("\n")[0]
        }
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
            </svg>`;
    }
});
