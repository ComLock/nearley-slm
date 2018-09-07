import test from 'ava';
import {render} from '../lib/render';


const PARRALELL_TESTS = {
	'html': '<html></html>',
	'body#id1': '<body id="id1"></body>',
	'main.className': '<main class="className"></main>'
};


for (const [input, output] of Object.entries(PARRALELL_TESTS)) {
	test('\ninput:\t' + input + '\noutput:\t' + output, (t) => {
		t.true(output === render(input));
	});
} // for
