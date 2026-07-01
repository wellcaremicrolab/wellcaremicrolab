const fs = require('fs');

const logPath = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\15feefa3-166b-4afd-974f-e75c99e3a9e0\\.system_generated\\logs\\transcript_full.jsonl';
const content = fs.readFileSync(logPath, 'utf8');
const lines = content.split('\n');

for (let i = 75; i < Math.min(95, lines.length); i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const obj = JSON.parse(line);
    console.log(`--- Step ${obj.step_index} (${obj.type}, ${obj.source}, Status: ${obj.status}) ---`);
    console.log(obj.content);
    if (obj.tool_calls) {
      console.log('Tool Calls:', JSON.stringify(obj.tool_calls, null, 2));
    }
  } catch (e) {
  }
}
