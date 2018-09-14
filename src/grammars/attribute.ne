attribute ->
	attributeName "=\"" [^"]:* "\"" ",":? {% d => ({[d[0]]: d[2].join('')}) %}
