// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "slm", "symbols": ["element"]},
    {"name": "slm", "symbols": ["element", {"literal":"\n"}, "element"], "postprocess": d => [d[0]].concat(d[2])},
    {"name": "element$ebnf$1", "symbols": ["idSelector"], "postprocess": id},
    {"name": "element$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "element$ebnf$2", "symbols": ["classes"], "postprocess": id},
    {"name": "element$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "element$ebnf$3", "symbols": ["attributes"], "postprocess": id},
    {"name": "element$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "element$ebnf$4", "symbols": ["js"], "postprocess": id},
    {"name": "element$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "element", "symbols": ["tag", "element$ebnf$1", "element$ebnf$2", "element$ebnf$3", "element$ebnf$4"], "postprocess": d => arrayOfObjectsToObject(d)},
    {"name": "tag$ebnf$1", "symbols": []},
    {"name": "tag$ebnf$1", "symbols": ["tag$ebnf$1", /[a-zA-Z0-9-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "tag", "symbols": [/[a-zA-Z]/, "tag$ebnf$1"], "postprocess": d => ({tag: d[0] + d[1].join('')})},
    {"name": "attributeName$ebnf$1", "symbols": []},
    {"name": "attributeName$ebnf$1", "symbols": ["attributeName$ebnf$1", /[_a-zA-Z0-9-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "attributeName", "symbols": [/[_a-zA-Z]/, "attributeName$ebnf$1"], "postprocess": d => d[0] + d[1].join('')},
    {"name": "idSelector", "symbols": [{"literal":"#"}, "attributeName"], "postprocess": d => ({id: d[1]})},
    {"name": "className$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "className$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "className$ebnf$2", "symbols": []},
    {"name": "className$ebnf$2", "symbols": ["className$ebnf$2", /[_a-zA-Z0-9-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "className", "symbols": ["className$ebnf$1", /[_a-zA-Z]/, "className$ebnf$2"], "postprocess": d => (d[0] || '') + d[1] + d[2].join('')},
    {"name": "classSelector", "symbols": [{"literal":"."}, "className"], "postprocess": d => d[1]},
    {"name": "classes$ebnf$1", "symbols": ["classSelector"]},
    {"name": "classes$ebnf$1", "symbols": ["classes$ebnf$1", "classSelector"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "classes", "symbols": ["classes$ebnf$1"], "postprocess": d => ({classes: d[0].join(" ")})},
    {"name": "attributes$ebnf$1", "symbols": ["attribute"]},
    {"name": "attributes$ebnf$1", "symbols": ["attributes$ebnf$1", "attribute"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "attributes", "symbols": [{"literal":"["}, "attributes$ebnf$1", {"literal":"]"}], "postprocess": d => ({attributes: arrayOfObjectsToObject(d[1])})},
    {"name": "attribute$string$1", "symbols": [{"literal":"="}, {"literal":"\""}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "attribute$ebnf$1", "symbols": []},
    {"name": "attribute$ebnf$1", "symbols": ["attribute$ebnf$1", /[^"]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "attribute$ebnf$2", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "attribute$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "attribute", "symbols": ["attributeName", "attribute$string$1", "attribute$ebnf$1", {"literal":"\""}, "attribute$ebnf$2"], "postprocess": d => ({[d[0]]: d[2].join('')})},
    {"name": "js$ebnf$1", "symbols": [/[^\n]/]},
    {"name": "js$ebnf$1", "symbols": ["js$ebnf$1", /[^\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "js", "symbols": [{"literal":" "}, "js$ebnf$1"], "postprocess": d => ({js: d[1].join('')})}
]
  , ParserStart: "slm"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
