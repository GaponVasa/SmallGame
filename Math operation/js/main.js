"use strict";

let mathOperation = (function () {
	let hundreds, dozens, units, coma, tenth, hundredth, arrBtn;
	let addBtn, subBtn, mixBtn, startBtn;
	let firstDigitDiv, operationDiv, secondDigitDiv, resultInput, checkBtn, wraperInputs;
	let firstDigit, signOperation, secondDigit, result;
	let digit = 0, fraction = 0;
	const NUMBER_OF_REPETITION = 10;
	const CLASS_GREEN = 'win';
	const CLASS_RED = 'active';
	const CLASS_BLACK = 'black';
	const BORDER_GRAY = 'borderGrey';
	const BORDER_RED = 'borderRed';
	const BORDER_GREEN = 'borderGreen';
	let init = function(id){
		addBtn = id.querySelector('button[name="add"]');
		subBtn = id.querySelector('button[name="sub"]');
		mixBtn = id.querySelector('button[name="mix"]');
		startBtn = id.querySelector('button[name="start"]');
		firstDigitDiv = id.querySelector('div.firstDigit');
		operationDiv = id.querySelector('div.operation');
		secondDigitDiv = id.querySelector('div.secondDigit');
		wraperInputs = id.querySelector('div.wraperInputs');
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
			//console.log('btnClick() target.name',target.name);
			checkBtnDigit(target);
		}else if(target === addBtn){
			//console.log('btnClick() addBtn');
			signOperation = '+';
			addClass([addBtn],'active');
		}else if(target === subBtn){
			//console.log('btnClick() subBtn');
			addClass([subBtn],'active');
			signOperation = '-';
		}else if(target === startBtn){
			//console.log('signOperation =', signOperation)
			//console.log('btnClick() startBtn');
			if(digit !== 0 && signOperation !== undefined){
				start();
				createInputs(wraperInputs, NUMBER_OF_REPETITION);
			};
		}else if(target === checkBtn){
			checkResult();
		}
	};

	let findTarget = function(target){
		let arr = Array.prototype.slice.call(arrBtn);
		if(arr.includes(target)){return true};
	};
	
	let checkBtnDigit = function(target){
		if(target === hundreds || target === dozens || target === units){
			if(target === hundreds){
				addClass([hundreds, dozens, units], CLASS_RED);
				digit = 3;
			};
			if(target === dozens){
				addClass([dozens, units], CLASS_RED);
				digit = 2;
			};
			if(target === units){
				addClass([units], CLASS_RED);
				digit = 1;
			};
		}else if(target === tenth || target === hundredth){
			
			if(target === tenth){
				addClass([tenth, coma, units], CLASS_RED);
				if(fraction === 0 && digit === 0){
					fraction = 2;
					digit = 3;
				}else{
					fraction = digit + 1;
					digit += 2;
				};
			};
			if(target === hundredth){
				addClass([hundredth, tenth, coma, units], CLASS_RED);
				if(fraction === 0 && digit === 0){
					fraction = 2;
					digit = 4;
				}else{
					fraction = digit + 1;
					digit += 3;
				};
			};
		};
		// console.log('digit =', digit);
		// console.log('fraction =', fraction);
	};

	let start = function(){
		// console.log('digit =', digit);
		// console.log('signOperation =', signOperation);
		
			firstDigit = parseFloat(randomDigit.start(digit, fraction));
			secondDigit = parseFloat(randomDigit.start(digit, fraction));
			removeClass(resultInput, [CLASS_RED, CLASS_GREEN]);
			addClass([resultInput], CLASS_BLACK);
			clearValue(resultInput);
			
			addDigit(firstDigitDiv, firstDigit);
			addOperation(signOperation);
			addDigit(secondDigitDiv, secondDigit);
			result = parseFloat(mathOperationAddAndSub.start(firstDigit, secondDigit, signOperation));

			console.log('firstDigit =', firstDigit);
			console.log('secondDigit =', secondDigit);
			console.log('btnClick() result =', result)

		
	}

	let addClass = function(arr, className){
		arr.forEach(el =>{
			if(!el.classList.contains(className)){
				el.classList.add(className);
			};
		});
	};

	let removeClass = function(elementNode, arr){
		arr.forEach(el =>{
			if(elementNode.classList.contains(el)){
				elementNode.classList.remove(el);
			};
		});
	};

	let clearValue = function(el){
		el.value = '';
	};

	let createInputs = function(targetEl, quantity){
		let inputs = '';
		for(let i = 1; i <= quantity; i++){
			// if(i <= 8){
			// 	inputs += `<label><input type="radio" name="${i}" class="inpt borderGrey" checked disabled>${i}</label>`;
			// }else{
				inputs += `<label><input type="radio" name="${i}" class="inpt borderGrey" disabled>${i}</label>`;
			//}
			
		};
		targetEl.innerHTML = inputs; 
	}

	let addOperation = function(signOperation){
		operationDiv.innerHTML = signOperation;
	};

	let addDigit = function(element, addDigit){
		element.innerHTML = addDigit;
	};

	let checkResult = function(){
		let value = parseFloat(resultInput.value);
		let arrInputs = Array.prototype.slice.call(wraperInputs.querySelectorAll('input[type=radio]'));
		//console.log('checkResult() arrInputs =', arrInputs);
		let index = checkArray(arrInputs);
		console.log('checkResult() index =', index);
		if(typeof index === 'string'){
			arrInputs[parseInt(index)].checked = true;
			addRemoveClasses(value, arrInputs[parseInt(index)]);
		}else{
			arrInputs[index].checked = true;
			addRemoveClasses(value, arrInputs[index]);
			start();
		};
		
	};

	let addRemoveClasses = function(value, element){
		if(value === result){
			removeClass(element, [BORDER_GRAY]);
			addClass([element], BORDER_GREEN);
			removeClass(resultInput, [CLASS_BLACK, CLASS_RED]);
			addClass([resultInput], CLASS_GREEN);
		}else{
			removeClass(element, [BORDER_GRAY]);
			addClass([element], BORDER_RED);
			removeClass(resultInput, [CLASS_BLACK, CLASS_GREEN]);
			addClass([resultInput], CLASS_RED);
		};
	}

	let checkArray = function(arr){
		let findIndex;
		let length = arr.length;
		arr.some((el, ind) =>{
			//console.log('ind =', ind)
			//console.log('el.checked =', el.checked)
			if(el.checked === false && findIndex === undefined){
				if(ind === length - 1){
					//console.log('el.checked === FALSE && ind === length - 1')
					findIndex = '' + ind;
					return;
				}else{
					//console.log('el.checked === FALSE')
					findIndex = ind;
					return;
				};
			};
		});
		return findIndex;
	};

	return {
		start: function(id){
			return init(id);
		}
	}
})();

mathOperation.start(document.getElementById('startGameMathOperation'));