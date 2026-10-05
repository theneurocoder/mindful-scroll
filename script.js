const extensionUI = document.createElement("div");

extensionUI.innerHTML = `
    <div id="mindful-scroll">

        <div id="notification"> 
             <p>You have scrolled&nbsp;<span id="set-number"></span>&nbsp;pages.</p>
             <p>Would you like to close the app or keep scrolling?</p>
             <button id="close-notification">Keep scrolling</button>
        </div>

        <div id="page-number-container">
            Page: <span id="page-number">1</span>
        </div>

        <form id="number-input">
            <input type="number" placeholder="No. of pages to scroll">
            <button type="submit">submit</button>
        </form>

    </div>
`;

document.body.appendChild(extensionUI);

const numberInput = extensionUI.querySelector("#number-input input");
const submitButton = extensionUI.querySelector("#number-input button");
const notification = extensionUI.querySelector("#notification");
const closeNotificationButton = extensionUI.querySelector("#close-notification");
const setNumber = extensionUI.querySelector("#notification #set-number");
const pageNumber = extensionUI.querySelector("#page-number");

let passedValue = 0;
let startingScroll = 0;
let notificationDismissed = false;

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Get entered number
    passedValue = Number(numberInput.value);

    // Store current scroll position
    startingScroll = window.scrollY;

    // Reset notification state
    notificationDismissed = false;

    // Clear input field
    numberInput.value = "";

    // Add new value to notification
    setNumber.innerHTML = passedValue;

    // Hide notification
    notification.style.visibility = "hidden";
});

window.addEventListener("scroll", function() {
    // Calculate current page number
    const viewportScroll = window.scrollY / window.innerHeight;

    if (viewportScroll > 0) {
        pageNumber.innerHTML = Math.floor(viewportScroll) + 1;
    }

    // Calculate number of scrolled pages
    const scrollSinceInput =
        (window.scrollY - startingScroll) / window.innerHeight;

    // Show notification when new value is reached
    if (
        passedValue > 0 &&
        scrollSinceInput >= passedValue &&
        !notificationDismissed
    ) {
        notification.style.visibility = "visible";
    }
});

closeNotificationButton.addEventListener("click", function() {
    // Hide notification
    notification.style.visibility = "hidden";

    // Dismiss notification
    notificationDismissed = true;
});