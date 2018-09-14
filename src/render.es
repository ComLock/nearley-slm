import {Parser} from 'nearley';
import {el} from 'render-js/src/html/el.es';
import grammar from './grammar';


function evalInContext(js, context) {
	//console.log(JSON.stringify({js, context}, null, 4));
	return (new Function( "with(this) { return " + js + "}")).call(context);
}


function renderElement(element, model, level = 0) {
	const {
		tag,
		id,
		classes,
		attributes = {},
		js,
		next
	} = element;
	console.log(JSON.stringify({tag, id, classes, attributes, js, next, model}, null, 4));
	if(id) { attributes.id = id; }
	if(classes) { attributes.class = classes; }
	const contents = [];
	if(js) {
		contents.push(evalInContext(js, model));
	}
	if(!next) { return el(tag, attributes, contents); }
	next.forEach(n => {
		if(n.level > level) {
			contents.push(renderElement(n, model, level));
		}
		/*if(n.level === level) {
			contents.push(renderElement(n, model, level));
		}
		if(n.level < level) {
		}*/
	});
	return el(tag, attributes, contents);
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

	console.log(JSON.stringify(dom, null, 4));

	let lines = [];
	dom[0].forEach(element => {
		lines.push(renderElement(element));
	});
	return lines.join("\n");
}


//export default render;
