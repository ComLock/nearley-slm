import test from 'ava';
import render from '../lib/render';


const PARRALELL_TESTS = {
	'html': '<html></html>'
};


for (const [input, output] of Object.entries(PARRALELL_TESTS)) {
	test('\ninput:\t' + input + '\noutput:\t' + output, (t) => {
		t.true(output === render(input));
	});
} // for
