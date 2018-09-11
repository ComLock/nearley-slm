import {Parser} from 'nearley';
import {el} from 'render-js/src/html/el.es';
import grammar from './grammar';


function evalInContext(js, context) {
	//console.log(JSON.stringify({js, context}, null, 4));
	return (new Function( "with(this) { return " + js + "}")).call(context);
}


export function render(template, model = {}) {
	const parser = new Parser(grammar.ParserRules, grammar.ParserStart);
	const dom = parser.feed(template).results;
	if (dom.length === 0) {
		throw new Error('Found no parsings.');
	}

	if (dom.length > 1) {
		throw new Error('Ambiguous results.');
	}

	//console.log(JSON.stringify(dom, null, 4));

	let lines = [];
	dom[0].forEach(entry => {
		const {tag, attributes = {}, classes, id, js} = entry;
		const evaled = js ? evalInContext(js, model) : null;
		//console.log(JSON.stringify({tag, classes, id, attributes, content, evaled, model}, null, 4));
		if(classes) { attributes.class = classes; }
		if(id) { attributes.id = id; }
		const htmlString = el(tag, attributes, evaled);
		lines.push(htmlString);
	});
	return lines.join("\n");
}


//export default render;
