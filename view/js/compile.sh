#!/bin/sh

cd src;

java -jar ../../../bin/compiler.jar --compilation_level=SIMPLE_OPTIMIZATIONS \
	--js=browser.js --js=connection.js --js=stack.js \
	--js=function.js --js=model.js --js=player.js --js=segment.js \
	--js=setvideourl.js --js=timedevent.js --js=raphael.js --js=theme.js \
	--js_output_file=../go.js

# use this to load IE canvas support -- skipped since IE still have problems with HTML5 video (sigh)
#--js=excanvas.js 

