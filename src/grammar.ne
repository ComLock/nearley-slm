@{%
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
%}

element ->
	tag
	idSelector:?
	classSelector:? {% d => arrayOfObjectsToObject(d) %}

attributeName -> [_a-zA-Z] [_a-zA-Z0-9-]:* {% d => d[0] + d[1].join('') %}

tag -> [a-zA-Z]:+ {% a => ({tag: a[0].join('')}) %}

idSelector -> "#" attributeName {% a => ({id: a[1]}) %}

className -> "-":? [_a-zA-Z] [_a-zA-Z0-9-]:* {% d => (d[0] || '') + d[1] + d[2].join('') %}

classSelector -> "." className {% d => ({classes: d[1]}) %}
