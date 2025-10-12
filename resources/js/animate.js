// =========================
// animate number with digit
// ==========================

document.querySelectorAll(".animate-number").forEach((el) => {
    const targetValue = parseInt(el.dataset.target);
    const digitCount = targetValue.toString().length; 
    const totalSteps = 4; 
    const stepDelay = 150; 
    let currentStep = 0;

    const animation = setInterval(() => {
        if (currentStep < totalSteps) {
            const max = Math.pow(10, digitCount) - 1;
            const randomValue = Math.floor(Math.random() * max);
            el.textContent = randomValue.toLocaleString("id-ID");
            currentStep++;
        } else {
            el.textContent = targetValue.toLocaleString("id-ID");
            clearInterval(animation);
        }
    }, stepDelay);
});

//

// =========================
// animate number without digit
// ==========================

document.querySelectorAll(".animate-number-plain").forEach((plainEl) => {
    const finalNumber = parseInt(plainEl.dataset.target);
    const digitCount = finalNumber.toString().length; 
    const flickerSteps = 4; 
    const flickerDelay = 150; 
    let flickerCount = 0;

    const flickerInterval = setInterval(() => {
        if (flickerCount < flickerSteps) {
            const max = Math.pow(10, digitCount) - 1;
            const randomValue = Math.floor(Math.random() * max);

            const paddedValue = randomValue
                .toString()
                .padStart(digitCount, "0");
            plainEl.textContent = paddedValue;

            flickerCount++;
        } else {
            plainEl.textContent = finalNumber;
            clearInterval(flickerInterval);
        }
    }, flickerDelay);
});

//

// =========================
// animate number with simbol
// ==========================

document.querySelectorAll(".animate-number-amount").forEach((numElement) => {
    const finalAmount = parseInt(numElement.dataset.target);
    const totalDigits = finalAmount.toString().length;
    const randomCycles = 4; 
    const cycleDelay = 150; 
    let currentCycle = 0;

    const currencyAnimation = setInterval(() => {
        if (currentCycle < randomCycles) {
            const maxValue = Math.pow(10, totalDigits) - 1;
            const tempAmount = Math.floor(Math.random() * maxValue);
            numElement.textContent = `$${tempAmount.toLocaleString("en-US")}`;
            currentCycle++;
        } else {
            numElement.textContent = `$${finalAmount.toLocaleString("en-US")}`;
            clearInterval(currencyAnimation);
        }
    }, cycleDelay);
});
