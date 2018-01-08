"use strict";

let mathOperation = (function () {
	let addBtn, subBtn, startBtn, firstDigitDiv, operationDiv, secondDigitDiv, resultInput, checkBtn;
	let hundreds, dozens, units, coma, tenth, hundredth, arrBtn;
	let firstDigit, signOperation, secondDigit, result;
	let digit = 0, fraction = 0;
	let init = function(id){
		addBtn = id.querySelector('button[name="add"]');
		subBtn = id.querySelector('button[name="sub"]');
		startBtn = id.querySelector('button[name="start"]');
		firstDigitDiv = id.querySelector('div.firstDigit');
		operationDiv = id.querySelector('div.operation');
		secondDigitDiv = id.querySelector('div.secondDigit');
		resultInput = id.querySelector('input.result');
		checkBtn = id.querySelector('.btn[name=check]');
		hundreds = id.querySelector('.btn[name=hundreds]');
		dozens = id.querySelector('.btn[name=dozens]');
		units = id.querySelector('.btn[name=units]');
		coma = id.querySelector('.btn[name=coma]');
		tenth = id.querySelector('.btn[name=tenth]');
		hundredth = id.querySelector('.btn[name=hundredth]');
		arrBtn = id.querySelectorAll('.digitImage .btn');
		
		id.addEventListener('click', btnClick, true);
	};

	let btnClick = function(event){
		let target = event.target;
		if(findTarget(target)){
			console.log('btnClick() target.name',target.name);
			checkBtnDigit(target);
		}else if(target === addBtn){
			console.log('btnClick() addBtn');
			signOperation = '+';
			addClassActive([addBtn],'active');
		}else if(target === subBtn){
			console.log('btnClick() subBtn');
			addClassActive([subBtn],'active');
			signOperation = '-';
		}else if(target === startBtn){
			//console.log('signOperation =', signOperation)
			console.log('btnClick() startBtn');
			addDigit(firstDigitDiv, firstDigit);
			addOperation(signOperation);
			addDigit(secondDigitDiv, secondDigit);
			result = parseFloat(mathOperationAddAndSub.start(firstDigit, secondDigit, signOperation));
			console.log('btnClick() result =', result)
		}else if(target === checkBtn){
			checkResult();
		}
		// else if(target === dozens){
		// 	console.log('dozens');
		// }else if(target === units){
		// 	console.log('units');
		// }else if(target === coma){
		// 	console.log('coma');
		// }else if(target === tenth){
		// 	console.log('tenth');
		// }else if(target === hundredth){
		// 	console.log('hundredth');
		// }
	};

	let findTarget = function(target){
		let arr = Array.prototype.slice.call(arrBtn);
		if(arr.includes(target)){return true};
	};
	
	let checkBtnDigit = function(target){
		if(target === hundreds || target === dozens || target === units){
			if(target === hundreds){
				addClassActive([hundreds, dozens, units],'active');
				digit = 3;
			};
			if(target === dozens){
				addClassActive([dozens, units],'active');
				digit = 2;
			};
			if(target === units){
				addClassActive([units],'active');
				digit = 1;
			};
		}else if(target === tenth || target === hundredth){
			
			if(target === tenth){
				addClassActive([tenth, coma, units],'active');
				if(fraction === 0 && digit === 0){
					fraction = 2;
					digit = 3;
				}else{
					fraction = digit + 1;
					digit += 2;
				};
			};
			if(target === hundredth){
				addClassActive([hundredth, tenth, coma, units],'active');
				if(fraction === 0 && digit === 0){
					fraction = 2;
					digit = 4;
				}else{
					fraction = digit + 1;
					digit += 3;
				};
			};
		};
		console.log('digit =', digit);
		console.log('fraction =', fraction);
		firstDigit = parseFloat(randomDigit.start(digit, fraction));
		secondDigit = parseFloat(randomDigit.start(digit, fraction));
		console.log('firstDigit =', firstDigit);
		console.log('secondDigit =', secondDigit);
	};

	let addClassActive = function(arr, className){
		arr.forEach(el =>{
			if(!el.classList.contains(className)){
				el.classList.add(className);
			};
		});
	};

	let addOperation = function(signOperation){
		operationDiv.innerHTML = signOperation;
	};

	let addDigit = function(element, addDigit){
		element.innerHTML = addDigit;
	};

	let checkResult = function(){
		let value = parseFloat(resultInput.value);
		console.log('typeof value =',typeof value);
		console.log('typeof result =',typeof result);
		if(value === result){
			resultInput.classList.add('win');
		}else{
			resultInput.classList.add('active');
		}
	};

	return {
		start: function(id){
			return init(id);
		}
	}
})();

mathOperation.start(document.getElementById('startGameMathOperation'));