// ------------------------------
// PAGE ELEMENTS
// ------------------------------

const welcomePage = document.getElementById("welcome-page");

const entreePage = document.getElementById("entree-page");

const dessertPage = document.getElementById("dessert-page");

const needsPage = document.getElementById("needs-page");

const reviewPage = document.getElementById("review-page");

const fullDatePage = document.getElementById("full-date-page");

const goodbyePage = document.getElementById("goodbye-page");


// ------------------------------
// WELCOME PAGE
// ------------------------------

const beginButton = document.getElementById("begin-button");


beginButton.addEventListener("click", function () {

    welcomePage.classList.add("hidden");

    entreePage.classList.remove("hidden");

});


// ------------------------------
// ENTREE PAGE
// ------------------------------

const entreeBack = document.getElementById("entree-back");

const entreeOptions = document.querySelectorAll(".entree-option");

const entreeContinue = document.getElementById("entree-continue");

const specialRequestInput = document.getElementById("special-request-input");


// ------------------------------
// SAVED SELECTIONS
// ------------------------------

let selectedEntree = "";

let selectedSauce = "";

let selectedDessert = "";

let specialRequest = "";


// ------------------------------
// ENTREE BACK BUTTON
// ------------------------------

entreeBack.addEventListener("click", function () {

    entreePage.classList.add("hidden");

    welcomePage.classList.remove("hidden");

});


// ------------------------------
// SAUCE SELECTOR
// ------------------------------

const pastaOption = document.getElementById("pasta-option");

const sauceSelector = document.getElementById("sauce-selector");

const sauceOptions = document.querySelectorAll(".sauce-option");


// ------------------------------
// ENTREE SELECTION
// ------------------------------

entreeOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        if (option === pastaOption) {

            entreeOptions.forEach(function (item) {
                item.classList.remove("selected");
            });

            pastaOption.classList.add("selected");

            sauceSelector.classList.remove("hidden");

            return;
        }


        entreeOptions.forEach(function (item) {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        selectedEntree = option.dataset.entree;

        selectedSauce = "";

    });

});


// ------------------------------
// SAUCE SELECTION
// ------------------------------

sauceOptions.forEach(function (option) {

    option.addEventListener("click", function (event) {

        event.stopPropagation();


        selectedSauce = option.dataset.sauce;

        selectedEntree = pastaOption.dataset.entree;


        sauceSelector.classList.add("hidden");

    });

});


// ------------------------------
// SPECIAL REQUEST
// ------------------------------

specialRequestInput.addEventListener("input", function () {

    specialRequest = specialRequestInput.value;

});


// ------------------------------
// ENTREE CONTINUE BUTTON
// ------------------------------

entreeContinue.addEventListener("click", function () {

    if (selectedEntree === "") {

        alert("Please select an entrée first.");

        return;
    }


    if (
        selectedEntree === "Crispy Chicken Cutlets with Pasta"
        && selectedSauce === ""
    ) {

        alert("Please choose a sauce first.");

        return;
    }


    specialRequest = specialRequestInput.value;


    entreePage.classList.add("hidden");

    dessertPage.classList.remove("hidden");

});


// ------------------------------
// DESSERT PAGE
// ------------------------------

const dessertBack = document.getElementById("dessert-back");

const dessertOptions = document.querySelectorAll(".dessert-option");

const dessertContinue = document.getElementById("dessert-continue");


dessertBack.addEventListener("click", function () {

    dessertPage.classList.add("hidden");

    entreePage.classList.remove("hidden");

});


dessertOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        dessertOptions.forEach(function (item) {

            item.classList.remove("selected");

        });


        option.classList.add("selected");

        selectedDessert = option.dataset.dessert;

    });

});


dessertContinue.addEventListener("click", function () {

    if (selectedDessert === "") {

        alert("Please select a dessert first.");

        return;
    }


    dessertPage.classList.add("hidden");

    needsPage.classList.remove("hidden");

});


// ------------------------------
// WHAT I NEED FROM YOU PAGE
// ------------------------------

const needsBack = document.getElementById("needs-back");

const needsContinue = document.getElementById("needs-continue");


needsBack.addEventListener("click", function () {

    needsPage.classList.add("hidden");

    dessertPage.classList.remove("hidden");

});


needsContinue.addEventListener("click", function () {

    document.getElementById("review-entree").textContent =
        selectedEntree +
        (selectedSauce !== "" ? " — " + selectedSauce : "");


    document.getElementById("review-dessert").textContent =
        selectedDessert;


    if (specialRequest.trim() !== "") {

        document.getElementById("review-special").textContent =
            specialRequest;

        document
            .getElementById("review-special-container")
            .classList.remove("hidden");

    } else {

        document
            .getElementById("review-special-container")
            .classList.add("hidden");

    }


    needsPage.classList.add("hidden");

    reviewPage.classList.remove("hidden");

});


// ------------------------------
// REVIEW PAGE
// ------------------------------

const reviewBack = document.getElementById("review-back");

const lockSelection = document.getElementById("lock-selection");


reviewBack.addEventListener("click", function () {

    reviewPage.classList.add("hidden");

    needsPage.classList.remove("hidden");

});


// ------------------------------
// LOCK IN SELECTION
// ------------------------------

lockSelection.addEventListener("click", async function () {

    // Prevent multiple clicks while the submission is happening.

    lockSelection.disabled = true;

    lockSelection.textContent = "SENDING...";


    // Create the final entrée name.

    const finalEntree =
        selectedEntree +
        (selectedSauce !== "" ? " — " + selectedSauce : "");


    // Create the information that will be sent to Formspree.

    const formData = new FormData();

    formData.append("Entree", finalEntree);

    formData.append("Dessert", selectedDessert);

    formData.append(
        "Special Request",
        specialRequest.trim() !== ""
            ? specialRequest
            : "None"
    );


    try {

        // Send the selections to Formspree.

        const response = await fetch(
            "https://formspree.io/f/xrpbzbvg",
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );


        // Check whether Formspree accepted the submission.

        if (!response.ok) {

            throw new Error("Form submission failed.");

        }


        // Put the final selections onto the Full Date Night page.

        document.getElementById("final-entree").textContent =
            finalEntree;


        document.getElementById("final-dessert").textContent =
            selectedDessert;


        // Hide the review page.

        reviewPage.classList.add("hidden");


        // Show the final date night page.

        fullDatePage.classList.remove("hidden");


    } catch (error) {

        // Keep her on the review page if the submission fails.

        alert(
            "Something went wrong sending your selections. " +
            "Please try again."
        );


        // Restore the button.

        lockSelection.disabled = false;

        lockSelection.textContent = "LOCK IN SELECTION";

    }

});


// ------------------------------
// CLOSE INVITE
// ------------------------------

const closeInvite = document.getElementById("close-invite");


closeInvite.addEventListener("click", function () {

    fullDatePage.classList.add("hidden");

    goodbyePage.classList.remove("hidden");

});


// ------------------------------
// CLOSE PAGE
// ------------------------------

const closePage = document.getElementById("close-page");


closePage.addEventListener("click", function () {

    // Try to close the browser tab.

    window.close();


    // If the browser prevents window.close(),
    // visually finish the experience instead.

    setTimeout(function () {

        document.body.innerHTML = "";

    }, 100);

});