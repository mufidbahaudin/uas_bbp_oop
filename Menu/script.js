class AnimationController {
    constructor() {
        this._menu = document.querySelector('.menu');
        this._playButton = document.getElementById('playButton');
        this._tipsButton = document.getElementById('tipsButton');
        this._creditsButton = document.getElementById('creditsButton');

        setTimeout(() => {
            this.animateTitle();
        }, 1000);

        setTimeout(() => {
            this.showMenu();
        }, 1500);
    }

    get menu() {
        return this._menu;
    }

    set menu(value) {
        this._menu = value;
    }

    get playButton() {
        return this._playButton;
    }

    set playButton(value) {
        this._playButton = value;
    }

    get tipsButton() {
        return this._tipsButton;
    }

    set tipsButton(value) {
        this._tipsButton = value;
    }

    get creditsButton() {
        return this._creditsButton;
    }

    set creditsButton(value) {
        this._creditsButton = value;
    }

    animateTitle() {
        document.querySelector('h1').style.opacity = '1';
    }

    showMenu() {
        this._menu.classList.add('show');
    }
}

class ExtendedAnimationController extends AnimationController {
    constructor() {
        super();
    }

    animateTitle() {
        console.log('Game Snake');
        super.animateTitle();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const controller = new ExtendedAnimationController();
});
