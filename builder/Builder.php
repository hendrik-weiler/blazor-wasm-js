<?php
namespace builder;

require_once 'FileGenerator.php';

class Builder
{
    private $files;

    private $tagMap = array();

    private $routeMap = array();

    public function __construct($src)
    {
        $this->files = glob($src.'/**/*.html');
    }

    public function createTagMap() {
        $tagMapFileContent = 'var TagMap = {};'.PHP_EOL;
        foreach($this->tagMap as $tag => $class) {
            $tagMapFileContent .= "TagMap['$tag'] = '$class';" . PHP_EOL;
        }

        file_put_contents('.builder/tagMap.js', $tagMapFileContent);
    }

    public function createRouteMap() {
        $tagMapFileContent = 'var RouteMap = {};'.PHP_EOL;
        foreach($this->routeMap as $tag => $routePath) {
            $tagMapFileContent .= "RouteMap['$tag'] = '$routePath';" . PHP_EOL;
        }

        file_put_contents('.builder/routeMap.js', $tagMapFileContent);
    }

    public function bundleFiles() {
        $bundlePath = '.builder/bundle.js';
        if(file_exists($bundlePath)) unlink($bundlePath);
        $files = glob('.builder/*.js');
        $content = '';
        foreach ($files as $file) {
            $content .= file_get_contents($file) . ';';
        }
        file_put_contents($bundlePath, $content);
    }

    public function build()  {
        if(!is_dir('.builder')) mkdir('.builder');
        foreach ($this->files as $file) {
            $gen = new FileGenerator($file);
            $gen->generate();
            $gen->toFile();

            if(isset($gen->directives['page'])) {
                $this->routeMap[$gen->tag] = $gen->directives['page'];
            }

            $this->tagMap[$gen->tag] = $gen->className;
        }

        $this->createTagMap();
        $this->createRouteMap();
        $this->bundleFiles();

        print 'Build successful';
    }
}