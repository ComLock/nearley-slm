className -> "-":? [_a-zA-Z] [_a-zA-Z0-9-]:* {% d => (d[0] || '') + d[1] + d[2].join('') %}
