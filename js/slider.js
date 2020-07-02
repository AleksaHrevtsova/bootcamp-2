"use strict";

const Ant = function (crslId) {
  let id = document.getElementById(crslId);
  if (id) {
    this.crslRoot = id;
  } else {
    this.crslRoot = document.querySelector(".ant-carousel");
  }
  // все объекты нашего слайдера
  // list
  this.crslList = this.crslRoot.querySelector(".ant-carousel-list");
  this.crslElements = this.crslRoot.querySelectorAll(".ant-carousel-element");
  this.crslElemFirst = this.crslRoot.querySelector(".ant-carousel-element");
  // left_arrow
  this.leftArrow = this.crslRoot.querySelector("div.ant-carousel-arrow-left");
  this.rightArrow = this.crslRoot.querySelector("div.ant-carousel-arrow-right");
  this.indicatorDots = this.crslRoot.querySelector(".ant-carousel-dots");

  // запуск слайдера
  this.options = Ant.defaults;
  Ant.initialize(this);
};

Ant.defaults = {
  // Default options for the carousel

  // visibleItem
  elemVisible: 1, // Кол-во отображаемых элементов в карусели
  loop: true, // Бесконечное зацикливание карусели
  auto: true, // Автоматическая прокрутка
  interval: 3000, // Интервал между прокруткой элементов (мс)
  speed: 1000, // Скорость анимации (мс)
  touch: true, // Прокрутка  прикосновением
  arrows: true, // Прокрутка стрелками
  dots: true, // Индикаторные точки
};

Ant.prototype.elemPrev = function (num) {
  num = num || 1;

  if (this.options.dots) this.dotOn(this.currentElement);
  this.currentElement -= num;
  if (this.currentElement < 0) this.currentElement = this.dotsVisible - 1;
  if (this.options.dots) this.dotOff(this.currentElement);

  if (!this.options.loop) {
    // сдвиг вправо без цикла
    this.currentOffset += this.elemWidth * num;
    this.crslList.style.marginLeft = this.currentOffset + "px";
    if (this.currentElement == 0) {
      this.leftArrow.style.display = "none";
      this.touchPrev = false;
    }
    this.rightArrow.style.display = "block";
    this.touchNext = true;
  } else {
    // сдвиг вправо с циклом
    let elm,
      buf,
      this$ = this;

    for (let i = 0; i < num; i++) {
      elm = this.crslList.lastElementChild;
      buf = elm.cloneNode(true);
      this.crslList.insertBefore(buf, this.crslList.firstElementChild);
      elm.remove();
    }
    // this.crslList.style.marginLeft = "-" + this.elemWidth * num + "px";
    // let compStyle = window.getComputedStyle(this.crslList).marginLeft;
    this.crslList.style.cssText =
      "transition:margin " + this.options.speed + "ms ease;";
    // this.crslList.style.marginLeft = "0px";
    setTimeout(function () {
      this$.crslList.style.cssText = "transition:none;";
    }, this.options.speed);
  }
};

