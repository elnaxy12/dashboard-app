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
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn(`Canvas dengan ID "${canvasId}" tidak ditemukan.`);
        return;
    }

    const ctx = canvas.getContext("2d");

    const centerText = {
        id: "centerText",
        afterDraw(chart) {
            const { ctx, chartArea } = chart;
            const { width, height, left, top } = chartArea;

            ctx.save();
            ctx.font = "600 12px sans-serif";
            ctx.fillStyle = document.body.classList.contains("dark-mode")
                ? "#fff"
                : "#333";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const textX = left + width / 2;
            const textY = top + height / 2;

            ctx.fillText(`+${progress}%`, textX, textY);
            ctx.restore();
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
                backgroundColor: "transparent",
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

//

// ===============================
// 🔹 Dynamic Status Badge Color
// ===============================

// === Pewarnaan baris sesuai status ===
function colorizeRow(row, status) {
    if (!row || !status) return;

    const s = status.trim().toLowerCase();

    row.style.color = "#000";
    row.style.backgroundColor = "";

    switch (s) {
        case "shipped":
            row.style.backgroundColor = "#e8f4fc";
            row.style.border = "1px solid #90caf9"; 
            break;
        case "processing":
            row.style.backgroundColor = "#fff8e1";
            row.style.border = "1px solid #ffd54f"; 
            break;
        case "delivered":
            row.style.backgroundColor = "#e9f9ee";
            row.style.border = "1px solid #81c784"; 
            break;
        case "cancelled":
            row.style.backgroundColor = "#fdecea";
            row.style.border = "1px solid #e57373"; 
            break;
        default:
            row.style.backgroundColor = "#f5f5f5";
            row.style.border = "1px solid #ccc"; 
    }

    // Tambahan styling rapi
    row.style.borderRadius = "8px";
    row.style.transition = "background 0.3s ease";
}

// === Warna awal saat halaman dimuat ===
document.querySelectorAll(".table-grid-5").forEach((row) => {
    const statusEl = row.querySelector(".status");
    if (statusEl) colorizeRow(row, statusEl.textContent);
});

// === Data unik tanpa duplikat ===
const users = [
    {
        name: "John Doe",
        address: "123 Main St",
        date: "2023-01-01",
        status: "Shipped",
        price: "$100.00",
    },
    {
        name: "Jane Smith",
        address: "456 Oak Ave",
        date: "2023-02-15",
        status: "Processing",
        price: "$75.50",
    },
    {
        name: "Alice Johnson",
        address: "789 Pine Rd",
        date: "2023-03-10",
        status: "Delivered",
        price: "$50.00",
    },
    {
        name: "Bob Brown",
        address: "321 Maple St",
        date: "2023-04-05",
        status: "Cancelled",
        price: "$0.00",
    },
    {
        name: "Mark Lee",
        address: "999 Sunset Blvd",
        date: "2023-05-22",
        status: "Processing",
        price: "$210.00",
    },
    {
        name: "Sophie Turner",
        address: "777 River Rd",
        date: "2023-06-17",
        status: "Delivered",
        price: "$180.25",
    },
    {
        name: "Michael Chen",
        address: "101 Hillview St",
        date: "2023-07-09",
        status: "Shipped",
        price: "$135.00",
    },
    {
        name: "Olivia Park",
        address: "555 Forest Ln",
        date: "2023-08-12",
        status: "Cancelled",
        price: "$0.00",
    },
    {
        name: "Liam Evans",
        address: "89 Seaside Ave",
        date: "2023-09-23",
        status: "Delivered",
        price: "$95.75",
    },
    {
        name: "Emma Davis",
        address: "22 Orchard Blvd",
        date: "2023-10-03",
        status: "Processing",
        price: "$120.50",
    },
];

// === Event tombol randomize ===
document.getElementById("randomizeBtn").addEventListener("click", () => {
    const rows = document.querySelectorAll("#tableContainer .table-grid-5");
    const usedIndexes = new Set();

    rows.forEach((row) => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * users.length);
        } while (
            usedIndexes.has(randomIndex) &&
            usedIndexes.size < users.length
        );

        usedIndexes.add(randomIndex);
        const randomUser = users[randomIndex];

        // isi data baru
        row.querySelector(".name").textContent = randomUser.name;
        row.querySelector(".address").textContent = randomUser.address;
        row.querySelector(".date").textContent = randomUser.date;
        row.querySelector(".status").textContent = randomUser.status;
        row.querySelector(".price").textContent = randomUser.price;

        // ubah warna baris
        colorizeRow(row, randomUser.status);
    });
});

//

// ===============================
// 🔹 Dark Mode Toggle
// ===============================

const checkbox = document.getElementById("checkbox");
const body = document.body;

const mainContent = document.querySelector(".wrapper .col .main-content");

// Kartu dan elemen-elemen di dalamnya
const cards1 = document.querySelectorAll(
    ".wrapper .col .main-content .content .col-3 .card-height, \
   .wrapper .col .main-content .col-3 .card-height .row-3 .chart-wrapper"
);
const cards2 = document.querySelectorAll(
    ".wrapper .col .mid-content .col-1 .card-width, \
   .wrapper .col .mid-content .col-2 .row-2 .card-width"
);
const cards3 = document.querySelectorAll(
    ".wrapper .col .main-content .content .card, \
   .wrapper .col .mid-content .card, \
   .wrapper .col .mid-content .col-1 .card-width .row-1 .dropdown-items"
);

// Table
const tables = document.querySelectorAll(".table-grid-5");

// Elemen teks & ikon dalam card
const icons = document.querySelectorAll(`
  .wrapper .col .main-content .col-1 .card .row-1 svg,
  .wrapper .col .main-content .col-2 .card .row-1 svg,
  .wrapper .col .mid-content .col-2 .row-2 .card-width .row-1 svg
`);

const texts = document.querySelectorAll(`
  .wrapper .col .main-content .col-1 .card.dark-mode .row-1 p,
  .wrapper .col .main-content .col-2 .card.dark-mode .row-1 p,
  .wrapper .col .main-content .col-1 .card .row-2 p,
  .wrapper .col .main-content .col-2 .card .row-2 p,
  .wrapper .col .mid-content .col-1 .card-width .row-1 p,
  .wrapper .col .main-content .col-3 .card-height .row-1 p,
  .wrapper .col .main-content .col-3 .card-height .row-2 p,
  .wrapper .col .mid-content .col-2 .row-2 .card-width .row-1 p,
  .wrapper .col .main-content .tab-content p,
  .wrapper .col .side-bar-left .col-2 p,
  .wrapper .col .side-bar-left .col-3 p
`);

const spans = document.querySelectorAll(`
  .wrapper .col .main-content .col-1 .card .row-2 p span,
  .wrapper .col .main-content .col-2 .card .row-2 p span
`);

let darkModeTimeout; // untuk mencegah timeout bertumpuk

function toggleDarkMode(active) {
    clearTimeout(darkModeTimeout);

    darkModeTimeout = setTimeout(() => {
        const body = document.body;
        const mainContent = document.querySelector(
            ".wrapper .col .main-content"
        );

        const groups = [cards1, cards2, cards3, tables, icons, texts, spans];

        if (active) {
            body.classList.add("dark-mode");
            mainContent?.classList.add("dark-mode");
            groups.forEach((group) =>
                group.forEach((el) => el.classList.add("dark-mode"))
            );
        } else {
            body.classList.remove("dark-mode");
            mainContent?.classList.remove("dark-mode");
            groups.forEach((group) =>
                group.forEach((el) => el.classList.remove("dark-mode"))
            );
        }

        if (typeof Chart !== "undefined" && Chart.instances) {
            Object.values(Chart.instances).forEach((chart) => chart.update());
        }
    }, 200);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    checkbox.checked = false;
    toggleDarkMode(true);
} else {
    checkbox.checked = true;
    toggleDarkMode(false);
}

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        toggleDarkMode(false);
        localStorage.setItem("theme", "light");
    } else {
        toggleDarkMode(true);
        localStorage.setItem("theme", "dark");
    }
});
