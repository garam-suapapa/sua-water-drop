import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("replaces the dice board with an accessible roulette", () => {
  assert.match(page, /aria-label="보상 룰렛"/);
  assert.match(page, /룰렛 돌리기/);
  assert.match(page, /className={`roulette-wheel/);
  assert.match(page, /Math\.floor\(Math\.random\(\)\*REWARDS\.length\)/);
  assert.doesNotMatch(page, /className="route-line"/);
  assert.match(css, /\.roulette-wheel/);
  assert.match(css, /conic-gradient/);
});

test("keeps all 20 existing rewards and the same earning rules", () => {
  const rewards = page.match(/\["[^"]+","[^"]+"\]/g) ?? [];
  assert.equal(rewards.length, 20);
  assert.match(page, /Math\.min\(3,Math\.floor\(amount\/300\)\)/);
  assert.match(page, /selected===7\?Math\.max\(0,nextUsed-1\):nextUsed/);
  assert.match(page, /하루 최대 3번/);
});

test("aligns every repeated spin with the selected sector", () => {
  assert.match(page, /currentAngle=rotation%360/);
  assert.match(page, /turnToTarget=\(targetAngle-currentAngle\+360\)%360/);
  assert.match(page, /nextRotation=rotation\+1440\+turnToTarget/);
  assert.doesNotMatch(page, /nextRotation=rotation\+1440\+\(360-/);
});

test("the main reset clears every piece of today's progress", () => {
  assert.match(page, /setLogs\(p=>\(\{\.\.\.p,\[today\]:0\}\)\);setEffect\(0\);setCustomOpen\(false\);setCustom\("150"\)/);
  const resetHandler = page.match(/const reset=\(\)=>\{[^}]+\}/)?.[0] ?? "";
  assert.match(resetHandler, /setResult\(null\)/);
  assert.match(resetHandler, /setUsed\(0\)/);
  assert.match(resetHandler, /setRotation\(0\)/);
  assert.match(resetHandler, /setSpinning\(false\)/);
  assert.match(resetHandler, /setRewardOpen\(false\)/);
  assert.match(resetHandler, /setHistory\(\[\]\)/);
  assert.match(resetHandler, /localStorage\.removeItem\(HISTORY_KEY\)/);
  assert.match(resetHandler, /localStorage\.removeItem\("sua-dice-game-v1"\)/);
});

test("centers each icon on the same angle as its reward sector", () => {
  assert.match(css, /\.roulette-label\{[^}]*left:50%;top:50%;width:46px;height:46px/);
  assert.match(css, /rotate\(var\(--angle\)\) translateY\(-215px\) rotate\(calc\(-1 \* var\(--angle\)\)\)/);
  assert.doesNotMatch(css, /\.roulette-label\{[^}]*height:48%/);
});
