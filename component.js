class Component {

    parent = null;

    _content_elm = null;

    _property_objects_save = {};

    _component_content = '';

    _each_content = {};

    _id = 0;

    addGeneratedCode() {}

    onInitialized() {}

    onPropertyChanged(name, newValues) {}

    _timeout_id = 0;

    extractPlaceholders(text) {
        let placeholders = [],
            i = 0,
            char,
            inPlaceholder = false,
            placeholderName;

        for (i; i < text.length; ++i) {
            char = text[i];

            if(inPlaceholder
                && (char == ' ' || char == '<'  || char == "\t" || char == '"')) {
                inPlaceholder = false;
                placeholders.push(placeholderName);
            }

            if(inPlaceholder) {
                placeholderName += char;
            }

            if(char == '@') {
                inPlaceholder = true;
                placeholderName = '';
            }
        }

        return placeholders;
    }

    eachCall(entry, newValue) {

        let elm = entry[0];
        if(!elm.__template__) {
            elm.__template__ = elm.innerHTML;
        }

        let html = elm.__template__,
            htmlCopy,
            key,
            value,
            keyName = entry[1],
            valueName = entry[2],
            result = '',
            placeholders,
            placeholder,
            i;
        for(key in newValue) {
            value = newValue[key];
            htmlCopy = ''+html;
            placeholders = this.extractPlaceholders(htmlCopy);
            htmlCopy = htmlCopy.replaceAll('@'+keyName, key);
            for(i=0; i < placeholders.length; ++i) {
                placeholder = placeholders[i];
                if(placeholder==keyName) continue;
                htmlCopy = htmlCopy.replaceAll('@'+placeholder, new Function(valueName,'return '+placeholder)(value));
            }
            result += htmlCopy;
        }
        elm.innerHTML = result;
        this.addGeneratedCode();//refresh events
    }

    isProperty(key) {
        return typeof this[key] != 'function'
            && key != 'propertyObjectsSave'
            && key != '_timeout_id'
            && key != '_component_content'
            && key != '_property_objects_save'
            && key != '_content_elm'
            && key != 'parent'
            && key != '_id'
            && key != '_each_content';
    }

    callSetterFunctions(key) {
        if(typeof this['setProperty'+key] == 'function') {
            this['setProperty'+key](this[key]);
        }
        if(typeof this['setPropertyValue'+key] == 'function') {
            this['setPropertyValue'+key](this[key]);
        }
        if(typeof this['setPropertyRadio'+key] == 'function') {
            this['setPropertyRadio'+key](this[key]);
        }
        if(typeof this['setVisibility'+key] == 'function') {
            this['setVisibility'+key](this[key]);
        }
        if(typeof this['setEach'+key] == 'function') {
            this['setEach'+key](this[key]);
        }
        if(typeof this['setClass'+key] == 'function') {
            this['setClass'+key](this[key]);
        }
    }

    watchProperties() {
        for(let key in this) {
            if (this.isProperty(key)) {
                if(Array.isArray(this[key])) {
                    this._property_objects_save[key] = this[key].slice();
                } else {
                    this._property_objects_save[key] = this[key];
                }
                this.callSetterFunctions(key);
                this.onPropertyChanged(key, this._property_objects_save[key]);
            }
        }
        this._timeout_id = setInterval(function () {
            for(let key in this) {
                if(this.isProperty(key)) {
                    if(!Array.isArray(this[key]) && this[key] != this._property_objects_save[key]
                        || Array.isArray(this[key]) && typeof this._property_objects_save[key] != 'undefined' && this[key].length != this._property_objects_save[key].length) {
                        if(Array.isArray(this[key])) {
                            this._property_objects_save[key] = this[key].slice();
                        } else {
                            this._property_objects_save[key] = this[key];
                        }
                        this.callSetterFunctions(key);
                        this.onPropertyChanged(key, this._property_objects_save[key]);
                    }
                }
            }
        }.bind(this),0);
    }

    createGuid() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    render(contentElement) {
        this._content_elm = contentElement;
        this._content_elm.classList.add('component');
        this._id = this.createGuid();
        this._component_content = this._component_content.replace(/@id@/g,this._id);
        contentElement.innerHTML = this._component_content;
        this.addGeneratedCode();
        this.watchProperties();
        this.lookForComponents();
        this.onInitialized();
    }

    lookForComponents() {
        for (let tag in TagMap) {
            let elements = this._content_elm.querySelectorAll(tag);
            for (let i = 0; i < elements.length; ++i) {
                let component = new window[TagMap[tag]]();
                component.parent = this;
                component.render(elements[i]);
                window.framework.currentInstances.push(component);
            }
        }
    }

    destroy() {
        clearInterval(this._timeout_id);
    }
}