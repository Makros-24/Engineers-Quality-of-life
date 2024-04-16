// ==UserScript==
// @name         TTL V2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  I want to go home!
// @author       You
// @match        https://intranet.proxym-group.net/home/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
// Define your work hours
const workHoursPerDay = 8; //TODO this must be dynamic

// Get the current worked time from the website
const workedTimeString = document.querySelector("#kt_content > div > div:nth-child(5) > div.col-xl-9.col-lg-12.order-lg-1.order-xl-1 > div:nth-child(3) > div > div.kt-ribbon__target > i > span").innerText;
debugger;
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

// Create and style the leave time box
const leaveTimeBox = document.createElement('div');
leaveTimeBox.id = 'leave-time-box';
leaveTimeBox.style.backgroundColor = '#f0f0f0';
leaveTimeBox.style.border = '1px solid #ccc';
leaveTimeBox.style.borderRadius = '5px';
leaveTimeBox.style.padding = '10px';
leaveTimeBox.style.marginTop = '20px';

if (leaveTime > now.getTime()) {
// Append the leave time box to the body of the page
document.querySelector("#kt_content > div > div:nth-child(5) > div.col-xl-9.col-lg-12.order-lg-1.order-xl-1 > div:nth-child(3) > div > h5").innerText=`YOU MUST LEAVE AT ${leaveHours}:${leaveMinutes}:${leaveSeconds} `;
} else {
// Append the leave time box to the body of the page
document.querySelector("#kt_content > div > div:nth-child(5) > div.col-xl-9.col-lg-12.order-lg-1.order-xl-1 > div:nth-child(3) > div > h5").innerText=` WHAT ARE YOU DOING HERE `;
}


})();
