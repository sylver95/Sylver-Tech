const requestForm = document.querySelector("#project-request-form");
const formStatus = document.querySelector("#form-status");
const submitButton = requestForm.querySelector('button[type="submit"]');

requestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    formStatus.classList.remove("is-success", "is-error");
    formStatus.textContent = "Sending your request…";

    try {
        const response = await fetch(requestForm.action, {
            method: "POST",
            body: new FormData(requestForm),
            headers: { Accept: "application/json" }
        });

        if (!response.ok) {
            formStatus.classList.add("is-error");
            formStatus.textContent = "We couldn’t send your request. Please try again or contact us by email or WhatsApp.";
            return;
        }

        requestForm.reset();
        formStatus.classList.add("is-success");
        formStatus.textContent = "Thank you! Your request was sent. We’ll be in touch.";
    } catch {
        formStatus.classList.add("is-error");
        formStatus.textContent = "We couldn’t connect to the form service. Please try again or contact us by email or WhatsApp.";
    } finally {
        submitButton.disabled = false;
    }
});
