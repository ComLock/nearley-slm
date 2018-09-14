@{%
const moo = require("moo");

const lexer = moo.compile({
	char:    /[^\n\r\t]/,
	//chars:    /[^\n\r\t]+/,
	newline: { match: /\r?\n/, lineBreaks: true },
	tab:     /\t/,
	//tabs:    /\t+/,
});
%}
@lexer lexer

main -> %newline:* line (%newline:+ line):* %newline:* {%
	([a, first, [...lines]]) => arrayToHierarchy([first, ...lines.map(([n, l]) => l)])
%}

line -> %tab:* %char:+ {% ([tabs, chars]) => {
	//console.log(JSON.stringify({tabs, chars}, null, 4));
	return {
		//level: tabs ? tabs.length : 0,
		level: tabs.length,
		string: chars.join('')
	};
} %}

# Rule slower than using lexer
#chars -> [^\n\r\t]:+ {% ([chars]) => chars.join('') %}

@{%
	// Custom token matchers (slower than using moo)
	//const tab = { literal: "\t" };
	//const tab = { test: x => /^\t$/.test(x) };
	//const tabs = { test: x => /^\t+$/.test(x) };

	//const newline = { test: x => /^\r?\n$/.test(x) };
	//const newlines = { test: x => /^(\r?\n)+$/.test(x) };

	//const char = { test: x => /^[^\n\r\t]$/.test(x) };
	//const chars = { test: x => /^[^\n\r\t]+$/.test(x) };

	const takeChildren = (lines) => {
		const children = [];
		while(lines.length) {
			let line = lines.shift();
			if (!lines[0]) {
				//console.log('There are no more lines, which means I have no children:', JSON.stringify({line}, null, 4));
				children.push({string: line.string});
				return children; //break;
			}
			if (lines[0].level<line.level) {
				//console.log('Next is an ancestor sibling, which means I have no children: ', JSON.stringify({line, nextLine: lines[0]}, null, 4));
				children.push({string: line.string});
				return children; //break;
			}
			if (lines[0].level===line.level) {
				//console.log('Next is a sibling, which means I have no children: ', JSON.stringify({line, nextLine: lines[0]}, null, 4));
				children.push({string: line.string});
			} else if (lines[0].level>line.level) {
				//console.log('Next is a child: ', JSON.stringify({line, nextLine: lines[0]}, null, 4));
				children.push({string: line.string, children: takeChildren(lines)}) // recurse
			}
		} // while
		// At this point either there are no more lines to process, or the next line if one or more levels up.
		//console.log(JSON.stringify({children}, null, 4));
		return children;
	};

	const arrayToHierarchy = lines => {
		//console.log(JSON.stringify({lines}, null, 4));
		if (!lines) {return [];}
		const hier = [];
		while (lines.length) {
			const line = lines.shift(); // Take the next line, which might be the last line...
			if(
				!lines.length // There are no more lines, so this has no children.
				|| lines[0].level===line.level // Next line is same level, so this has no children.
			) {
				hier.push({string: line.string});
			} else if (lines[0].level>line.level) { // Nextline is a child of the current line.
				hier.push({string: line.string, children: takeChildren(lines)})
			} else {
				console.error('Unhandeled branch!');
				throw new Error('Unhandeled branch!');
			}
			// At this point there are either no more lines to process, or the next line is on the same (root) level.
		} // while
		return hier;
	};
%}
