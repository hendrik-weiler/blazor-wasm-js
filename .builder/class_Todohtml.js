
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
