
  var class_Navhtml= class extends Component {

_component_content = `<div id="nav">
  <a data-id="class_Navhtml2"  href="#/">App</a>
  <a data-id="class_Navhtml4"  href="#/test">App2</a>
  <a data-id="class_Navhtml6"  href="#/todo">Todo</a>
</div>

<style>
  a {
    color: black;
    text-decoration: none;
  }
  .active {
    color: black;
    text-decoration: underline;
  }
</style>

`;
addGeneratedCode() {


                                this.setClassclassPoint1 = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id="class_Navhtml2"]');
                                    if(elm) elm.className = val;
                                };
                            

                                this.setClassclassPoint2 = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id="class_Navhtml4"]');
                                    if(elm) elm.className = val;
                                };
                            

                                this.setClassclassPoint3 = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id="class_Navhtml6"]');
                                    if(elm) elm.className = val;
                                };
                            }
    classPoint1 = '';
    classPoint2 = '';
    classPoint3 = '';

    onInitialized() {
      let nav = document.getElementById('nav'),
          links = nav.querySelectorAll('a');

      for (let i =0; i < links.length; ++i) {

        if(location.hash == links[i].getAttribute('href')) {
          this.classPoint1 = '';
          this.classPoint2 = '';
          this.classPoint3 = '';
          if(i==0) this.classPoint1 = 'active';
          if(i==1) this.classPoint2 = 'active';
          if(i==2) this.classPoint3 = 'active';
          break;
        }
      }

    }
  }
