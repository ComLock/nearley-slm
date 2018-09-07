// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "html$string$1", "symbols": [{"literal":"h"}, {"literal":"t"}, {"literal":"m"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "html", "symbols": ["html$string$1"], "postprocess": d => `<${d}></${d}>`}
]
  , ParserStart: "html"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
