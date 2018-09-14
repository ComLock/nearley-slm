tag -> [a-zA-Z] [a-zA-Z0-9-]:* {% d => ({tag: d[0] + d[1].join('')}) %}
