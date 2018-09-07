import test from 'ava';
import {render} from '../lib/render';


const MODEL = {
	name: 'John Doe'
};

const PARRALELL_TESTS = [
	//`doctype html`, '<!DOCTYPE html>',
	//['html', '<html></html>'],
	//['body#id1', '<body id="id1"></body>'],
	//['main.className', '<main class="className"></main>'],
	//['main.className1.className2', '<main class="className1 className2"></main>']
	['header#id.className dataAttribute="value" `My name is ${name}.`', '<header class="className" data-attribute="value" id="id">My name is John Doe.</header>']
	/*[`h1
h2`, `<h1></h1>
<h2></h2>`]*/
];


for (const [input, output] of PARRALELL_TESTS) {
	test('\ninput:\t' + input + '\noutput:\t' + output, (t) => {
		t.true(output === render(input, MODEL));
	});
} // for
