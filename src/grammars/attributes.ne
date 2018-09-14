attributes -> "[" attribute:+ "]" {% d => ({attributes: arrayOfObjectsToObject(d[1])}) %}
