"use strict";
/*
*Цей модуль повертає довільне число з заданою конфігурацією. 
*Довжина числа задається в digit(з врахування крапки). 
*В fraction задається місце крапки.
*Щоб задати ціле число: randomDigit.start(1,2) або randomDigit.start(1,).
*Щоб задати дріб: randomDigit.start(3,2).
*В функції random() реалізована лінійна ймовірність появи чисел.
*/

let randomDigit = (function(){
	let init = function(digit, fraction){
		let rndDigit = main(digit, fraction);
		return rndDigit;
	};

	let main = function(digit, fraction){
		let number = '';
		let randomNum = '';
		for(let i = 1; i <= digit; i++){
			if(i === fraction && i === 1){
				number += "0.";
			}else if(i === fraction && i === digit){
				number += ".0";
			}else if(i === fraction){
				number += ".";
			}else{
				if(i===1){
					while(randomNum === '0' || randomNum === ''){
						randomNum = random();
					};
				}else{
					randomNum = random();
				};
				number += randomNum;
			};
		};
		return number;
	};

	let random = function(){
		const MIN_MAX_DIGIT = 9;
		const INDEX_RANDOM_DIGIT = 2;
		let nember = Math.random() * MIN_MAX_DIGIT;
		let milliseconds = getTime();
		let digit = nember * milliseconds;
		let arr = ('' + digit).split('');
		let random = arr[arr.length - INDEX_RANDOM_DIGIT];
		return random;
	};

	let getTime = function(){
		let date = new Date;
		return date.getMilliseconds();
	};
	return {
		start: function(digit, fraction){
			return init(digit, fraction);
		}
	}
})();