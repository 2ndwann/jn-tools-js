/**
    Jehvnar Date Calculation Tool
    Copyright (C) 2023  <w_yu#0742>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
**/


const jehvnarEpoch = 1590883200000; // The Jehvnar epoch

let timeOffset = 0; // Ingame time offset in milliseconds

/**
 * Get Unix time in milliseconds.
 * */
let getUnixTime = () => {
	return unixTimeNow = Date.now();
}

/**
 * Get Jehvnar time since Jehvnar Epoch in milliseconds.
 * */
let getJehvnarTime = (timeOffset = 0) => {
	return getUnixTime() - jehvnarEpoch + timeOffset; // Derive Jehvnar millisecond time
}

/**
 * Get the elapsed time between Unix epoch and the start of 00:00 GMT+0 of today in milliseconds.
 * */
let getTodayUTC = () => {
	let todayDate = new Date().getUTCDate(); 
	let todayMonth = new Date().getUTCMonth() + 1; 
	let todayYear = new Date().getUTCFullYear(); 
	let today = new Date(String(todayYear) + '-' + String(todayMonth).padStart(2, '0') + '-' + String(todayDate).padStart(2, '0') + 'T00:00:00-00:00'); // Get today when it started at GMT 00:00
	
	today = today.getTime();
  
	return today;
}

/**
 * Get numerical year.
 * */
let getYear = (jehvnarTime = getJehvnarTime()) => {
	return Math.round(jehvnarTime / 86400000);
}

/**
 * Get days elapsed for numerical year.
 * */
let getDaysElapsed = (jehvnarTime = getJehvnarTime()) => {	
	let timeElapsedForToday = getUnixTime() - getTodayUTC();
	
	timeElapsedForToday = timeElapsedForToday / 1200000 // to minecraft days
	
	return Math.abs(Math.round(timeElapsedForToday));

}

/**
 * Get month of numerical year.
 * */
let getMonth = (jehvnarTime = getJehvnarTime(), monthsInAYear = 4) => {
	if ((monthsInAYear < 3) || (monthsInAYear > 4)) {
		console.error('monthsInAYear arguement must be either integers 3 or 4');
		return;
	}

	let timeElapsedForToday = getUnixTime() - getTodayUTC();
	
	timeElapsedForToday = timeElapsedForToday / 60000 // to minutes
	timeElapsedForToday = timeElapsedForToday / 20 // to minecraft days
	
	let daysElapsedThisYear = timeElapsedForToday;
	let month;
	
	// basically 
	if (monthsInAYear == 4) { // For 4-month calendar
		if (daysElapsedThisYear > 0 && daysElapsedThisYear <= 18) { month = 1; }
		if (daysElapsedThisYear > 18 && daysElapsedThisYear <= 36) { month = 2; }
		if (daysElapsedThisYear > 36 && daysElapsedThisYear <= 54) { month = 3; }
		if (daysElapsedThisYear > 54 && daysElapsedThisYear <= 72) { month = 4; }
	} else if (monthsInAYear == 3) {
		if (daysElapsedThisYear > 0 && daysElapsedThisYear <= 24) { month = 1; }
		if (daysElapsedThisYear > 24 && daysElapsedThisYear <= 48) { month = 2; }
		if (daysElapsedThisYear > 48 && daysElapsedThisYear <= 72) { month = 3; }
	}
	
	return month;
}

/**
 * Get day of numerical year.
 * */
let getDay = (jehvnarTime = getJehvnarTime(), monthsInAYear = 4, daysInAYear = 72) => {
	if ((monthsInAYear < 3) || (monthsInAYear > 4)) {
		console.error('monthsInAYear arguement must be either integers 3 or 4');
		return;
	}

	let timeElapsedForToday = getUnixTime() - getTodayUTC();
	
	timeElapsedForToday = timeElapsedForToday / 60000 // to minutes
	timeElapsedForToday = timeElapsedForToday / 20 // to minecraft days
	
	let daysElapsedThisYear = timeElapsedForToday;
	
	let month = getMonth(getJehvnarTime());
	
	// get how many days elapsed since this month
	let day;
	day = (daysInAYear / monthsInAYear) - ((month * (daysInAYear / monthsInAYear)) - daysElapsedThisYear);
	
	return Math.abs(Math.round(day));
}

/**
 * Get season (Winter, Spring, Summer, Fall) of numerical year.
 * */
let getSeason = () => {
	let timeElapsedForToday = getUnixTime() - getTodayUTC();
	
	timeElapsedForToday = timeElapsedForToday / 60000 // to minutes
	timeElapsedForToday = timeElapsedForToday / 20 // to minecraft days
	
	let daysElapsedThisYear = timeElapsedForToday;
	let month;
	
	// (Fixed to 4-month year due to season derivation purposes)
	if (daysElapsedThisYear > 0 && daysElapsedThisYear <= 18) { month = 1; }
	if (daysElapsedThisYear > 18 && daysElapsedThisYear <= 36) { month = 2; }
	if (daysElapsedThisYear > 36 && daysElapsedThisYear <= 54) { month = 3; }
	if (daysElapsedThisYear > 54 && daysElapsedThisYear <= 72) { month = 4; }
	
	if (month == 1) { return "Winter"; }
	if (month == 2) { return "Spring"; }
	if (month == 3) { return "Summer"; }
	if (month == 4) { return "Fall"; }
}