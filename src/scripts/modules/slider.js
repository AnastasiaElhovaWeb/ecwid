class Slider {
    constructor(containerSlider) {
        this.elem = containerSlider;
        this.slides = Array.from(containerSlider.querySelectorAll('.slider__item'));
        this.sliderWidth = this.elem.offsetWidth;
        this.navigation = containerSlider.querySelector('.slider__navigation');
        this.arrows = {
            left: this.elem.querySelector('.slider__arrow_left'),
            right: this.elem.querySelector('.slider__arrow_right'),
        };
        this.translate = {
            current: 0,  // текущий сдвиг по Х. изначально - 0
            max: 0 - this.sliderWidth * (this.slides.length-1),  // максимальный сдвиг по Х
        };

        this.bindEvents();
    }

    bindEvents() {
        this.drawNavigation();
        this.initSlider();
    }

    drawNavigation() {  // отрисовать кнопки для навигации
        let navButtons = this.slides.map(() => `<div class="slider__nav"></div>` ).join('');
        this.navigation.innerHTML = navButtons;
    }

    initSlider() {  // инициализация навигации слайдера
        let slider = this.elem.querySelector('.slider__inner');

        this.checkButtonsState();

        this.arrows.left.onclick = () => {
            this.translate.current += this.sliderWidth;
            slider.style.transform = `translateX(${this.translate.current}px)`;

            this.checkButtonsState();
        };

        this.arrows.right.onclick = () => {
            this.translate.current -= this.sliderWidth;
            slider.style.transform = `translateX(${this.translate.current}px)`;

            this.checkButtonsState();
        };

        this.navigation.onclick = (e) => {
            if (!e.target.classList.contains('slider__nav')) return;

            let navs = Array.from(this.navigation.querySelectorAll('.slider__nav'));
            let indexNav = navs.indexOf(e.target);
            this.translate.current = -(indexNav) * this.sliderWidth;

            slider.style.transform = `translateX(${this.translate.current}px)`;

            this.checkButtonsState();
        };
    }


    checkButtonsState() {  // проверить, надо ли отобразить или скрыть одну из кнопок
        (this.arrows.left).style.display = '';
        (this.arrows.right).style.display = '';

        if (this.translate.current === 0) {
            (this.arrows.left).style.display = 'none';
        }

        if (this.translate.current === this.translate.max) {
            (this.arrows.right).style.display = 'none';
        }

        this.activeNavigationLink();
    }


    activeNavigationLink() {  // установить активную кнопку навигации
        let indexNav = -(this.translate.current) / this.sliderWidth;
        let navs = this.elem.querySelectorAll('.slider__nav');
        navs.forEach(nav => nav.classList.remove('slider__nav_active'));
        navs[indexNav].classList.add('slider__nav_active');
    }
}