@{%
	//const moo = require("moo");

	/*const lexer = moo.compile({
		newline: /\n/
	});*/

	const arrayOfObjectsToObject = arrayOfObjects => {
		let obj = {};
		arrayOfObjects.forEach(o => {
			obj = { ...obj, ...o };
		});
		return obj;
	};

	const flatten = d => {
		d = d.filter((r) => { return r !== null; });
		return d.reduce(
			(a, b) => {
				return a.concat(b);
			},
			[]
		);
	};
%}

#@lexer lexer

slm ->
	element | element "\n" element {% d => [d[0]].concat(d[2]) %}
#	"doctype html":? {% d => {tag: '!DOCTYPE', void: 'true', attrs: {html:null}} %}

element ->
	tag
	idSelector:?
	classSelector:?
	attribute:?
	content:? {% d => arrayOfObjectsToObject(d) %}

tag -> [a-zA-Z] [a-zA-Z0-9-]:* {% d => ({tag: d[0] + d[1].join('')}) %}

attributeName -> [_a-zA-Z] [_a-zA-Z0-9-]:* {% d => d[0] + d[1].join('') %}

idSelector -> "#" attributeName {% d => ({id: d[1]}) %}

className -> "-":? [_a-zA-Z] [_a-zA-Z0-9-]:* {% d => (d[0] || '') + d[1] + d[2].join('') %}

classSelector -> "." className {% d => ({classes: d[1]}) %}

attribute ->
	" " attributeName "=\"" [^"]:* "\"" {% d => ({attributes: {[d[1]]: d[3].join('')}}) %}

content -> " " [^"]:+ {% d => ({content: d[1].join('')}) %}
