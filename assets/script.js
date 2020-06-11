// Define work hour variables from 7 am to 6pm

var workHrs = [7,8,9,10,11,12,13,14,15,16,17,18];

var currentHr = moment().hour();

function startPlanner () {
    for (let i = 0 ; i < workHrs.length ; i++) {
        var getText = localStorage.getItem("text" + i);
        var row = $("<div class = 'row'>");
        var col1 = $("<div class = çol-md-3 text-center'>");
        var midday = " AM";
        if (workHrs[i]> 12) {
            midday = " PM";
        }
        var normalHrs = workHrs[i];
        if (normalHrs > 12) {
            normalHrs = normalHrs - 12;
        }
        col1.html(normalHrs + midday);

        var col2 = $("<div class = 'col-md-6'>");

        var text = $("<text style='width:100%'>");
        text.attr("id", "text" + i);
        // Define colour of hours current before and after, current is green, past is grey, future is yellow
        var colour = "bg-success";

        if (workHrs[i] > currentHr) {
            colour = "bg-warning";
        }
        
        if (workHrs[i] < currentHr) {
            colour = "bg-info";
        }

        text.attr("class", colour);
        text.val(getText);
        col2.append(text);

        var col3 = $("<div class = 'col-md-3'>");
        var btn = $("<button class='btn btn-dark save'>");
        btn.text("save");
        col3.append(btn);

        row.append(col1, col2, col3);

        $("#planner").append(row);

    }
}

startPlanner();