// toggles dark mode
$("#map-color").on("change", function (e)
{
    if (e.target.checked)
    {
        $("body").addClass("nighttime");
    } else
    {
        $("body").removeClass("nighttime");
    }
});