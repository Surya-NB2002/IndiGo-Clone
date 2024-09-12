document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById('bookingForm');
    const searchButton = document.getElementById('searchFlight');
    const errorListContainer = document.getElementById('errorListContainer');
    const errorList = document.getElementById('errorList');

    const modal = document.getElementById("welcomeModal");
    const closeModalBtn = document.getElementById("closeModal");
    const promoCodeLink = document.getElementById("promoCode");
    const promoInput = document.getElementById("promoInput");
    const submitPromoBtn = document.getElementById("submitPromoBtn");
    const mainContent = document.getElementById("mainContent");
    const modalContent = document.querySelector(".modal-content");

    // modal functionalities
    const openModal = () => {
        modal.style.display = "flex";
        mainContent.classList.add("blur");
        promoInput.focus();
        modal.setAttribute("aria-hidden", "false");
    };

    const closeModal = () => {
        modal.style.display = "none";
        mainContent.classList.remove("blur");
        modal.setAttribute("aria-hidden", "true");
        promoCodeLink.focus();
    };

    promoCodeLink.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
    });

    closeModalBtn.addEventListener("click", closeModal);

    // form validation functionality
    searchButton.addEventListener('click', function (e) {
        e.preventDefault();

        const from = document.querySelector('input[name="from"]').value.trim();
        const to = document.querySelector('input[name="to"]').value.trim();
        const departureValue = document.querySelector('input[name="deptarture"]').value;
        const returnValue = document.querySelector('input[name="return"]').value;
        const passengers = document.querySelector('input[name="passengerNo"]').value.trim();
        const travelPurpose = document.getElementById('travelOpt').value;

        let messages = [];

        if (!from) messages.push('Please enter your departure city.');
        if (!to) messages.push('Please enter your destination city.');
        if (!departureValue) messages.push('Please select a departure date.');
        if (!returnValue) messages.push('Please select a return date.');
        if (!passengers) messages.push('Please specify the number of passengers.');
        if (!travelPurpose) messages.push('Please select your travel purpose.');

        if (departureValue && returnValue) {
            const departure = new Date(departureValue);
            const returnDate = new Date(returnValue);
            if (departure >= returnDate) messages.push('The departure date must be before the return date.');
        }

        errorList.innerHTML = '';

        if (messages.length > 0) {
            messages.forEach(message => {
                const li = document.createElement('li');
                li.textContent = message;
                errorList.appendChild(li);
            });
            errorListContainer.style.display = 'block';
        } else {
            errorListContainer.style.display = 'none';
            alert("Form submitted successfully!");
            bookingForm.submit();
        }
    });

    // modal functionalities contd.
    modal.addEventListener("click", function (e) {
        if (!modalContent.contains(e.target)) {
            closeModal();
        }
    });

    submitPromoBtn.addEventListener("click", function () {
        const promoCodeValue = promoInput.value.trim();
        if (promoCodeValue) {
            promoCodeLink.innerHTML = `<u>${promoCodeValue}</u>`;
        }
        closeModal();
    });

    modal.addEventListener("keydown", function (e) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }

        if (e.key === "Escape") {
            closeModal();
        }
    });

});
