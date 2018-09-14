main -> line (%newline:+ line):* %newline:* {%
	([first, [...lines]]) => [first, ...lines.map(([n, l]) => l)]
%}

line -> %tab:* %char:+ {% ([tabs, chars]) => ({
	level: tabs.length,
	string: chars.join('')
}) %}

@{%
	const tab = { literal: "\t" };
	//const tab = { test: x => /^\t$/.test(x) };
	//const tabs = { test: x => /^\t+$/.test(x) };
	const newline = { test: x => /^\r?\n$/.test(x) };
	//const newlines = { test: x => /^(\r?\n)+$/.test(x) };
	const char = { test: x => /^[^\n\r\t]$/.test(x) };
%}
