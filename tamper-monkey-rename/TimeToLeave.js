// ==UserScript==
// @name         TTL V3
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  I want to go home!
// @author       Not Me
// @match        https://*/**
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var tag = document.createElement("script");
    tag.src = "https://cdn.jsdelivr.net/npm/date-fns@4.1.0/cdn.min.js";
    tag.defer = "true";
    document.getElementsByTagName("body")[0].appendChild(tag);

    // Ensure the script is loaded before running the rest of the code
    tag.onload = function() {
        // Define your work hours
        const workHoursPerDay = 8;

        // Get the current worked time from the website
        const workedTimeString = document.querySelector("#kt_content > div > div:nth-child(5) > div.col-xl-9.col-lg-12.order-lg-1.order-xl-1 > div:nth-child(3) > div > div.kt-ribbon__target > i > span").innerText;

        const workedTimeArray = workedTimeString.split(':');
        const hoursWorked = parseInt(workedTimeArray[1]);
        const minutesWorked = parseInt(workedTimeArray[2]);
        const secondsWorked = parseInt(workedTimeArray[3]);

        // Convert worked time to minutes
        const totalMinutesWorked = hoursWorked * 60 + minutesWorked + secondsWorked / 60;

        // Calculate the remaining time to work
        const remainingWorkMinutes = workHoursPerDay * 60 - totalMinutesWorked;

        // Calculate the time to leave
        const now = new Date();
        const leaveTime = new Date(now.getTime() + remainingWorkMinutes * 60 * 1000);

        // Format the leave time
        const leaveHours = leaveTime.getHours();
        const leaveMinutes = leaveTime.getMinutes();
        const leaveSeconds = leaveTime.getSeconds();

        // Humanize the remaining time using date-fns
        const remainingDuration = dateFns.intervalToDuration({
            start: 0,
            end: remainingWorkMinutes * 60 * 1000
        });
        const humanizedDuration = dateFns.formatDuration(remainingDuration);

        // Update the page with the leave time and remaining duration
        if (leaveTime > now) {
            document.querySelector("#kt_content > div > div:nth-child(5) > div.col-xl-9.col-lg-12.order-lg-1.order-xl-1 > div:nth-child(3) > div > h5").innerText = `YOU MUST LEAVE AT ${leaveHours}:${leaveMinutes}:${leaveSeconds}, REMAINING ${humanizedDuration}`;
        } else {
            document.querySelector("#kt_content > div > div:nth-child(5) > div.col-xl-9.col-lg-12.order-lg-1.order-xl-1 > div:nth-child(3) > div > h5").innerText = ` WHAT ARE YOU DOING HERE `;
        }
    };
})();
