class AnimationController {
    constructor() {
        this.menu = document.querySelector('.menu');
        this.playButton = document.getElementById('playButton');
        this.tipsButton = document.getElementById('tipsButton');
        this.creditsButton = document.getElementById('creditsButton');

        setTimeout(() => {
            this.animateTitle();
        }, 1000); 

        
        setTimeout(() => {
            this.showMenu();
        }, 1500); 
    }

    animateTitle() {
        document.querySelector('h1').style.opacity = '1';
    }

    showMenu() {
        this.menu.classList.add('show');
    }
}

class ExtendedAnimationController extends AnimationController {
    constructor() {
        super(); // Call the parent class constructor

    }

    // Override the base class method
    animateTitle() {
        console.log('Game Snake');
        super.animateTitle(); 
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const controller = new ExtendedAnimationController();
});
