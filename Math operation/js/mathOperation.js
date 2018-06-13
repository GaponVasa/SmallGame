"use strict";

/* 
* Модуль mathOperationAddAndSub приймає на вхід три параметри в вигляді string рядків
* 	1.)digit1 - перше число(десятковий дріб або ціле число з різним знаком);
* 	2.)digit2 - друге число(десятковий дріб або ціле число з різним знаком);
* 	3.)action - знак дії(додавання або віднімання);
* На виході число(десятковий дріб або ціле число з різним знаком) в вигляді string.
* Ціль написання даного модуля: є виправлення проблеми в JS з десятковими дробами коли 0.3 - 0.1 = 0.09999999999999998.
*/
let mathOperationAddAndSub = (function(){
	let point = (digit1, digit2, action) =>{
		const digA = parseFloat(digit1);
		const digB = parseFloat(digit2);
		const absA = Math.abs(digA);
		const absB = Math.abs(digB);
		let bigArr1 = absA.toString().split("");
		let bigArr2 = absB.toString().split("");
		let pointIndex1, pointIndex2, diff, result;
		let resultArr = [];
		/*
		* Додавання двох чисел в вигляді массивів з однаковим розташуванням крапки
		* і одинаковою кількістю елементів. Знаки в числах відсутні. 
		*/
		let addArr = (arr1, arr2, result) =>{
	        let add = 0;
	        let a, b, sum;
	        for(let i = 0, bigLength = arr1.length; i < bigLength; i++){
	        	if(arr1[i] !== "."){
		            a = parseInt(arr1[i]);
		            b = parseInt(arr2[i]);
		            sum = a + b + add;
		            if(sum > 9){
		                let tempArr = sum.toString().split("").reverse();
		                result.push(tempArr[0]);
		                add = parseInt(tempArr[1]);
		            }else{
		                result.push(sum.toString());
		                add = 0;
		            };
	        	}else{
	        		result.push(".");
	        	};
	        };
	        if(add > 0){
	            result.push(add.toString());
	        };
	    };

	    /*
		* Віднімання двох чисел в вигляді массивів з однаковим розташуванням крапки
		* і одинаковою кількістю елементів. Знаки в числах відсутні. 
		*/
	    let subArr = (arr1, arr2, result) =>{
	    	let a, b, sub, intermediate;
		    for(let i = 0, bigLength = arr1.length; i < bigLength; i++){
		    	if(arr1[i] !== "."){
		            a = parseInt(arr1[i]);
		            b = parseInt(arr2[i]);
		            sub = a - b;
		            if(sub < 0){
		                a = a + 10;
		                sub = a - b;
		                if(arr1[i + 1] === "."){
		                	intermediate = parseInt(arr1[i + 2]) - 1;
		                	arr1[i + 2] = intermediate;
		                }else{
		                	intermediate = parseInt(arr1[i + 1]) - 1;
		                	arr1[i + 1] = intermediate;
		                };
		                result.push(sub.toString());
		            }else{
		                result.push(sub.toString());
		            };
		    	}else{
		    		result.push(".");
		    	};
		    };
	    };

	    /*
		*Пошук індекса крапки pointIndex в числі(представлене в вигляді масиву arr). Додавання якщо такої немає.
	    */
	    let findPointIndex = (arr, pointIndex)=>{
			arr.some((el, ind, arr) => {
				if(el === "."){
					return pointIndex = ind;
				}else{
					if(ind === arr.length - 1){
						arr.push(".");
						arr.push("0");
						return pointIndex = arr.length - 2;
					};
				};
			});
			return pointIndex;
	    };

	    /*
		*В числах прибираємо крапку і нуль позаду числа. І нулі попереду.
	    */
	    let resizeArr = (arr) =>{
		    let flagRight = true;
		    let flagLeft = true;
		    let arrNew = [];
		    let length;
		    let signMinus = false;
		    //прибираємо знак числа з масиву
		    if(arr[0] === "-"){
		        signMinus = true;
		        arr.shift();
		    };
		    length = arr.length;
		    //Перебираємо ліву частину(цілі числа) до крапки
		    for(let i = 0; i < length; i++){
		        if(flagLeft){
		            if(arr[i] !== "0" || arr[i + 1] === "."){
		                arrNew.push(arr[i]);
		                flagLeft = false;
		            };
		        }else{
		            arrNew.push(arr[i]);
		        };
		    };
		    //Перебираємо праву частину(дріб) до крапки
		    for(let length = arrNew.length, i = length -1; i > 0; i--){
		        if(flagRight){
		            if(arrNew[i] === "0"){
		                arrNew.pop();
		            }else if(arrNew[i] === "."){
		                arrNew.pop();
		                flagRight = false;
		            }else{
		                flagRight = false;
		            };
		        };
		    };
		    if(signMinus){
		    	if((arrNew[0] === "0" && arrNew[1] === ".") || arrNew[0] !== "0"){
		    		arrNew.unshift("-");
		    	};
		    };
		    return arrNew;
		};


	    pointIndex1 = findPointIndex(bigArr1, pointIndex1);
	    pointIndex2 = findPointIndex(bigArr2, pointIndex2);

		//Початок блока коду який відповідає за вирівнювання чисел в масивах
		if(pointIndex1 > pointIndex2){//вирівнюємо цілу частину числа
			for(diff = pointIndex1 - pointIndex2; diff > 0; diff--) {
				bigArr2.unshift("0");
			};
		}else{
			for(diff = pointIndex2 - pointIndex1; diff > 0; diff--) {
				bigArr1.unshift("0");
			};
		};
		if(bigArr1.length > bigArr2.length){//вирівнюємо дробову частину числа
			for(diff = bigArr1.length - bigArr2.length; diff > 0; diff--) {
				bigArr2.push("0");
			};
		}else{
			for(diff = bigArr2.length - bigArr1.length; diff > 0; diff--) {
				bigArr1.push("0");
			};
		};
		//Кінець блока коду який відповідає за вирівнювання чисел в масивах

		/*
		*Початок блока коду який відповідає за вибір математичної операції в залежності від знаку дії, знаків чисел
		*та самих чисел(більше/менше, одинакові або нуль).
		*
		*/
		if(action === "+"){
			if(digA > 0 && digB > 0){//a+b=r
				addArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
			}else if(digA < 0 && digB > 0){//-a+b=(+/-)r
				if(absA >= absB){
					subArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
					resultArr.push("-");
				}else if(absA < absB){
					subArr(bigArr2.reverse(), bigArr1.reverse(), resultArr);
				};
			}else if(digA > 0 && digB < 0){//a+(-b)=(+/-)r
				if(absA >= absB){
					subArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
				}else if(absA < absB){
					subArr(bigArr2.reverse(), bigArr1.reverse(), resultArr);
					resultArr.push("-");
				};
			}else if(digA < 0 && digB < 0){//-a+(-b)=(-r)
				addArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
				resultArr.push("-");
			};
			if(digA === 0){//коли одна з цифр нуль
				resultArr = bigArr2.reverse();
				if(digB < 0){resultArr.push("-")};
			}else if(digB === 0){
				resultArr = bigArr1.reverse();
				if(digA < 0){resultArr.push("-")};
			};
		}else{
			if(digA > 0 && digB > 0){//a-b=(+/-)r
				if(absA >= absB){
					subArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
				}else if(absA < absB){
					subArr(bigArr2.reverse(), bigArr1.reverse(), resultArr);
					resultArr.push("-");
				};
			}else if(digA < 0 && digB > 0){//-a-b=(-r)
				addArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
				resultArr.push("-");
			}else if(digA > 0 && digB < 0){
				addArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
			}else if(digA < 0 && digB < 0){//a-(-b)=r
				if(absA >= absB){
					subArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
					resultArr.push("-");
				}else if(absA < absB){//-a-(-b)=(+/-)r
					subArr(bigArr2.reverse(), bigArr1.reverse(), resultArr);
				};
			};
			if(digA === 0){//коли одна з цифр нуль
				resultArr = bigArr2.reverse();
				resultArr.push("-");
			}else if(digB === 0){
				resultArr = bigArr1.reverse();
				if(digA < 0){resultArr.push("-")};
			};
		};
		//Кінець блока коду який відповідає за вибір математичної операції в залежності від знаку дії і знаків чисел
		resultArr.reverse();
		resultArr = resizeArr(resultArr);

		result = resultArr.join("");
		return result;
	};
return {
		start: function(digit1, digit2, action){
			return point(digit1, digit2, action);
		}
	}
})();