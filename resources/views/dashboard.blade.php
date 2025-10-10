<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - App Business</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('icon-dashboard-app.png') }}">
</head>

<body>
    <div class="wrapper">
        <div class="col">
            <div class="side-bar-left">
                <div class="col-1">
                    <div class="logo">
                        <img src="{{ asset('images/logo-dashboard-app.png') }}" alt="Logo" width="35">
                        <p>Business</p>
                    </div>
                </div>
                <div class="col-2">
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-panels-top-left-icon lucide-panels-top-left">
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M3 9h18" />
                            <path d="M9 21V9" />
                        </svg>Analytics
                    </p>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-briefcase-icon lucide-briefcase">
                            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            <rect width="20" height="14" x="2" y="6" rx="2" />
                        </svg>Products
                    </p>
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail">
                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                        </svg>Messeges</p>
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-user-icon lucide-user">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>Customers</p>
                </div>
                <div class="col-3">
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings">
                            <path
                                d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>Settings</p>
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out">
                            <path d="m16 17 5-5-5-5" />
                            <path d="M21 12H9" />
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        </svg>Sign Out</p>
                </div>
            </div>
            <div class="main-content">
                <div class="tab-content">
                    <p>Analytics</p>
                </div>
                <div class="content">
                    <div class="col-1">
                        <div class="card orders">
                            <div class="row-1">
                                <p>Orders</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="lucide lucide-square-round-corner-icon lucide-square-round-corner">
                                    <path d="M21 11a8 8 0 0 0-8-8" />
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                </svg>
                            </div>
                            <div class="row-2">
                                <p class="indicator-order">201</p>
                                <p class="chance-order trending-up">
                                    <svg class="trending-up" xmlns="http://www.w3.org/2000/svg" width="12"
                                        height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-trending-up-icon lucide-trending-up">
                                        <path d="M16 7h6v6" />
                                        <path d="m22 7-8.5 8.5-5-5L2 17" />
                                    </svg>8.2% <span style="color: black; opacity: 0.4; font-size: 8px;">since last
                                        month</span>
                                </p>
                            </div>
                        </div>
                        <div class="card month-total">
                            <div class="row-1">
                                <p>Month total</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                    <path d="M12 18V6" />
                                </svg>
                            </div>
                            <div class="row-2">
                                <p class="indicator-order">25410</p>
                                <p class="chance-order trending-down">
                                    <svg class="trending-down" xmlns="http://www.w3.org/2000/svg" width="12"
                                        height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-trending-down-icon lucide-trending-down">
                                        <path d="M16 17h6v-6" />
                                        <path d="m22 17-8.5-8.5-5 5L2 7" />
                                    </svg>0.2% <span style="color: black; opacity: 0.4; font-size: 8px;">since last
                                        month</span>
                                </p>

                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="card approved">
                            <div class="row-1">
                                <p>Approved</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="lucide lucide-square-check-big-icon lucide-square-check-big">
                                    <path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344" />
                                    <path d="m9 11 3 3L22 4" />
                                </svg>
                            </div>
                            <div class="row-2">
                                <p class="indicator-order">35</p>
                                <p class="chance-order trending-up">
                                    <svg class="trending-up" xmlns="http://www.w3.org/2000/svg" width="12"
                                        height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-trending-up-icon lucide-trending-up">
                                        <path d="M16 7h6v6" />
                                        <path d="m22 7-8.5 8.5-5-5L2 17" />
                                    </svg>3.4% <span style="color: black; opacity: 0.4; font-size: 8px;">since last
                                        month</span>
                                </p>
                            </div>
                        </div>
                        <div class="card revenue">
                            <div class="row-1">
                                <p>Revenue</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="lucide lucide-credit-card-icon lucide-credit-card">
                                    <rect width="20" height="14" x="2" y="5" rx="2" />
                                    <line x1="2" x2="22" y1="10" y2="10" />
                                </svg>
                            </div>
                            <div class="row-2">
                                <p class="indicator-order">1152</p>
                                <p class="chance-order trending-down">
                                    <svg class="trending-down" xmlns="http://www.w3.org/2000/svg" width="12"
                                        height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-trending-down-icon lucide-trending-down">
                                        <path d="M16 17h6v-6" />
                                        <path d="m22 17-8.5-8.5-5 5L2 7" />
                                    </svg>1.2% <span style="color: black; opacity: 0.4; font-size: 8px;">since last
                                        month</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card-heigth users">
                            <div class="row-1">
                                <p>Users</p>
                            </div>
                            <div class="row-2">
                                <p class="indicator-users">5.128</p>
                                <span style="color: black; opacity: 0.4; font-size: 8px;">since last
                                    month</span>
                            </div>
                            <div class="row-3">
                                <div class="chart-wrapper users-chart">
                                    <div class="col-1">
                                        <div id="legend-container-users"></div>
                                    </div>
                                    <div class="col-2">
                                        <canvas id="donutChartUsers"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-heigth subscriptions">
                            <div class="row-1">
                                <p>Subscriptions</p>
                            </div>
                            <div class="row-2">
                                <p class="indicator-users">1.201</p>
                                <span style="color: black; opacity: 0.4; font-size: 8px;">since last
                                    month</span>
                            </div>
                            <div class="row-3">
                                <div class="chart-wrapper subscriptions-chart">
                                    <div class="col-1">
                                        <div id="legend-container-subscriptions"></div>
                                    </div>
                                    <div class="col-2">
                                        <canvas id="donutChartSubscriptions"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mid-content">
                    <div class="col-1">
                        <div class="card-width sales-dynamics">
                            <p>Sales dynamics</p>
                            <p>2021
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="lucide lucide-chevron-down-icon lucide-chevron-down">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </p>
                        </div>
                        <div class="card-width user-activity">
                            <p>Overall User Activity</p>
                            <p>2021
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="lucide lucide-chevron-down-icon lucide-chevron-down">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </p>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="row-1">
                            <div class="card paid-invoice">
                                <div class="row-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-wallet-icon lucide-wallet">
                                        <path
                                            d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                                        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                                    </svg>
                                    <div class="chart-container-invoices">
                                        <canvas id="donutChartInvoices"></canvas>
                                    </div>
                                </div>
                                <div class="row-2">
                                    <p class="title-invoice">Paid Invoice</p>
                                    <p class="indicator-invoice">$30256.23</p>
                                    <span style="margin: 0px 20px 0px 20px; font-size: 10px; opacity: 0.7;">Current
                                        Finance Year</span>
                                </div>
                            </div>
                            <div class="card funds-received">
                                <div class="row-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-banknote-arrow-up-icon lucide-banknote-arrow-up">
                                        <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
                                        <path d="M18 12h.01" />
                                        <path d="M19 22v-6" />
                                        <path d="m22 19-3-3-3 3" />
                                        <path d="M6 12h.01" />
                                        <circle cx="12" cy="12" r="2" />
                                    </svg>
                                    <div class="chart-container-received">
                                        <canvas id="donutChartReceived"></canvas>
                                    </div>
                                </div>
                                <div class="row-2">
                                    <p class="title-invoice">Funds Received</p>
                                    <p class="indicator-invoice">$150256.23</p>
                                    <span style="margin: 0px 20px 0px 20px; font-size: 10px; opacity: 0.7;">Current
                                        Finance Year</span>
                                </div>
                            </div>
                        </div>
                        <div class="row-2">
                            <div class="card-width customes-order">
                                <p>Customer order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

</html>
