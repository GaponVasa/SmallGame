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
		//console.log('-------------------------------------------');
		let rndDigit = main(digit, fraction);
		//console.log('randomDigit  rndDigit =',rndDigit);
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
					//console.log('randomDigit main()  while randomNum =', randomNum);
				}else{
					randomNum = random();
				};
				number += randomNum;
			};
			//console.log('randomDigit main() number =', number, 'i =', i);
		};
		return number;
	};

	let random = function(){
		const MIN_MAX_DIGIT = 9;
		const INDEX_RANDOM_DIGIT = 2;
		let nember = Math.random() * MIN_MAX_DIGIT;
		//console.log('randomDigit random()  nember =',nember);
		let milliseconds = getTime();
		let digit = nember * milliseconds;
		//console.log('randomDigit random()  digit =',digit);
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


// (function(){
// 	let table = [
// 		{
// 			number:1,
// 			cilcist:0
// 		},
// 		{
// 			number:2,
// 			cilcist:0
// 		},
// 		{
// 			number:3,
// 			cilcist:0
// 		},
// 		{
// 			number:4,
// 			cilcist:0
// 		},
// 		{
// 			number:5,
// 			cilcist:0
// 		},
// 		{
// 			number:6,
// 			cilcist:0
// 		},
// 		{
// 			number:7,
// 			cilcist:0
// 		},
// 		{
// 			number:8,
// 			cilcist:0
// 		},
// 		{
// 			number:9,
// 			cilcist:0
// 		}
// 	];
// 	let rndDigit;
// 	for(let i = 1; i <= 1000; i++){
// 		rndDigit = randomDigit.start(1,2);
// 		table.some(el =>{
// 			if(el.number == rndDigit){
// 				el.cilcist++;
// 			}
// 		})
// 	};
// 	console.table(table);
// })();