// toggles dark mode
const a = document.querySelector("#map-color");
const body = document.querySelector("body");

a.addEventListener("change", function (e)
{
    if (e.target.checked)
    {
        body.classList.add("nighttime");
    } else
    {
        body.classList.remove("nighttime");
    }
});