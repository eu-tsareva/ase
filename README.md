```
ASE
|
---	data	// json files with data for nunjucks
--- src
	|
	--- img
	--- js
		|
		--- materialize 
		--- partials	// react files
		--- bundle.js	// all react files combined together
		--- init.js  
		--- jquery.js
		--- main.js 	// imports all used js modules
	--- style
		|
		--- materialize
		--- *.scss	// override materialize styles
		--- main.scss	// imports all used styles
	--- pages
		|
		--- partials // nunjucks parts
		*.html 

gulp-nunjucks-render рендерит все страницы с указанными параметрами. 
properties.js - скрипт для поиска параметров для каждой страницы
```
