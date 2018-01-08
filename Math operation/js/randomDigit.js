"use strict";
//digit скільки всього чисел з врахування крапки
//fraction місце крапки 
let randomDigit = (function(){
	let init = function(digit, fraction){
		let rndDigit = main(digit, fraction);
		//console.log(min, max, digit, fraction);
		console.log(rndDigit);
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
					//console.log('while randomNum =', randomNum);
				}else{
					randomNum = random();
				};
				number += randomNum;
			};
			//console.log('number =', number, 'i =', i);
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
		//let arr = ('' + (Math.random() * MIN_MAX_DIGIT * getTime())).split('');
		let random = arr[arr.length - INDEX_RANDOM_DIGIT];
		//console.log('random', random);
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

// randomDigit.start(4,5);
// randomDigit.start(4,5);
// randomDigit.start(4,5);
// randomDigit.start(4,5);
// randomDigit.start(4,5);
// randomDigit.start(4,5);
// randomDigit.start(4,5);
//randomDigit.start(1,2);