"use strict";

let inputValues = [];

let readline = require('readline');
let rli = readline.createInterface(process.stdin, process.stdout);

rli.setPrompt('Enter first color (in HEX format)> ');
rli.prompt();
rli.on('line', line => {
	
	inputValues.push(line);
	rli.setPrompt('Enter second color (in HEX format)> ');
	if(inputValues.length === 2)
	{
		rli.setPrompt('Enter percent> ');
	}
	if(inputValues.length === 3)
	{
		rli.close();
	}
	rli.prompt();
	
}).on('close', () => {
	
	let color1 = inputValues[0];
	let color2 = inputValues[1];
	let percent = inputValues[2] === "" ? 50 : parseInt(inputValues[2]);
		
	let color1MissingHash = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(color1);
	let color2MissingHash = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(color2);

	if(color1MissingHash)
	{
		color1 = "#" + color1;
	}
	if(color2MissingHash)
	{
		color2 = "#" + color2;
	}

	let isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color1) &&
				/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color2) &&
				percent >= 0 && percent <= 100;
				
	if(!isOk)
	{
		console.log("\nProvided colors are in wrong format. Please try again.\n");
		process.exit(1);
	}
	
	function sliceColor(color, part){
		if(color.length === 7)
		{
			switch(part){
				case "red":
					return color.substr(1, 2);
					break;
				case "green":	
					return color.substr(3, 2);
					break;
				case "blue":
					return color.substr(5, 2);
			}
		}
		else if(color.length === 4)
		{
			switch(part){
				case "red":
					return color.substr(1, 1) + color.substr(1, 1);
					break;
				case "green":	
					return color.substr(2, 1) + color.substr(2, 1);
					break;
				case "blue":
					return color.substr(3, 1) + color.substr(3, 1);
			}
		}
	}
	
	let color1Red, color1Green, color1Blue,
		color2Red, color2Green, color2Blue,
		red, green, blue,
		redHEX, greenHEX, blueHEX,
		result;
		
	color1Red   = parseInt(sliceColor(color1, "red"), 16);
	color1Green = parseInt(sliceColor(color1, "green"), 16);
	color1Blue  = parseInt(sliceColor(color1, "blue"), 16);
	
	color2Red   = parseInt(sliceColor(color2, "red"), 16);
	color2Green = parseInt(sliceColor(color2, "green"), 16);
	color2Blue  = parseInt(sliceColor(color2, "blue"), 16);
		
	red   = Math.floor( (color1Red   * percent / 100) + (color2Red   * (100 - percent) / 100) );
	green = Math.floor( (color1Green * percent / 100) + (color2Green * (100 - percent) / 100) );
	blue  = Math.floor( (color1Blue  * percent / 100) + (color2Blue  * (100 - percent) / 100) );
		
	redHEX   = red.toString(16).toUpperCase();
	greenHEX = green.toString(16).toUpperCase();
	blueHEX  = blue.toString(16).toUpperCase();
		
	function makeTwoDigits(color){
		if(color.length === 2)
		{
			return color;
		}
		else if(color.length === 1)
		{
			return "0"+color;
		}
	}
	
	result = "#" + makeTwoDigits(redHEX) + makeTwoDigits(greenHEX) + makeTwoDigits(blueHEX);
	
	console.log(`\nResult is: ${result}`);
	console.log(`\nIt contains ${percent}% of color ${color1} and ${100 - percent}% of color ${color2}\n`);
	
	process.exit(0);
});