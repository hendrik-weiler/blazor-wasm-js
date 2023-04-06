
  var class_App2html= class extends Component {

_component_content = `
<Nav></Nav>

<h1>App route 2</h1>

<Test></Test>

<a href="#/">To default</a>

`;
addGeneratedCode() {
}

  }
;
  var class_Apphtml= class extends Component {

_component_content = `
<Nav></Nav>

<h1>App</h1>
<Test></Test>
<Test></Test>

`;
addGeneratedCode() {
}

      parentTest = 'hello from parent';

      onInitialized() {
          this.parentTest = 'hello from initialized';
      }

  }
;
  var class_Menuhtml= class extends Component {

_component_content = `<a data-id="class_Menuhtml1"  href="javascript:">Link</a>

`;
addGeneratedCode() {


                                this.setPropertylink = function(val) {
                                    this._content_elm.querySelector('[data-id="class_Menuhtml1"]').innerHTML = val;
                                };
                            }

    link = "Hello dolly";

  }
;
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
;
  var class_Testhtml= class extends Component {

_component_content = `<h1 data-id="class_Testhtml1" >Hello world!</h1>
<p data-id="class_Testhtml3" >Lorem ipsum</p>
<input type="text" data-id="class_Testhtml5"  >

<label for="cbox@id@">
<input id="cbox@id@" type="checkbox" data-id="class_Testhtml7"  />
    Click  me
</label>

<select data-id="class_Testhtml9"   name="test" id="asd">
    <option value="0">None</option>
    <option value="1">Test</option>
    <option value="2">Test2</option>
</select>

<input type="text" data-id="class_Testhtml17"  >
<div data-id="class_Testhtml18" >
    <input type="radio" value="radio1"> Radio 1<br>
    <input type="radio" value="radio2"> Radio 2<br>
    <input type="radio" value="radio3"> Radio 3<br>
</div>

<div data-id="class_Testhtml26"  >
    <input type="radio" value="radio21"> Radio 21<br>
    <input type="radio" value="radio22"> Radio 22<br>
    <input type="radio" value="radio23"> Radio 23<br>
</div>

<p>Checkbox value: <span data-id="class_Testhtml35" ></span></p>
<span data-id="class_Testhtml38" ></span>
<label>Radio2 = <span data-id="class_Testhtml41" ></span></label>
<Menu></Menu>

<ul data-id="class_Testhtml46" >
    <li>@v.title - @v.text</li>
</ul>

`;
addGeneratedCode() {

                            var z = 0,
                                elms = this._content_elm.querySelectorAll('[data-id="class_Testhtml1"]');
                            for(z;z < elms.length; ++z) {
                                elms[z].onclick = this.click.bind(this);
                            }
                            

                            var z = 0,
                                elms = this._content_elm.querySelectorAll('[data-id="class_Testhtml3"]');
                            for(z;z < elms.length; ++z) {
                                elms[z].onclick = this.loremIpsum.bind(this);
                            }
                            


                                this._content_elm.querySelector('[data-id="class_Testhtml5"]').addEventListener('input', function(e) {
                                    if(e.currentTarget.type == 'checkbox') {
                                        this['html'] = e.currentTarget.checked;
                                    } else {
                                        this['html'] = e.currentTarget.value;
                                    }
                                }.bind(this));
                                this.setPropertyValuehtml = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id="class_Testhtml5"]');
                                    if(elm.type == 'checkbox') {
                                        elm.checked = val==true;
                                    } else {
                                        elm.value = val;
                                    }
                                };
                            
                            var z = 0,
                                elms = this._content_elm.querySelectorAll('[data-id="class_Testhtml5"]');
                            for(z;z < elms.length; ++z) {
                                elms[z].oninput = this.input.bind(this);
                            }
                            


                                this._content_elm.querySelector('[data-id="class_Testhtml7"]').addEventListener('input', function(e) {
                                    if(e.currentTarget.type == 'checkbox') {
                                        this['cbox'] = e.currentTarget.checked;
                                    } else {
                                        this['cbox'] = e.currentTarget.value;
                                    }
                                }.bind(this));
                                this.setPropertyValuecbox = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id="class_Testhtml7"]');
                                    if(elm.type == 'checkbox') {
                                        elm.checked = val==true;
                                    } else {
                                        elm.value = val;
                                    }
                                };
                            

                                this._content_elm.querySelector('[data-id="class_Testhtml9"]').addEventListener('input', function(e) {
                                    if(e.currentTarget.type == 'checkbox') {
                                        this['select'] = e.currentTarget.checked;
                                    } else {
                                        this['select'] = e.currentTarget.value;
                                    }
                                }.bind(this));
                                this.setPropertyValueselect = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id="class_Testhtml9"]');
                                    if(elm.type == 'checkbox') {
                                        elm.checked = val==true;
                                    } else {
                                        elm.value = val;
                                    }
                                };
                            
                            var z = 0,
                                elms = this._content_elm.querySelectorAll('[data-id="class_Testhtml9"]');
                            for(z;z < elms.length; ++z) {
                                elms[z].oninput = this.loremIpsum.bind(this);
                            }
                            


                                this._content_elm.querySelector('[data-id="class_Testhtml17"]').addEventListener('input', function(e) {
                                    if(e.currentTarget.type == 'checkbox') {
                                        this['radio'] = e.currentTarget.checked;
                                    } else {
                                        this['radio'] = e.currentTarget.value;
                                    }
                                }.bind(this));
                                this.setPropertyValueradio = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id="class_Testhtml17"]');
                                    if(elm.type == 'checkbox') {
                                        elm.checked = val==true;
                                    } else {
                                        elm.value = val;
                                    }
                                };
                            
                            var z = 0,
                                elms = this._content_elm.querySelectorAll('[data-id="class_Testhtml17"]');
                            for(z;z < elms.length; ++z) {
                                elms[z].oninput = this.input2.bind(this);
                            }
                            


                                var radios = this._content_elm.querySelectorAll('[data-id="class_Testhtml18"] input[type="radio"]'),
                                    j = 0;
                                for(j; j < radios.length; ++j) {
                                    radios[j].name = 'class_Testhtml18' + this._id;
                                    radios[j].addEventListener('click', function(e) {
                                        let elms = this._content_elm.querySelectorAll('[data-id="class_Testhtml18"] input[type="radio"]'),
                                            i = 0;
                                        for(i;i < elms.length; ++i) {
                                            elms[i].checked = false;
                                        }
                                        e.currentTarget.checked = true;
                                        this['radio'] = e.currentTarget.value;
                                    }.bind(this));
                                }
                                this.setPropertyRadioradio = function(val) {
                                    let elms = this._content_elm.querySelectorAll('[data-id="class_Testhtml18"] input[type="radio"]'),
                                        i = 0;
                                    for(i;i < elms.length; ++i) {
                                        elms[i].checked = elms[i].value == val;
                                    }
                                };
                            

                                var radios = this._content_elm.querySelectorAll('[data-id="class_Testhtml26"] input[type="radio"]'),
                                    j = 0;
                                for(j; j < radios.length; ++j) {
                                    radios[j].name = 'class_Testhtml26' + this._id;
                                    radios[j].addEventListener('click', function(e) {
                                        let elms = this._content_elm.querySelectorAll('[data-id="class_Testhtml26"] input[type="radio"]'),
                                            i = 0;
                                        for(i;i < elms.length; ++i) {
                                            elms[i].checked = false;
                                        }
                                        e.currentTarget.checked = true;
                                        this['radio2'] = e.currentTarget.value;
                                    }.bind(this));
                                }
                                this.setPropertyRadioradio2 = function(val) {
                                    let elms = this._content_elm.querySelectorAll('[data-id="class_Testhtml26"] input[type="radio"]'),
                                        i = 0;
                                    for(i;i < elms.length; ++i) {
                                        elms[i].checked = elms[i].value == val;
                                    }
                                };
                            

                                this.setVisibilitycbox = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id="class_Testhtml26"]');
                                    if(elm) elm.style.display = val ? '' : 'none';
                                };
                            

                                this.setPropertycbox = function(val) {
                                    this._content_elm.querySelector('[data-id="class_Testhtml35"]').innerHTML = val;
                                };
                            

                                this.setPropertyhtml = function(val) {
                                    this._content_elm.querySelector('[data-id="class_Testhtml38"]').innerHTML = val;
                                };
                            

                                this.setPropertyradio2 = function(val) {
                                    this._content_elm.querySelector('[data-id="class_Testhtml41"]').innerHTML = val;
                                };
                            

                                this._each_content['class_Testhtml46'] = [this._content_elm.querySelector('[data-id="class_Testhtml46"]'), 'k', 'v', 'testList'];
                                this.setEachtestList = function(val) {
                                    this.eachCall(this._each_content['class_Testhtml46'],val);
                                }.bind(this);
                            }

      cbox = false;

      radio = "radio2";

      radio2 = "radio23";

      select = 1;

      testList = [
          {
              title:'Hello Dolly',
              text : 'Lorem ipsum'
          },
          {
              title:'Hello Ken',
              text : 'Lorem ipsum2'
          }
      ];

      html = 'hello world';
      click() {
        this.html = this.parent.parentTest;
        this.cbox = !this.cbox;
      }

      input(e) {
          this.select = e.currentTarget.value;
      }

      input2(e) {
          this.radio = e.currentTarget.value;
      }

      loremIpsum(e) {
          this.html = e.currentTarget.value;
      }
  }
;
    var class_Todohtml= class extends Component {

_component_content = `
<Nav></Nav>

<h1>Todo</h1>
<ul data-id="class_Todohtml5" >
    <li>@k - @val.text <a data-id="class_Todohtml7"  data-index="@k" href="javascript:">x</a></li>
</ul>
<div data-id="class_Todohtml11" >
    No entries yet.
</div>

<p>Fill in todo:</p>
<input type="text" data-id="class_Todohtml15" >
<button data-id="class_Todohtml16" >Add</button>

`;
addGeneratedCode() {


                                this._each_content['class_Todohtml5'] = [this._content_elm.querySelector('[data-id="class_Todohtml5"]'), 'k', 'val', 'list'];
                                this.setEachlist = function(val) {
                                    this.eachCall(this._each_content['class_Todohtml5'],val);
                                }.bind(this);
                            
                            var z = 0,
                                elms = this._content_elm.querySelectorAll('[data-id="class_Todohtml7"]');
                            for(z;z < elms.length; ++z) {
                                elms[z].onclick = this.delete.bind(this);
                            }
                            


                                this.setVisibilitylistIsEmpty = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id="class_Todohtml11"]');
                                    if(elm) elm.style.display = val ? '' : 'none';
                                };
                            

                                this._content_elm.querySelector('[data-id="class_Todohtml15"]').addEventListener('input', function(e) {
                                    if(e.currentTarget.type == 'checkbox') {
                                        this['todo'] = e.currentTarget.checked;
                                    } else {
                                        this['todo'] = e.currentTarget.value;
                                    }
                                }.bind(this));
                                this.setPropertyValuetodo = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id="class_Todohtml15"]');
                                    if(elm.type == 'checkbox') {
                                        elm.checked = val==true;
                                    } else {
                                        elm.value = val;
                                    }
                                };
                            
                            var z = 0,
                                elms = this._content_elm.querySelectorAll('[data-id="class_Todohtml16"]');
                            for(z;z < elms.length; ++z) {
                                elms[z].onclick = this.add.bind(this);
                            }
                            
}
        list = [];

        todo = "";

        listIsEmpty = false;

        onPropertyChanged(name, newValue) {
            if(name == 'list') {
                this.listIsEmpty = newValue.length==0;
            }
        }

        delete(e) {
            let index = parseInt(e.currentTarget.dataset.index),
                i = 0,
                newlist = [];
            for(i; i < this.list.length; ++i) {
                if(i!=index) {
                    newlist.push(this.list[i]);
                }
            }

            this.list = newlist;
        }

        add(e) {
            if(this.todo == '') {
                alert("The text cannot be empty");
                return;
            }
            this.list.push({
                text : this.todo
            });
            this.todo = '';
        }
    }
;var RouteMap = {};
RouteMap['App'] = '/';
RouteMap['App2'] = '/test';
RouteMap['Todo'] = '/todo';
;var TagMap = {};
TagMap['Menu'] = 'class_Menuhtml';
TagMap['Nav'] = 'class_Navhtml';
TagMap['Test'] = 'class_Testhtml';
TagMap['App'] = 'class_Apphtml';
TagMap['App2'] = 'class_App2html';
TagMap['Todo'] = 'class_Todohtml';
;