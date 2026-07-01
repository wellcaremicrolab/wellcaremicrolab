const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\15feefa3-166b-4afd-974f-e75c99e3a9e0\\.system_generated\\logs\\transcript_full.jsonl';
if (!fs.existsSync(logPath)) {
  console.log('Log file not found');
  process.exit(1);
}

const content = fs.readFileSync(logPath, 'utf8');
const lines = content.split('\n');

console.log(`Total lines: ${lines.length}`);
for (let i = 0; i < Math.min(331, lines.length); i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const tc of obj.tool_calls) {
        if (tc.name === 'write_to_file' || tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content') {
          console.log(`Step ${obj.step_index} (${obj.type}): ${tc.name} -> ${tc.args.TargetFile || tc.args.TargetContent}`);
        }
      }
    }
  } catch (e) {
    // Ignore lines that are not valid JSON or parsing errors
  }
}
