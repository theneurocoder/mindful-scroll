const extensionUI = document.createElement("div");

extensionUI.innerHTML = `
    <div id="mindful-scroll">

        <div id="notice">
            You have scrolled&nbsp;<span id="set-number"></span>&nbsp;pages.
        </div>

        <div id="page-number-container">
            Page number: <span id="page-number">1</span>
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
const notice = extensionUI.querySelector("#notice");
const setNumber = extensionUI.querySelector("#notice #set-number");
const pageNumber = extensionUI.querySelector("#page-number");


let passedValue;

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    // pass the value
    passedValue = numberInput.value;

    // clear the input field
    numberInput.value = "";

    // add value to notice
    setNumber.innerHTML = passedValue;
});


window.addEventListener("scroll", () => {
    const viewportScroll = window.scrollY / window.innerHeight;

    if (viewportScroll > 0) {
        pageNumber.innerHTML = Math.floor(viewportScroll) + 1;
    }

    if (viewportScroll >= passedValue) {
        document.body.style.overflow = "hidden";
        notice.style.visibility = "visible";
    }
});