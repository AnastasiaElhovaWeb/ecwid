"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
  var containerSlider = document.body.querySelector('.slider');
  var carousel = new Slider(containerSlider);
});
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slider = /*#__PURE__*/function () {
  function Slider(containerSlider) {
    _classCallCheck(this, Slider);

    this.elem = containerSlider;
    this.slides = Array.from(containerSlider.querySelectorAll('.slider__item'));
    this.sliderWidth = this.elem.offsetWidth;
    this.navigation = containerSlider.querySelector('.slider__navigation');
    this.arrows = {
      left: this.elem.querySelector('.slider__arrow_left'),
      right: this.elem.querySelector('.slider__arrow_right')
    };
    this.translate = {
      current: 0,
      // текущий сдвиг по Х. изначально - 0
      max: 0 - this.sliderWidth * (this.slides.length - 1) // максимальный сдвиг по Х

    };
    this.bindEvents();
  }

  _createClass(Slider, [{
    key: "bindEvents",
    value: function bindEvents() {
      this.drawNavigation();
      this.initSlider();
    }
  }, {
    key: "drawNavigation",
    value: function drawNavigation() {
      // отрисовать кнопки для навигации
      var navButtons = this.slides.map(function () {
        return "<div class=\"slider__nav\"></div>";
      }).join('');
      this.navigation.innerHTML = navButtons;
    }
  }, {
    key: "initSlider",
    value: function initSlider() {
      var _this = this;

      // инициализация навигации слайдера
      var slider = this.elem.querySelector('.slider__inner');
      this.checkButtonsState();

      this.arrows.left.onclick = function () {
        _this.translate.current += _this.sliderWidth;
        slider.style.transform = "translateX(".concat(_this.translate.current, "px)");

        _this.checkButtonsState();
      };

      this.arrows.right.onclick = function () {
        _this.translate.current -= _this.sliderWidth;
        slider.style.transform = "translateX(".concat(_this.translate.current, "px)");

        _this.checkButtonsState();
      };

      this.navigation.onclick = function (e) {
        if (!e.target.classList.contains('slider__nav')) return;
        var navs = Array.from(_this.navigation.querySelectorAll('.slider__nav'));
        var indexNav = navs.indexOf(e.target);
        _this.translate.current = -indexNav * _this.sliderWidth;
        slider.style.transform = "translateX(".concat(_this.translate.current, "px)");

        _this.checkButtonsState();
      };
    }
  }, {
    key: "checkButtonsState",
    value: function checkButtonsState() {
      // проверить, надо ли отобразить или скрыть одну из кнопок
      this.arrows.left.style.display = '';
      this.arrows.right.style.display = '';

      if (this.translate.current === 0) {
        this.arrows.left.style.display = 'none';
      }

      if (this.translate.current === this.translate.max) {
        this.arrows.right.style.display = 'none';
      }

      this.activeNavigationLink();
    }
  }, {
    key: "activeNavigationLink",
    value: function activeNavigationLink() {
      // установить активную кнопку навигации
      var indexNav = -this.translate.current / this.sliderWidth;
      var navs = this.elem.querySelectorAll('.slider__nav');
      navs.forEach(function (nav) {
        return nav.classList.remove('slider__nav_active');
      });
      navs[indexNav].classList.add('slider__nav_active');
    }
  }]);

  return Slider;
}();