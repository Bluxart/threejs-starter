// Fix Reload
if (module.hot) {
    module.hot.accept(() => {
      // or use this instead of dispose()
      // window.location.reload();
    });

    module.hot.dispose(() => {
      window.location.reload();
    });
}

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
