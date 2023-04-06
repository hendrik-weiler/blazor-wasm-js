<?php
namespace builder;

class FileGenerator {

    private $content;

    private $scriptContent;

    private $htmlContent;

    public $className;

    public $tag;

    private $events = array();

    public $directives = array();

    private $tagCounter = 0;
    public function __construct($filepath)
    {
        if(file_exists($filepath)) {
            $this->content = file_get_contents($filepath);

            $pathParts = pathinfo($filepath);
            $this->className = 'class_'.$this->clean($pathParts['basename']);
            $this->tag = str_replace('.html','',$pathParts['basename']);
        } else {
            throw new \Exception("Could not find file in path: $filepath");
        }
    }

    function clean($string) {
        $string = str_replace(' ', '_', $string); // Replaces all spaces with hyphens.

        return preg_replace('/[^A-Za-z0-9]/', '', $string); // Removes special chars.
    }

    private function peek($data, $index, $amount) {
        $content = '';
        $max = $index+$amount;
        if($max > strlen($data)) return $content;
        for ($i=$index; $i < $max; $i++) {
            $content .= $data[$i];
        }
        return $content;
    }

    private function alterScript() {
        $alteredScript = '';
        for ($i=0; $i < strlen($this->scriptContent); $i++) {
            $key = $this->scriptContent[$i];

            if($this->peek($this->scriptContent, $i, 4) == 'code') {
                $alteredScript .= 'var ' . $this->className;
                $i+=4;
                continue;
            }

            if($this->peek($this->scriptContent, $i, 7) == 'class {') {
                $alteredScript .= 'class extends Component {'.PHP_EOL;
                $alteredScript .= PHP_EOL . '_component_content = `' . $this->htmlContent . '`;' . PHP_EOL;
                $alteredScript .= 'addGeneratedCode() {'.PHP_EOL;
                foreach ($this->events as $id => $events) {
                    foreach ($events as $name => $value) {
                        if($name == 'each') {

                            preg_match('#([\w]+),([\w]+) in ([\w\_\.]+)#',$value, $matches);

                            $propertyValue = $matches[3];
                            $keyValue = $matches[1];
                            $valueValue = $matches[2];
                            $alteredScript .= PHP_EOL . "
                                this._each_content['$id'] = [this._content_elm.querySelector('[data-id=\"$id\"]'), '$keyValue', '$valueValue', '$propertyValue'];
                                this.setEach$propertyValue = function(val) {
                                    this.eachCall(this._each_content['$id'],val);
                                }.bind(this);
                            ";
                        } else if($name == 'bind-radio') {
                            $alteredScript .= PHP_EOL . "
                                var radios = this._content_elm.querySelectorAll('[data-id=\"$id\"] input[type=\"radio\"]'),
                                    j = 0;
                                for(j; j < radios.length; ++j) {
                                    radios[j].name = '$id' + this._id;
                                    radios[j].addEventListener('click', function(e) {
                                        let elms = this._content_elm.querySelectorAll('[data-id=\"$id\"] input[type=\"radio\"]'),
                                            i = 0;
                                        for(i;i < elms.length; ++i) {
                                            elms[i].checked = false;
                                        }
                                        e.currentTarget.checked = true;
                                        this['$value'] = e.currentTarget.value;
                                    }.bind(this));
                                }
                                this.setPropertyRadio$value = function(val) {
                                    let elms = this._content_elm.querySelectorAll('[data-id=\"$id\"] input[type=\"radio\"]'),
                                        i = 0;
                                    for(i;i < elms.length; ++i) {
                                        elms[i].checked = elms[i].value == val;
                                    }
                                };
                            ";
                        } else if($name == 'bind-value') {
                            $alteredScript .= PHP_EOL . "
                                this._content_elm.querySelector('[data-id=\"$id\"]').addEventListener('input', function(e) {
                                    if(e.currentTarget.type == 'checkbox') {
                                        this['$value'] = e.currentTarget.checked;
                                    } else {
                                        this['$value'] = e.currentTarget.value;
                                    }
                                }.bind(this));
                                this.setPropertyValue$value = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id=\"" . $id . "\"]');
                                    if(elm.type == 'checkbox') {
                                        elm.checked = val==true;
                                    } else {
                                        elm.value = val;
                                    }
                                };
                            ";
                        } else if($name == 'show') {
                            $alteredScript .= PHP_EOL . "
                                this.setVisibility$value = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id=\"" . $id . "\"]');
                                    if(elm) elm.style.display = val ? '' : 'none';
                                };
                            ";
                        } else if($name == 'class') {
                            $alteredScript .= PHP_EOL . "
                                this.setClass$value = function(val) {
                                    let elm = this._content_elm.querySelector('[data-id=\"" . $id . "\"]');
                                    if(elm) elm.className = val;
                                };
                            ";
                        } else if($name == 'bind-html') {
                            $alteredScript .= PHP_EOL . "
                                this.setProperty$value = function(val) {
                                    this._content_elm.querySelector('[data-id=\"" . $id . "\"]').innerHTML = val;
                                };
                            ";
                        } else {
                            $alteredScript .= "
                            var z = 0,
                                elms = this._content_elm.querySelectorAll('[data-id=\"$id\"]');
                            for(z;z < elms.length; ++z) {
                                elms[z].on$name = this.$value.bind(this);
                            }
                            ".PHP_EOL;
                        }
                    }
                }
                $alteredScript .= '}' . PHP_EOL;
                $i+=7;
                continue;
            }

            $alteredScript .= $key;
        }

        return $alteredScript;
    }

    private function findPropertyValue($index) {
        $inValue = false;
        $value = '';
        for ($i=$index; $i < strlen($this->htmlContent); $i++) {
            $key = $this->htmlContent[$i];

            if($key == '"' && $inValue) {
                break;
            }

            if($inValue) {
                $value .= $key;
            }

            if($key == '"') {
                $inValue = true;
            }


        }
        return $value;
    }

    private function checkForDuplicateId($id, $html) {
        $theid = 'data-id="' . $id . '" ';
        if(preg_match('#'.$theid.'#', $html)) {
            return '';
        }
        return $theid;
    }

    private function alterHtml() {
        $alteredHtml = '';
        $id = null;
        for ($i=0; $i < strlen($this->htmlContent); $i++) {
            $key = $this->htmlContent[$i];

            if($key == '<') {
                $id = null;
                $this->tagCounter++;
            }

            if($key == '@' && $this->peek($this->htmlContent, $i, 5) == '@page') {
                $this->directives['page'] = $this->findPropertyValue($i+5);
                $i+=6 + strlen($this->directives['page']) + 2;
                continue;
            }

            if($this->peek($this->htmlContent, $i, 5) == '@each') {
                $id = $this->className . $this->tagCounter;
                if(!isset($this->events[$id])) {
                    $this->events[$id] = array();
                    $alteredHtml .= $this->checkForDuplicateId($id, $alteredHtml);
                }
                $this->events[$id]['each'] = $this->findPropertyValue($i+5);
                $i+=5 + strlen($this->events[$id]['each']) + 2;
                continue;
            }

            if($this->peek($this->htmlContent, $i, 6) == '@class') {
                $id = $this->className . $this->tagCounter;
                if(!isset($this->events[$id])) {
                    $this->events[$id] = array();
                    $alteredHtml .= $this->checkForDuplicateId($id, $alteredHtml);
                }
                $this->events[$id]['class'] = $this->findPropertyValue($i+6);
                $i+=6 + strlen($this->events[$id]['class']) + 2;
                continue;
            }

            if($this->peek($this->htmlContent, $i, 5) == '@show') {
                $id = $this->className . $this->tagCounter;
                if(!isset($this->events[$id])) {
                    $this->events[$id] = array();
                    $alteredHtml .= $this->checkForDuplicateId($id, $alteredHtml);
                }
                $this->events[$id]['show'] = $this->findPropertyValue($i+5);
                $i+=5 + strlen($this->events[$id]['show']) + 2;
                continue;
            }

            if($this->peek($this->htmlContent, $i, 8) == '@onclick') {
                $id = $this->className . $this->tagCounter;
                if(!isset($this->events[$id])) {
                    $this->events[$id] = array();
                    $alteredHtml .= $this->checkForDuplicateId($id, $alteredHtml);
                }
                $this->events[$id]['click'] = $this->findPropertyValue($i+8);
                $i+=8 + strlen($this->events[$id]['click']) + 2;
                continue;
            }

            if($this->peek($this->htmlContent, $i, 8) == '@oninput') {
                $id = $this->className . $this->tagCounter;
                if(!isset($this->events[$id])) {
                    $this->events[$id] = array();
                    $alteredHtml .= $this->checkForDuplicateId($id, $alteredHtml);
                }
                $this->events[$id]['input'] = $this->findPropertyValue($i+8);
                $i+=8 + strlen($this->events[$id]['input']) + 2;
                continue;
            }

            if($this->peek($this->htmlContent, $i, 10) == '@bind-html') {
                $id = $this->className . $this->tagCounter;
                if(!isset($this->events[$id])) {
                    $this->events[$id] = array();
                    $alteredHtml .= $this->checkForDuplicateId($id, $alteredHtml);
                }
                $this->events[$id]['bind-html'] = $this->findPropertyValue($i+8);
                $i+=10 + strlen($this->events[$id]['bind-html']) + 2;
                continue;
            }

            if($this->peek($this->htmlContent, $i, 11) == '@bind-value') {
                $id = $this->className . $this->tagCounter;
                if(!isset($this->events[$id])) {
                    $this->events[$id] = array();
                    $alteredHtml .= $this->checkForDuplicateId($id, $alteredHtml);
                }
                $this->events[$id]['bind-value'] = $this->findPropertyValue($i+9);
                $i+=11 + strlen($this->events[$id]['bind-value']) + 2;
                continue;
            }

            if($this->peek($this->htmlContent, $i, 11) == '@bind-radio') {
                $id = $this->className . $this->tagCounter;
                if(!isset($this->events[$id])) {
                    $this->events[$id] = array();
                    $alteredHtml .= $this->checkForDuplicateId($id, $alteredHtml);
                }
                $this->events[$id]['bind-radio'] = $this->findPropertyValue($i+9);
                $i+=11 + strlen($this->events[$id]['bind-radio']) + 2;
                continue;
            }

            $alteredHtml .= $key;
        }
        return $alteredHtml;
    }

    private function collectParts() {
        $this->scriptContent = '';
        $this->htmlContent = '';
        $inScript = false;
        for ($i=0; $i < strlen($this->content); $i++) {
            $key = $this->content[$i];

            if($key == '<' && $this->peek($this->content,$i,9) == '</script>') {
                $i += 8;
                $inScript = false;
                continue;
            }

            if($key == '<' && $this->peek($this->content,$i,7) == '<script') {
                $i += 7;
                $inScript = true;
                continue;
            }

            if($inScript) {
                $this->scriptContent .= $key;
            } else {
                $this->htmlContent .= $key;
            }

        }
    }

    public function generate() {
        $this->collectParts();
        $this->htmlContent = $this->alterHtml();
        $this->scriptContent = $this->alterScript();
        //print $this->scriptContent;
        //print PHP_EOL.'---'.PHP_EOL;
        //print $this->htmlContent;
    }

    public function toFile() {
        file_put_contents('.builder/' . $this->className . '.js', $this->scriptContent);
    }
}