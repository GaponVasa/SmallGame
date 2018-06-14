"use strict";
let mathOperation = (function () {
	let ID,
		eventsIdEl, hundreds, dozens, units, coma, tenth, hundredth, arrBtn,
		addBtn, subBtn, mixBtn, signBtn, timeBtn, startBtn, clickStartBtn = false,
		firstDigitDiv, operationDiv, secondDigitDiv, resultInput, checkBtn, wraperTimer, spanTime, wraperInputs, block,
		firstDigit, signOperation, currentSign, secondDigit, result, tryBtn,
		digit = 0, fraction = 0,
		tableResult, timeState = false, timer, seconds;
	const NUMBER_OF_REPETITION = 10,//кількість виразів які потрібно вирішити
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

	//функція обробки подіЇ click в залежності від нажатої кнопки
	let btnClick = function(event){
		let target = event.target;
		if(findTarget(target) && !clickStartBtn){
			addRedClassToBtn(target);
			exempleDigid();
		}else if(target === addBtn && !clickStartBtn){
			signOperation = '+';
			currentSign = '+'
			checkOneBtn(signBtn, addBtn);
		}else if(target === subBtn && !clickStartBtn){
			signOperation = '-';
			currentSign = '-';
			checkOneBtn(signBtn, subBtn);
		}else if(target === timeBtn && !clickStartBtn){
			if(timeState){
				timeState = false;
				removeClass(timeBtn,['active']);
			}else{
				timeState = true;
				addClass([timeBtn],'active');
			};
		}else if(target === mixBtn && !clickStartBtn){
			signOperation = '+/-';
			checkOneBtn(signBtn, mixBtn);
		}else if(target === startBtn && !clickStartBtn){
			findDigitAndFraction(arrBtn);
			if(digit !== 0 && signOperation !== undefined){
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
		};
	};

	//функція яка визначає чи належить target(нажата кнопка) до arrBtn(кнопки вибору типу числа)
	let findTarget = function(target){
		let arr = Array.prototype.slice.call(arrBtn);
		if(arr.includes(target)){return true};
	};
	
	//функція яка добавляє клас CLASS_RED до нажатої кнопки вибору типу числа
	let addRedClassToBtn = function(target){
		if(target === hundreds || target === dozens || target === units){
			if(target === hundreds){
				addClass([hundreds, dozens, units], CLASS_RED);
			};
			if(target === dozens){
				addClass([dozens, units], CLASS_RED);
			};
			if(target === units){
				addClass([units], CLASS_RED);
			};
		}else if(target === tenth || target === hundredth){
			if(target === tenth){
				addClass([tenth, coma], CLASS_RED);
			};
			if(target === hundredth){
				addClass([hundredth, tenth, coma], CLASS_RED);
			};
		};
	};

	//Добавляємо число яке ми вибираємо в <span id="digitExemple"> для візуального ефекту
	let exempleDigid = function(){
		let digitExemple;
		let digitExempleElement = document.getElementById('digitExemple');
		findDigitAndFraction(arrBtn);
		digitExemple = parseFloat(randomDigit.start(digit, fraction));
		digitExempleElement.innerHTML = digitExemple;
	}

	/*
	*функція визначає digit і fraction(вони потрібні для генерації числа)
	*перебираючи кожний елемент псевдомасиву arrBtn і шукаючи елементи з 
	*класом CLASS_RED
	*/
	let findDigitAndFraction = function(pseudoArr){
		let arr = Array.prototype.slice.call(pseudoArr);
		let count = 0;
		arr.forEach((el, ind) =>{
			if(el.classList.contains(CLASS_RED)){
				count++;
				if(el.name === 'coma'){
					fraction = count;
				};
				digit = count;
			};
		});
	};

	//функція яка шукає який input вибраний та повертає його value.
	//потрібна для визначення кількості секунд
	let findValueSeconds = function(){
		let inputs = ID.querySelectorAll('input[name=time]');
		let arr = Array.prototype.slice.call(inputs);
		let seconds;
		arr.forEach(el =>{
			if(el.checked){seconds =el.value};
		});
		return seconds;
	};

	//основна функція запуску
	let start = function(){
		seconds = findValueSeconds();
		firstDigit = parseFloat(randomDigit.start(digit, fraction));
		secondDigit = parseFloat(randomDigit.start(digit, fraction));
		removeClass(resultInput, [CLASS_RED, CLASS_GREEN]);
		addClass([resultInput], CLASS_BLACK);
		resultInput.value = '';
		firstDigitDiv.innerHTML = firstDigit;
		secondDigitDiv.innerHTML = secondDigit;
		if(signOperation === '+/-'){
			currentSign = findSign(signOperation);
			operationDiv.innerHTML = currentSign;
			result = parseFloat(mathOperationAddAndSub.start(firstDigit, secondDigit, currentSign));
		}else{
			operationDiv.innerHTML = signOperation;
			result = parseFloat(mathOperationAddAndSub.start(firstDigit, secondDigit, signOperation));
		};
		if(timeState){ 
			seconds = findValueSeconds();
			setTime();
		};
	};

	//добавляємо до елементів в масиві клас
	let addClass = function(arr, className){
		arr.forEach(el =>{
			if(!el.classList.contains(className)){
				el.classList.add(className);
			};
		});
	};

	//видаляємо з елементу перелік класів в масиві
	let removeClass = function(elementNode, arr){
		arr.forEach(el =>{
			if(elementNode.classList.contains(el)){
				elementNode.classList.remove(el);
			};
		});
	};

	//функція яка створює елементи для відображення порядкового номеру виразу
	let createInputs = function(targetEl, quantity){
		let inputs = '';
		for(let i = 1; i <= quantity; i++){
			if(i === 1){
				inputs += `<label><input type="radio" name="${i}" class="inpt ${BORDER_BLUE} mr-2" disabled>${i}</label>`;
			}else{
				inputs += `<label><input type="radio" name="${i}" class="inpt ${BORDER_GRAY} mr-2" disabled>${i}</label>`;
			};
		};
		targetEl.innerHTML = inputs; 
	};

	//Функція яка довільно визначає який буде знак + або -
	let findSign = function(sign){
		let rndDigit = parseInt(randomDigit.start(1, ));
		if(rndDigit > 5){
			return '+';
		}else{
			return '-';
		};
	};

	//Добавляємо або видаляємо клас 'active' у елементу targetEl
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

	//перевіряємо введене число і заносимо дані в таблицю
	let checkResult = function(){
		let value = parseFloat(resultInput.value);
		let arrInputs = Array.prototype.slice.call(wraperInputs.querySelectorAll('input[type=radio]'));
		let index = checkArray(arrInputs);
		clearInterval(timer);
		if(typeof index === 'string'){
			arrInputs[parseInt(index)].checked = true;
			addRemoveClasses(value, arrInputs[parseInt(index)]);
			addInfoToTable(value, index);
			moduleSlideToggler.toggleWithDelay(block, 500);
			moduleSlideToggler.toggleWithDelay(tableResult, 700);
			timeState = false;
			wraperTimer.innerHTML = '';
		}else{
			arrInputs[index].checked = true;
			addRemoveClasses(value, arrInputs[index]);
			addInfoToTable(value, index);
			start();
		};
		resultInput.focus();
	};

	//правила роботи з класами під час визначення вірно/невірно виконано завдання
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
			removeClass(element.parentNode.nextSibling.firstChild, [BORDER_GRAY]);
			addClass([element.parentNode.nextSibling.firstChild], BORDER_BLUE);
		};
	};

	//шукаємо індекс елементу з яким на даний час працюємо
	let checkArray = function(arr){
		let findIndex;
		let length = arr.length;
		arr.some((el, ind) =>{
			if(el.checked === false && findIndex === undefined){
				if(ind === length - 1){
					findIndex = '' + ind;
					return;
				}else{
					findIndex = ind;
					return;
				};
			};
		});
		return findIndex;
	};

	//Добавляємо до таблиці результатів дані
	let addInfoToTable = function(value, index){
		let table = tableResult.firstElementChild;
		let tbody = table.querySelector('tbody');
		let row, backgroundColor;
		(value === result) ? backgroundColor = 'backgroundGreen' : backgroundColor = 'backgroundRed';
		if(isNaN(value)){value = '-'}; 
		row = `<tr><td scope="row">${parseInt(index)+1}</td>
			<td>${firstDigit}</td>
			<td>${currentSign}</td>
			<td>${secondDigit}</td>
			<td> = </td>
			<td class="${backgroundColor}">${value}</td>
			<td>${result}</td></tr>`;
		tbody.innerHTML += row;
	};

	//Скидаємо всі налаштування, та приводимо програму до початкового стану 
	let repeat = function(){
		let arr = Array.prototype.slice.call(arrBtn);
		let table = tableResult.firstElementChild;
		let tbody = table.querySelector('tbody');
		wraperTimer.innerHTML = '';
		clearInterval(timer);
		digit = 0;
		fraction = 0;
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

	//встановлюємо відлік часу в секундах
	let setTime = function(){
		wraperTimer.innerHTML = `<div>TIME:<span>${seconds}</span></div>`
		spanTime = wraperTimer.querySelector('span');
		timer = setInterval(timeRule,1000);
	};

	//Лічільник секунд і якщо лічильник доходить до 0, перевіряємо дію оператору(він ввів дані і вони вірні)
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
