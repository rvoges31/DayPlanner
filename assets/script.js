//declare variables
var appointment = "";
var scheduleTime = "";
var currentDate;
var currentTime;
var currentC;
var tempArray = [];
var returnedToDos;
var returnedAppointments;

// Only run function after page has loaded
$(window).on("load", function() {
    // Get current date and current time from moment.js
    currentDate = moment().format("dddd MMM Do YYYY");
    //Set Date in HTML
    $("#date").append(currentDate);
    currentTime = moment().format("H");

    function renderAppointments() {
        //Get object data from local storage - JSON.parse
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
    // Run function 
    renderAppointments()
    //Set colours for present, past and future - add class and style in css
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
});

// On click event for save button
$(".saveBtn").click(function () {
    appointment = $(this).parent('div').children('div').children('textarea').val();
    scheduleTime = $(this).parent('div').parent().attr("id");
    // Creat object to hold appointment details and respective time
    appointment = {
        time: scheduleTime,
        details: appointment
    }
    // Get temporary array of appointmenets (if existing)
    tempArray = JSON.parse(localStorage.getItem("appointments"));
    if (tempArray === null) {
        // Store apointment to locat storage
        localStorage.setItem('appointments', JSON.stringify([{ time: scheduleTime, details: appointment }]));
    }
    // Set temporar array of appointments (if not yet existing)
    else {
        tempArray.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(tempArray));

    }
    // Replace text area with appointment
    // 'apointment.addCLass("textarea") throws an exception in console however have kept it in as the code sill not save the new text without it
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + appointment.addClass("textarea") + '</textarea>'));
});

