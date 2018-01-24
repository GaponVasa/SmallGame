"use strict";
let mathOperation = (function () {
	let ID,
		eventsIdEl, hundreds, dozens, units, coma, tenth, hundredth, arrBtn,
		addBtn, subBtn, mixBtn, signBtn, timeBtn, startBtn, clickStartBtn = false,
		firstDigitDiv, operationDiv, secondDigitDiv, resultInput, checkBtn, wraperTimer, spanTime, wraperInputs, block,
		firstDigit, signOperation, secondDigit, result, tryBtn,
		digit = 0, fraction = 0,
		tableResult, timeState = false, timer, seconds;
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
		timeBtn = ID.querySelector('button[name="time"]');
		startBtn = ID.querySelector('button[name="start"]');
		signBtn = ID.querySelectorAll('.sign');
		
		wraperTimer = ID.querySelector('div.wraperTimer');
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
		tryBtn = ID.querySelector('.btn[name=try]');
		
		eventsIdEl = ID.addEventListener('click', btnClick, true);
	};

	let btnClick = function(event){
		let target = event.target;
		if(findTarget(target) && !clickStartBtn){
			//console.log('btnClick() target.name',target.name);
			checkBtnDigit(target);
		}else if(target === addBtn && !clickStartBtn){
			//console.log('btnClick() addBtn');
			signOperation = '+';
			checkOneBtn(signBtn, addBtn);
		}else if(target === subBtn && !clickStartBtn){
			//console.log('btnClick() subBtn');
			signOperation = '-';
			checkOneBtn(signBtn, subBtn);
		}else if(target === timeBtn && !clickStartBtn){
			//console.log('btnClick() subBtn');
			if(timeState){
				timeState = false;
				removeClass(timeBtn,['active']);
			}else{
				timeState = true;
				addClass([timeBtn],'active');
			};
		}else if(target === mixBtn && !clickStartBtn){
			//console.log('btnClick() addBtn');
			signOperation = '+/-';
			checkOneBtn(signBtn, mixBtn);
		}else if(target === startBtn && !clickStartBtn){
			//console.log('signOperation =', signOperation);
			//console.log('digit =', digit);
			//console.log('btnClick() startBtn');
			if(digit !== 0 && signOperation !== undefined){
				//console.log('btnClick() startBtn');
				clickStartBtn = true;
				start();
				createInputs(wraperInputs, NUMBER_OF_REPETITION);
				moduleSlideToggler.immediatelyToggle(block);
				resultInput.focus();
			};
		}else if(target === checkBtn){
			checkResult();
		}else if(target === tryBtn){
			repeat();
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
		let sign;
		seconds = 9;
		// console.log('digit =', digit);
		// console.log('signOperation =', signOperation);
		//console.log(resultInput);
		firstDigit = parseFloat(randomDigit.start(digit, fraction));
		secondDigit = parseFloat(randomDigit.start(digit, fraction));
		removeClass(resultInput, [CLASS_RED, CLASS_GREEN]);
		addClass([resultInput], CLASS_BLACK);
		clearValue(resultInput);
		addDigit(firstDigitDiv, firstDigit);
		addDigit(secondDigitDiv, secondDigit);
		if(signOperation === '+/-'){
			sign = findSign(signOperation);
			addOperation(sign);
			result = parseFloat(mathOperationAddAndSub.start(firstDigit, secondDigit, sign));
		}else{
			addOperation(signOperation);
			result = parseFloat(mathOperationAddAndSub.start(firstDigit, secondDigit, signOperation));
		};
		//console.log('start()   signOperation =', sign);
		if(timeState){ setTime()};
		
		console.log('start()  firstDigit =', firstDigit);
		console.log('start()  secondDigit =', secondDigit);
		console.log('start()  result =', result);
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

	let findSign = function(sign){
		let rndDigit = parseInt(randomDigit.start(1, ));
		//console.log('findSign()  rndDigit =', rndDigit);
		if(rndDigit > 5){
			console.log('findSign()  signOperation = +');
			return '+';
		}else{
			console.log('findSign()  signOperation = -');
			return '-';
		};
	};

	let checkOneBtn = function(targetArr, targetEl){
		let arr = Array.prototype.slice.call(targetArr);
		arr.forEach(el =>{
			if(el === targetEl){
				addClass([targetEl],'active');
			}else{
				removeClass(el,['active']);
			};
		});
	};

	let checkResult = function(){
		let value = parseFloat(resultInput.value);
		let arrInputs = Array.prototype.slice.call(wraperInputs.querySelectorAll('input[type=radio]'));
		//console.log('checkResult() arrInputs =', arrInputs);
		let index = checkArray(arrInputs);
		//console.log('checkResult() index =', index);
		clearInterval(timer);
		// setTimeout(function(){void 0}, 200);
		if(typeof index === 'string'){
			//console.log('checkResult() if');
			arrInputs[parseInt(index)].checked = true;
			addRemoveClasses(value, arrInputs[parseInt(index)]);
			addInfoToTable(value, index);
			moduleSlideToggler.toggleWithDelay(block, 500);
			moduleSlideToggler.toggleWithDelay(tableResult, 700);
			timeState = false;
			wraperTimer.innerHTML = '';
		}else{
			//console.log('checkResult() else');
			arrInputs[index].checked = true;
			addRemoveClasses(value, arrInputs[index]);
			addInfoToTable(value, index);
			setTimeout(start, 400);
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
			//console.log('element.parentElement.nextElementSibling.firstElementChild =',element.parentElement.nextElementSibling.firstElementChild);
			removeClass(element.parentNode.nextSibling.firstChild, [BORDER_GRAY]);
			addClass([element.parentNode.nextSibling.firstChild], BORDER_BLUE);
		};
	};

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
		// console.log('addInfoToTable() tbody');
		// console.log(tbody.rows);
		let row, backgroundColor;
		(value === result) ? backgroundColor = 'backgroundGreen' : backgroundColor = 'backgroundRed';
		//console.log('addInfoToTable()   isNaN(value) =',isNaN(value))
		if(isNaN(value)){value = '-'}; 
		//console.log('if inn');
		row = `<tr><td>${parseInt(index)+1}</td>
			<td>${firstDigit}</td>
			<td>${signOperation}</td>
			<td>${secondDigit}</td>
			<td> = </td>
			<td class="${backgroundColor}">${value}</td>
			<td>${result}</td></tr>`;
		tbody.innerHTML += row;
	};

	let repeat = function(){
		let arr = Array.prototype.slice.call(arrBtn);
		let table = tableResult.firstElementChild;
		let tbody = table.querySelector('tbody');
		wraperTimer.innerHTML = '';
		clearInterval(timer);
		timeState = false;
		clickStartBtn = false;
		signOperation = '';
		arr.forEach(el =>{
			removeClass(el,[CLASS_RED]);
		});
		checkOneBtn(signBtn, undefined);
		moduleSlideToggler.immediatelyToggle(tableResult);
		setTimeout(function(){tbody.innerHTML = '';}, 300);
	};

	let setTime = function(){
		wraperTimer.innerHTML = `<div>TIME:<span>${seconds}</span></div>`
		spanTime = wraperTimer.querySelector('span');
		timer = setInterval(timeRule,1000);
	};

	let timeRule = function(){
		if(seconds > 0){
			seconds--;
			spanTime.innerHTML = seconds;
		}else{
			spanTime.innerHTML = seconds;
			checkResult();
			clearInterval(timer);
		};
	};

	return {
		start: function(id){
			return init(id);
		}
	}
})();
let idStartGame = document.getElementById('startGameMathOperation');
mathOperation.start(idStartGame);
