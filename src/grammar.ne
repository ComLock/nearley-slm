@{% const {
	arrayOfObjectsToObject,
	lexer
} = require('./postProcessors.js');
/*const {indented} = require('./indented.js');*/%}
@include "grammars/attribute.ne"
@include "grammars/attributeName.ne"
@include "grammars/attributes.ne"
@include "grammars/classes.ne"
@include "grammars/className.ne"
@include "grammars/classSelector.ne"
@include "grammars/element.ne"
@include "grammars/idSelector.ne"
@include "grammars/js.ne"
@include "grammars/tag.ne"
@lexer lexer

#siblings
#children
#uncle
#list
#hierarchy

#level0 -> "\n" element (level0 | level1):?
#level1 -> "\n" "\t" element (level0 | level1 | level2 ):?
#level2 -> "\n" "\t\t" element (level0 | level1 | level2 | level3):?

slm ->
# %tag {% tag => ({tag: tag}) %}
#	stream
	element | element "\n" element {% d => [d[0]].concat(d[2]) %}
#	"doctype html":? {% d => {tag: '!DOCTYPE', void: 'true', attrs: {html:null}} %}

stream -> element "\n" "\t":? element {% d =>
	arrayOfObjectsToObject([d[0],{level: d[2].length}, {next: d[3]}]) %}
