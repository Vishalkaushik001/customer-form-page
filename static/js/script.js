
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.borderColor = "#3498db";
        });
        input.addEventListener("blur", () => {
            input.style.borderColor = "#ccc";
        });
    });
});
