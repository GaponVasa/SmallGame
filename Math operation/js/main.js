"use strict";

let mathOperation = (function () {
	let ID,
		eventsIdEl, hundreds, dozens, units, coma, tenth, hundredth, arrBtn,
		addBtn, subBtn, mixBtn, startBtn,
		firstDigitDiv, operationDiv, secondDigitDiv, resultInput, checkBtn, wraperInputs, block,
		firstDigit, signOperation, secondDigit, result,
		digit = 0, fraction = 0,
		tableResult;
	const NUMBER_OF_REPETITION = 10,
		CLASS_GREEN = 'win',
		CLASS_RED = 'active',
		CLASS_BLACK = 'black',
		BORDER_GRAY = 'borderGrey',
		BORDER_RED = 'borderRed',
		BORDER_GREEN = 'borderGreen',
		BORDER_BLUE = 'borderBlue';

	let init = function(id){
		ID = id;
		addBtn = ID.querySelector('button[name="add"]');
		subBtn = ID.querySelector('button[name="sub"]');
		mixBtn = ID.querySelector('button[name="mix"]');
		startBtn = ID.querySelector('button[name="start"]');
		
		wraperInputs = ID.querySelector('div.wraperInputs');
		firstDigitDiv = ID.querySelector('div.firstDigit');
		operationDiv = ID.querySelector('div.operation');
		secondDigitDiv = ID.querySelector('div.secondDigit');
		resultInput = ID.querySelector('input.result');
		checkBtn = ID.querySelector('.btn[name=check]');
				
		block = ID.querySelector('.block');
		hundreds = ID.querySelector('.btn[name=hundreds]');
		dozens = ID.querySelector('.btn[name=dozens]');
		units = ID.querySelector('.btn[name=units]');
		coma = ID.querySelector('.btn[name=coma]');
		tenth = ID.querySelector('.btn[name=tenth]');
		hundredth = ID.querySelector('.btn[name=hundredth]');
		arrBtn = ID.querySelectorAll('.digitImage .btn');

		tableResult = ID.querySelector('.tableResult');
		
		eventsIdEl = ID.addEventListener('click', btnClick, true);
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
			//console.log('signOperation =', signOperation);
			//console.log('digit =', digit);
			//console.log('btnClick() startBtn');
			if(digit !== 0 && signOperation !== undefined){
				//console.log('btnClick() startBtn');
				start();
				createInputs(wraperInputs, NUMBER_OF_REPETITION);
				moduleSlideToggler.immediatelyToggle(block);
				resultInput.focus();
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
		console.log(resultInput);
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
			//console.log('elementNode =', elementNode);
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
			if(i === 1){
				inputs += `<label><input type="radio" name="${i}" class="inpt ${BORDER_BLUE}" disabled>${i}</label>`;
			}else{
				inputs += `<label><input type="radio" name="${i}" class="inpt ${BORDER_GRAY}" disabled>${i}</label>`;
			}
			
		};
		//console.log('inputs =', inputs);
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
			console.log('checkResult() if');
			arrInputs[parseInt(index)].checked = true;
			addRemoveClasses(value, arrInputs[parseInt(index)]);
			addInfoToTable(value, index);
			moduleSlideToggler.toggleWithDelay(block, 500);
			moduleSlideToggler.toggleWithDelay(tableResult, 700);
		}else{
			console.log('checkResult() else');
			arrInputs[index].checked = true;
			addRemoveClasses(value, arrInputs[index]);
			addInfoToTable(value, index);
			start();
		};
		resultInput.focus();
	};

	let addRemoveClasses = function(value, element){
		if(value === result){
			removeClass(element, [BORDER_GRAY, BORDER_BLUE]);
			addClass([element], BORDER_GREEN);
			removeClass(resultInput, [CLASS_BLACK, CLASS_RED]);
			addClass([resultInput], CLASS_GREEN);
		}else{
			removeClass(element, [BORDER_GRAY, BORDER_BLUE]);
			addClass([element], BORDER_RED);
			removeClass(resultInput, [CLASS_BLACK, CLASS_GREEN]);
			addClass([resultInput], CLASS_RED);
		};
		if(element.parentElement.nextElementSibling != null){
			console.log('element.parentElement.nextElementSibling.firstElementChild =',element.parentElement.nextElementSibling.firstElementChild);
			removeClass(element.parentNode.nextSibling.firstChild, [BORDER_GRAY]);
			addClass([element.parentNode.nextSibling.firstChild], BORDER_BLUE);
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

	let addInfoToTable = function(value, index){
		let table = tableResult.firstElementChild;
		let tbody = table.querySelector('tbody');
		let row, backgroundColor;
		(value === result) ? backgroundColor = 'backgroundGreen' : backgroundColor = 'backgroundRed';
		console.log('isNaN(value) =',isNaN(value))
		if(isNaN(value)){value = '-'}; 
		row = `<td>${parseInt(index)+1}</td>
			<td>${firstDigit}</td>
			<td>${signOperation}</td>
			<td>${secondDigit}</td>
			<td> = </td>
			<td class="${backgroundColor}">${value}</td>
			<td>${result}</td>`;
		tbody.innerHTML += row;
	};

	return {
		start: function(id){
			return init(id);
		}
	}
})();

mathOperation.start(document.getElementById('startGameMathOperation'));