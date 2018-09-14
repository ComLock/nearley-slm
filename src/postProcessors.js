const moo = require("moo");

export const lexer = moo.compile({
	tag: /[a-zA-Z][a-zA-Z0-9-]*///,
//	attributeName: /[_a-zA-Z][_a-zA-Z0-9-]*/
});

export const arrayOfObjectsToObject = arrayOfObjects => {
	let obj = {};
	arrayOfObjects.forEach(o => {
		obj = { ...obj, ...o };
	});
	return obj;
};


export const flatten = d => {
	d = d.filter((r) => { return r !== null; });
	return d.reduce(
		(a, b) => {
			return a.concat(b);
		},
		[]
	);
};
