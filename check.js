const fs = require('fs');

try {
  const content = fs.readFileSync('app.js', 'utf8');
  
  // Count braces
  let openBraces = 0;
  let closeBraces = 0;
  let openParens = 0;
  let closeParens = 0;
  let openBrackets = 0;
  let closeBrackets = 0;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === '{') openBraces++;
    else if (char === '}') closeBraces++;
    else if (char === '(') openParens++;
    else if (char === ')') closeParens++;
    else if (char === '[') openBrackets++;
    else if (char === ']') closeBrackets++;
  }
  
  console.log(`Braces: Open = ${openBraces}, Close = ${closeBraces}, Diff = ${openBraces - closeBraces}`);
  console.log(`Parens: Open = ${openParens}, Close = ${closeParens}, Diff = ${openParens - closeParens}`);
  console.log(`Brackets: Open = ${openBrackets}, Close = ${closeBrackets}, Diff = ${openBrackets - closeBrackets}`);
  
  // Check JSX tag opening and closing
  const openTags = (content.match(/<\w+/g) || []).length;
  const closeTags = (content.match(/<\/\w+/g) || []).length;
  const selfClosing = (content.match(/\/\s*>/g) || []).length;
  console.log(`Tags: OpenTags = ${openTags}, CloseTags = ${closeTags}, SelfClosing = ${selfClosing}, Unclosed estimation = ${openTags - (closeTags + selfClosing)}`);

} catch (err) {
  console.error("Check script failed:", err);
}
