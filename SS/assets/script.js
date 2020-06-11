// Define work hour variables from 7 am to 6pm

var workHrs = [7,8,9,10,11,12,13,14,15,16,17,18];

var currentDate = moment().format("dddd, MMMM Do YYYY");
$(".date").html(currentDate);
var currentHr = moment().hour();

function startPlanner () {
    for (i = 0 ; i < workHrs.length ; i++) {
        var getText = localStorage.getItem("textA" + i);
        var row = $("<div class = 'row'>");
        var col1 = $("<div class = 'col-lg-1 text-left'>");
        var midday = " AM";
        if (workHrs[i]> 12) {
            midday = " PM";
        }
        var normalHrs = workHrs[i];
        if (normalHrs > 12) {
            normalHrs = normalHrs - 12;
        }
        col1.html(normalHrs + midday);

        var col2 = $("<div class = 'col-lg-10'>");

        var textA = $("<p>");
        textA.attr("id", "textA" + i);
        // Define colour of hours current before and after, current is green, past is grey, future is yellow
        var colour = "bg-success";

        if (workHrs[i] > currentHr) {
            colour = "bg-warning";
        }
        
        if (workHrs[i] < currentHr) {
            colour = "bg-info";
        }

        textA.attr("class", colour);
        textA.val(getText);
        col2.append(textA);

        var col3 = $("<div class = 'col-lg-1'>");
        var btn = $("<button class='btn btn-dark save'>");
        btn.text("Save");
        col3.append(btn);

        row.append(col1, col2, col3);

        $("#planner").append(row);

    }
}

startPlanner();

$(".save").on("click", function() {
    for (i = 0; i < workHrs.length; i++) {
        var textInput = $("#textA" + i).val();
        localStorage.setItem("textA" + i, textInput);
    }
});
