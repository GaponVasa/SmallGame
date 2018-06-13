"use strict";
/*
*Цей модуль виконує звертання блоку elBlock по висоті при натисненні на кнопку elButton. 
*Функція аналогічна slideToggler в Query.
*Має чотири методи:
*	-oneToggle - звертає/розвертає один раз блок elBlock при натисненні на кнопку elButton.
*	-dobleToggle - звертає/розвертає двічі блок elBlock при натисненні на кнопку elButton.
*	-immediatelyToggle - звертає/розвертає негайно блок elBlock без натискання на кнопку.
*	-toggleWithDelay - звертає/розвертає з затримкою delay блок elBlock без натискання на кнопку.
*/
/*
AUTHOR:	Michal Niewitala
LICENSE:	MIT
SOURCE: https://www.cssscript.com/smooth-slide-toggle-vanilla-javascript/
Has expanded the functionality: Hapon Vasyl
*/

let moduleSlideToggler = (function() {
	var block, i, j, len, len1, ref, ref1, slideToggler, trigger,
	bind = function(fn, me){ 
		return function(){ 
			return fn.apply(me, arguments); 
		};
	},
	indexOf = [].indexOf || function(item) { 
		for (var i = 0, l = this.length; i < l; i++) { 
			if (i in this && this[i] === item) return i; 
		};
		return -1; 
	};

	slideToggler = (function() {
		function slideToggler(el1) {
			this.el = el1;
			this.toggle = bind(this.toggle, this);
			if (!this.el) {
				return;
			}
			this.height = this.getHeight();
		}

		slideToggler.prototype.getHeight = function() {
			var clone;
			if (this.el.clientHeight > 10) {
				return this.el.clientHeight;
			}
			clone = this.el.cloneNode(true);
			clone.style.cssText = 'visibility: hidden; display: block;';
			this.el.parentNode.appendChild(clone);
			this.height = clone.clientHeight;
			this.el.parentNode.removeChild(clone);
			return this.height;
		};

		slideToggler.prototype.toggle = function(time) {
			var currHeight, disp, el, end, init, ref, repeat, start;
			if (!(this.height > 0)) {
				this.height = this.getHeight();
			}
			if (time == null) {
				time = this.height;
			}
			currHeight = this.el.clientHeight * (getComputedStyle(this.el).display !== 'none');
			ref = currHeight > this.height / 2 ? [this.height, 0] : [0, this.height], start = ref[0], end = ref[1];
			disp = end - start;
			el = this.el;
			this.el.classList[end === 0 ? 'remove' : 'add']('open');
			this.el.style.cssText = "overflow: hidden; display: block; padding-top: 0; padding-bottom: 0";
			init = (new Date).getTime();

			repeat = function() {
				var i, instance, ref1, repeatLoop, results, step;
				instance = (new Date).getTime() - init;
				step = start + disp * instance / time;
				if (instance <= time) {
					el.style.height = step + 'px';
				} else {
					el.style.cssText = "display: " + (end === 0 ? 'none' : 'block');
				};
				repeatLoop = requestAnimationFrame(repeat);
				if (ref1 = Math.floor(step), indexOf.call((function() {
					results = [];
					for (var i = start; start <= end ? i <= end : i >= end; start <= end ? i++ : i--){ 
						results.push(i); 
					}
					return results;
				}).apply(this), ref1) < 0) {
					return cancelAnimationFrame(repeatLoop);
				};
			};
			return repeat();
		};

		return slideToggler;

	})();

	let one = function(elBlock, elButton ){
		elBlock.toggler = new slideToggler(elBlock);
		elButton.addEventListener('click', function() {
			let ref2;
			return (ref2 = elBlock.toggler) != null ? ref2.toggle() : void 0;
		});
	};

	let two = function(elBlock, elButton, delay){
		elBlock.toggler = new slideToggler(elBlock);
		elButton.addEventListener('click', function() {
			let ref2 = elBlock.toggler;
			if(ref2 != null){
				return (function(){
					ref2.toggle(); 
					setTimeout(ref2.toggle, delay);
				})();
			}else{void 0};
		});
	};

	let immediately = function(elBlock){
		if(elBlock.toggler != null){
			return elBlock.toggler.toggle();
		}else{
			elBlock.toggler = new slideToggler(elBlock);
			return elBlock.toggler.toggle();
		};
	};

	let toggleDelay = function(elBlock, delay){
		setTimeout(function(){immediately(elBlock)}, delay);
	};

	return{
		oneToggle:one,
		dobleToggle:two,
		immediatelyToggle: immediately,
		toggleWithDelay: toggleDelay
	}
})();
