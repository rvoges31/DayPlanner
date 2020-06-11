//define variables
var appointment = "";
var scheduleTime = "";
var currentDate;
var currentTime;
var currentC;
var tempArray = [];
var returnedToDos;
var returnedAppointments;


$(window).on("load", function() {
    currentDate = moment().format("dddd MMM Do YYYY");
    $("#date").append(currentDate);
    currentTime = moment().format("H");

    function renderAppointments() {
        returnedToDos = JSON.parse(localStorage.getItem("appointments"));
        if (returnedToDos !== null) {
            for (i=0;i<returnedToDos.length;i++) {
                returnedAppointments = returnedToDos[i];
                details = returnedAppointments.details;
                timeIndex = returnedAppointments.time;
                timeIndex = timeIndex.replace(":00", '');
                if (details !== null) {
                    $("#" + timeIndex).children('div').children('div').children('textarea').val(details);

                }
            }
        }
    }

    renderAppointments()

    for (i = 0; i < 24; i++) {
        CurrentC = i;
        if (currentTime == i) {
            $('#' + CurrentC).addClass("present");
            $('#' + CurrentC).children('div').children('div').children("textarea").addClass("present");
        }
        else if (currentTime > i) {
            $('#' + CurrentC).addClass("past");
            $('#' + CurrentC).children('div').children('div').children("textarea").addClass("past");
        }
        else {
            $('#' + CurrentC).addClass("future");
            $('#' + CurrentC).children('div').children('div').children("textarea").addClass("future");
        }
    }
})

$(".saveBtn").click(function () {
    appointment = $(this).parent('div').children('div').children('textarea').val();
    scheduleTime = $(this).parent('div').parent().attr("id");
    appointment = {
        time: scheduleTime,
        details: appointment
    }
    tempArray = JSON.parse(localStorage.getItem("appointments"));
    if (tempArray === null) {
        localStorage.setItem('appointments', JSON.stringify([{ time: scheduleTime, details: appointment }]));
    }
    else {
        tempArray.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(tempArray));

    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + appointment.addClass("textarea") + '</textarea>'));
});

