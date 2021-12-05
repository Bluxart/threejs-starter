import Canvas from './components/Canvas';

class App {

    constructor(){
        this.createCanvas();
        this.onResize();
    }

    createCanvas(){
        this.canvas = new Canvas({
            domElement: document.querySelector('.canvas-frame')
        });
    }

    /** Events */
    onResize(){
        if( this.canvas && this.canvas.onResize ){
            this.canvas.onResize();
        }
    }

}

new App();
