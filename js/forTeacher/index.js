"use strict";
// var slideShow = (function () {
//   return function (selector, config) {
//     var _slider = document.querySelector(selector), // основный элемент блока
//       _sliderContainer = _slider.querySelector(".slider__items"), // контейнер для .slider-item
//       _sliderItems = _slider.querySelectorAll(".slider__item"), // коллекция .slider-item
//       _sliderControls = _slider.querySelectorAll(".slider__control"), // элементы управления
//       _currentPosition = 0, // позиция левого активного элемента
//       _transformValue = 0, // значение транфсофрмации .slider_wrapper
//       _transformStep = 100, // величина шага (для трансформации)
//       _itemsArray = [], // массив элементов
//       _timerId,
//       _indicatorItems,
//       _indicatorIndex = 0,
//       _indicatorIndexMax = _sliderItems.length - 1,
//       _stepTouch = 50,
//       _config = {
//         isAutoplay: false, // автоматическая смена слайдов
//         directionAutoplay: "next", // направление смены слайдов
//         delayAutoplay: 5000, // интервал между автоматической сменой слайдов
//         isPauseOnHover: true, // устанавливать ли паузу при поднесении курсора к слайдеру
//       };

//     // настройка конфигурации слайдера в зависимости от полученных ключей
//     for (var key in config) {
//       if (key in _config) {
//         _config[key] = config[key];
//       }
//     }

//     // наполнение массива _itemsArray
//     for (var i = 0, length = _sliderItems.length; i < length; i++) {
//       _itemsArray.push({ item: _sliderItems[i], position: i, transform: 0 });
//     }

//     // переменная position содержит методы с помощью которой можно получить минимальный и максимальный индекс элемента, а также соответствующему этому индексу позицию
//     var position = {
//       getItemIndex: function (mode) {
//         var index = 0;
//         for (var i = 0, length = _itemsArray.length; i < length; i++) {
//           if (
//             (_itemsArray[i].position < _itemsArray[index].position &&
//               mode === "min") ||
//             (_itemsArray[i].position > _itemsArray[index].position &&
//               mode === "max")
//           ) {
//             index = i;
//           }
//         }
//         return index;
//       },
//       getItemPosition: function (mode) {
//         return _itemsArray[position.getItemIndex(mode)].position;
//       },
//     };

//     // функция, выполняющая смену слайда в указанном направлении
//     var _move = function (direction) {
//       var nextItem,
//         currentIndicator = _indicatorIndex;
//       if (direction === "next") {
//         _currentPosition++;
//         if (_currentPosition > position.getItemPosition("max")) {
//           nextItem = position.getItemIndex("min");
//           _itemsArray[nextItem].position = position.getItemPosition("max") + 1;
//           _itemsArray[nextItem].transform += _itemsArray.length * 100;
//           _itemsArray[nextItem].item.style.transform =
//             "translateX(" + _itemsArray[nextItem].transform + "%)";
//         }
//         _transformValue -= _transformStep;
//         _indicatorIndex = _indicatorIndex + 1;
//         if (_indicatorIndex > _indicatorIndexMax) {
//           _indicatorIndex = 0;
//         }
//       } else {
//         _currentPosition--;
//         if (_currentPosition < position.getItemPosition("min")) {
//           nextItem = position.getItemIndex("max");
//           _itemsArray[nextItem].position = position.getItemPosition("min") - 1;
//           _itemsArray[nextItem].transform -= _itemsArray.length * 100;
//           _itemsArray[nextItem].item.style.transform =
//             "translateX(" + _itemsArray[nextItem].transform + "%)";
//         }
//         _transformValue += _transformStep;
//         _indicatorIndex = _indicatorIndex - 1;
//         if (_indicatorIndex < 0) {
//           _indicatorIndex = _indicatorIndexMax;
//         }
//       }
//       _sliderContainer.style.transform = "translateX(" + _transformValue + "%)";
//       _indicatorItems[currentIndicator].classList.remove("active");
//       _indicatorItems[_indicatorIndex].classList.add("active");
//     };

//     // функция, осуществляющая переход к слайду по его порядковому номеру
//     var _moveTo = function (index) {
//       var i = 0,
//         direction = index > _indicatorIndex ? "next" : "prev";
//       while (index !== _indicatorIndex && i <= _indicatorIndexMax) {
//         _move(direction);
//         i++;
//       }
//     };

//     // функция для запуска автоматической смены слайдов через промежутки времени
//     var _startAutoplay = function () {
//       if (!_config.isAutoplay) {
//         return;
//       }
//       _stopAutoplay();
//       _timerId = setInterval(function () {
//         _move(_config.directionAutoplay);
//       }, _config.delayAutoplay);
//     };

//     // функция, отключающая автоматическую смену слайдов
//     var _stopAutoplay = function () {
//       clearInterval(_timerId);
//     };

//     // функция, добавляющая индикаторы к слайдеру
//     var _addIndicators = function () {
//       var indicatorsContainer = document.createElement("ul");
//       indicatorsContainer.classList.add("slider__indicators");
//       for (var i = 0, length = _sliderItems.length; i < length; i++) {
//         var sliderIndicatorsItem = document.createElement("li");
//         if (i === 0) {
//           sliderIndicatorsItem.classList.add("active");
//         }
//         sliderIndicatorsItem.setAttribute("data-slide-to", i);
//         indicatorsContainer.appendChild(sliderIndicatorsItem);
//       }
//       _slider.appendChild(indicatorsContainer);
//       _indicatorItems = _slider.querySelectorAll(".slider__indicators > li");
//     };

//     var _isTouchDevice = function () {
//       return !!("ontouchstart" in window || navigator.maxTouchPoints);
//     };

//     // функция, осуществляющая установку обработчиков для событий
//     var _setUpListeners = function () {
//       var _startX = 0;
//       if (_isTouchDevice()) {
//         _slider.addEventListener("touchstart", function (e) {
//           _startX = e.changedTouches[0].clientX;
//           _startAutoplay();
//         });
//         _slider.addEventListener("touchend", function (e) {
//           var _endX = e.changedTouches[0].clientX,
//             _deltaX = _endX - _startX;
//           if (_deltaX > _stepTouch) {
//             _move("prev");
//           } else if (_deltaX < -_stepTouch) {
//             _move("next");
//           }
//           _startAutoplay();
//         });
//       } else {
//         for (var i = 0, length = _sliderControls.length; i < length; i++) {
//           _sliderControls[i].classList.add("slider__control_show");
//         }
//       }
//       _slider.addEventListener("click", function (e) {
//         if (e.target.classList.contains("slider__control")) {
//           e.preventDefault();
//           _move(
//             e.target.classList.contains("slider__control_next")
//               ? "next"
//               : "prev"
//           );
//           _startAutoplay();
//         } else if (e.target.getAttribute("data-slide-to")) {
//           e.preventDefault();
//           _moveTo(parseInt(e.target.getAttribute("data-slide-to")));
//           _startAutoplay();
//         }
//       });
//       document.addEventListener(
//         "visibilitychange",
//         function () {
//           if (document.visibilityState === "hidden") {
//             _stopAutoplay();
//           } else {
//             _startAutoplay();
//           }
//         },
//         false
//       );
//       if (_config.isPauseOnHover && _config.isAutoplay) {
//         _slider.addEventListener("mouseenter", function () {
//           _stopAutoplay();
//         });
//         _slider.addEventListener("mouseleave", function () {
//           _startAutoplay();
//         });
//       }
//     };

//     // добавляем индикаторы к слайдеру
//     _addIndicators();
//     // установливаем обработчики для событий
//     _setUpListeners();
//     // запускаем автоматическую смену слайдов, если установлен соответствующий ключ
//     _startAutoplay();

//     return {
//       // метод слайдера для перехода к следующему слайду
//       next: function () {
//         _move("next");
//       },
//       // метод слайдера для перехода к предыдущему слайду
//       left: function () {
//         _move("prev");
//       },
//       // метод отключающий автоматическую смену слайдов
//       stop: function () {
//         _config.isAutoplay = false;
//         _stopAutoplay();
//       },
//       // метод запускающий автоматическую смену слайдов
//       cycle: function () {
//         _config.isAutoplay = true;
//         _startAutoplay();
//       },
//     };
//   };
// })();

// slideShow(".slider", {
//   isAutoplay: true,
// });

// в видео 04 06
Ant.prototype.elemNext = function (num) {
  num = num || 1;

  if (this.options.dots) this.dotOn(this.currentElement);
  this.currentElement += num;
  if (this.currentElement >= this.dotsVisible) this.currentElement = 0;
  if (this.options.dots) this.dotOff(this.currentElement);

  if (!this.options.loop) {
    // сдвиг влево без цикла
    this.currentOffset -= this.elemWidth * num;
    this.crslList.style.marginLeft = this.currentOffset + "px";
    if (this.currentElement == this.dotsVisible - 1) {
      this.rightArrow.style.display = "none";
      this.touchNext = false;
    }
    this.leftArrow.style.display = "block";
    this.touchPrev = true;
  } else {
    // сдвиг влево с циклом
    let elm,
      buf,
      this$ = this;
    this.crslList.style.cssText =
      "transition:margin " + this.options.speed + "ms ease;";
    this.crslList.style.marginLeft = "-" + this.elemWidth * num + "px";
    setTimeout(function () {
      this$.crslList.style.cssText = "transition:none;";
      for (let i = 0; i < num; i++) {
        elm = this$.crslList.firstElementChild;
        buf = elm.cloneNode(true);
        this$.crslList.appendChild(buf);
        this$.crslList.removeChild(elm);
      }
      this$.crslList.style.marginLeft = "0px";
    }, this.options.speed);
  }
};

Ant.prototype.dotOn = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    "background-color:#BBB; cursor:pointer;";
};

Ant.prototype.dotOff = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    "background-color:#556; cursor:default;";
};

// 05 06
Ant.initialize = function (that) {
  // Constants
  that.elemCount = that.crslElements.length; // Количество элементов
  that.dotsVisible = that.elemCount; // Число видимых точек
  let elemStyle = window.getComputedStyle(that.crslElemFirst);
  that.elemWidth =
    that.crslElemFirst.offsetWidth + // Ширина элемента (без margin)
    parseInt(elemStyle.marginLeft) +
    parseInt(elemStyle.marginRight);

  // Variables
  that.currentElement = 0;
  that.currentOffset = 0;
  that.touchPrev = true;
  that.touchNext = true;
  let xTouch, yTouch, xDiff, yDiff, stTime, mvTime;
  let bgTime = getTime();
  // console.log(bgTime);

  // Functions
  function getTime() {
    return new Date().getTime();
  }

  function setAutoScroll() {
    that.autoScroll = setInterval(function () {
      let fnTime = getTime();
      if (fnTime - bgTime + 20 > that.options.interval) {
        bgTime = fnTime;
        that.elemNext();
      }
    }, that.options.interval);
  }

  // Start initialization
  if (that.elemCount <= that.options.elemVisible) {
    // Отключить навигацию
    that.options.auto = false;
    that.options.touch = false;
    that.options.arrows = false;
    that.options.dots = false;
    that.leftArrow.style.display = "none";
    that.rightArrow.style.display = "none";
  }

  if (!that.options.loop) {
    // если нет цикла - уточнить количество точек
    that.dotsVisible = that.elemCount - that.options.elemVisible + 1;
    that.leftArrow.style.display = "none"; // отключить левую стрелку
    that.touchPrev = false; // отключить прокрутку прикосновением вправо
    that.options.auto = false; // отключить автопркрутку
  } else if (that.options.auto) {
    // инициализация автопрокруки
    setAutoScroll();
    // Остановка прокрутки при наведении мыши на элемент
    that.crslList.addEventListener(
      "mouseenter",
      function () {
        clearInterval(that.autoScroll);
      },
      false
    );
    that.crslList.addEventListener("mouseleave", setAutoScroll, false);
  }

  if (that.options.touch) {
    // инициализация прокрутки прикосновением
    that.crslList.addEventListener(
      "touchstart",
      function (e) {
        xTouch = parseInt(e.touches[0].clientX);
        yTouch = parseInt(e.touches[0].clientY);
        stTime = getTime();
      },
      false
    );
    that.crslList.addEventListener(
      "touchmove",
      function (e) {
        if (!xTouch || !yTouch) return;
        xDiff = xTouch - parseInt(e.touches[0].clientX);
        yDiff = yTouch - parseInt(e.touches[0].clientY);
        mvTime = getTime();
        if (
          Math.abs(xDiff) > 15 &&
          Math.abs(xDiff) > Math.abs(yDiff) &&
          mvTime - stTime < 75
        ) {
          stTime = 0;
          if (that.touchNext && xDiff > 0) {
            bgTime = mvTime;
            that.elemNext();
          } else if (that.touchPrev && xDiff < 0) {
            bgTime = mvTime;
            that.elemPrev();
          }
        }
      },
      false
    );
  }

  if (that.options.arrows) {
    // инициализация стрелок
    if (!that.options.loop)
      that.crslList.style.cssText =
        "transition:margin " + that.options.speed + "ms ease;";
    that.leftArrow.addEventListener(
      "click",
      function () {
        let fnTime = getTime();
        if (fnTime - bgTime > that.options.speed) {
          bgTime = fnTime;
          that.elemPrev();
        }
      },
      false
    );
    that.rightArrow.addEventListener(
      "click",
      function () {
        let fnTime = getTime();
        if (fnTime - bgTime > that.options.speed) {
          bgTime = fnTime;
          that.elemNext();
        }
      },
      false
    );
  } else {
    that.leftArrow.style.display = "none";
    that.rightArrow.style.display = "none";
  }

  if (that.options.dots) {
    // инициализация индикаторных точек
    let sum = "",
      diffNum;
    for (let i = 0; i < that.dotsVisible; i++) {
      sum += '<span class="ant-dot"></span>';
    }
    that.indicatorDots.innerHTML = sum;
    that.indicatorDotsAll = that.crslRoot.querySelectorAll("span.ant-dot");
    // Назначаем точкам обработчик события 'click'
    for (let n = 0; n < that.dotsVisible; n++) {
      that.indicatorDotsAll[n].addEventListener(
        "click",
        function () {
          diffNum = Math.abs(n - that.currentElement);
          if (n < that.currentElement) {
            bgTime = getTime();
            that.elemPrev(diffNum);
          } else if (n > that.currentElement) {
            bgTime = getTime();
            that.elemNext(diffNum);
          }
          // Если n == that.currentElement ничего не делаем
        },
        false
      );
    }
    that.dotOff(0); // точка[0] выключена, остальные включены
    for (let i = 1; i < that.dotsVisible; i++) {
      that.dotOn(i);
    }
  }
};

new Ant();
