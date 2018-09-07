import {Parser} from 'nearley';
import grammar from './grammar';


export default function render(inputStr) {
	const parser = new Parser(grammar.ParserRules, grammar.ParserStart);
	const results = parser.feed(inputStr).results;
	if (results.length === 0) {
		throw new Error('Found no parsings.');
	}

	if (results.length > 1) {
		throw new Error('Ambiguous results.');
	}

	return results[0];
}
