document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById('bookingForm');
    const searchButton = document.getElementById('searchFlight');
    const errorPopup = document.getElementById('errorPopup');
    const errorMessage = document.getElementById('errorMessage');

    searchButton.addEventListener('click', function (e) {
        e.preventDefault(); 
        
        const from = document.querySelector('input[name="from"]').value;
        const to = document.querySelector('input[name="to"]').value;
        const departureValue = document.querySelector('input[name="deptarture"]').value;
        const returnValue = document.querySelector('input[name="return"]').value;
        const passengers = document.querySelector('input[name="passengerNo"]').value;
        const travelPurpose = document.getElementById('travelOpt').value;
        
        let message = '';

        if (!from) {
            message = 'Please enter your departure city.';
        } else if (!to) {
            message = 'Please enter your destination city.';
        } else if (!departureValue) {
            message = 'Please select a departure date.';
        } else if (!returnValue) {
            message = 'Please select a return date.';
        } else if (!passengers) {
            message = 'Please specify the number of passengers.';
        } else if (!travelPurpose) {
            message = 'Please select your travel purpose.';
        } else {
            const departure = new Date(departureValue);
            const returnDate = new Date(returnValue);

            if (departure >= returnDate) {
                message = 'The departure date must be before the return date.';
            }
        }

        if (message) {
            errorMessage.textContent = message;
            errorPopup.style.display = 'block';

            setTimeout(() => {
                errorPopup.style.display = 'none';
            }, 3000); 
        } else {
            alert("Form submitted successfully!");
            bookingForm.submit();
        }
    });
});
