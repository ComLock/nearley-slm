js -> " " [^\n]:+ {% d => ({js: d[1].join('')}) %}