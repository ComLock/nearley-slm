import {Parser} from 'nearley';
import grammar from './grammar';


export function render(inputStr) {
	const parser = new Parser(grammar.ParserRules, grammar.ParserStart);
	const dom = parser.feed(inputStr).results;
	if (dom.length === 0) {
		throw new Error('Found no parsings.');
	}

	if (dom.length > 1) {
		throw new Error('Ambiguous results.');
	}

	//console.log(dom);

	let htmlString = '';
	dom.forEach(el => {
		const {tag, id} = el;
		htmlString += `<${tag} id="${id}"></${tag}>`
	});
	return htmlString;
}


//export default render;
