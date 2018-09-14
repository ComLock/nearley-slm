import test from 'ava';
import {Parser} from 'nearley';
import grammar from './moo';


const PARRALELL_TESTS = [
	['multiplication', '123 * 321', 39483]
];


const parse = (data) => {
	//console.log(JSON.stringify({data}, null, 4));
	//const parser = new Parser(grammar.ParserRules, grammar.ParserStart); // NOTE Fails miserably
	const parser = new Parser(grammar);
	const results = parser.feed(data).results;
	if (results.length === 0) {
		throw new Error('Found no parsings.');
	}

	if (results.length > 1) {
		throw new Error('Ambiguous results.');
	}

	//console.log(JSON.stringify({results}, null, 4));
	return results[0];
};


for (const [title, input, output] of PARRALELL_TESTS) {
	test(
		title,
		(t) => {
		t.true(output === parse(input));
	});
} // for
