class Framework {

    appElm = null;

    currentInstances = [];

    route() {
        for (let tag in RouteMap) {
            if(new RegExp(RouteMap[tag]).test(location.hash)) {
                if(typeof TagMap[tag] != 'undefined') {
                    for (let i = 0; i < this.currentInstances.length; ++i) {
                        this.currentInstances[i].destroy();
                    }
                    this.currentInstances = [];
                    let app = new window[TagMap[tag]]();
                    app.render(this.appElm);
                    this.currentInstances.push(app);
                } else {
                    console.warn('A component called "' + tag + '" needs to exist');
                }
            }
        }
    }

    render() {
        this.appElm = document.querySelector('[data-app]');
        if(this.appElm) {
            if(location.hash=='') location.hash = '/';

            window.onhashchange = function () {
                this.route();
            }.bind(this);
            this.route();
        } else {
            console.warn('An element with data-app needs to exist.');
        }
    }
}

window.framework = null;

window.onload = function () {
    if(!window.framework) {
        window.framework = new Framework();
        window.framework.render();
    }
}