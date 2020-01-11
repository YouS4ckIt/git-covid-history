import { execSync } from "child_process";
const asciiArt = [
  " ####   ####   #   #  ###   ####   #    ####",
  "#       #   #  #   #   #    #   #   #  #   #",
  "#       #   #   # #    #    #   #   #  #   #",
  "#       #   #   # #    #    #   #   #  #####",
  "#       #   #   # #    #    #   #   #      #",
  "#       #   #    #     #    #   #   #      #",
  " ####   ####     #    ###   ####    #  ####",
];
function findFirstSunday(year) {
  const start = new Date(year, 0, 1); // January 1st of that year
  const dayOfWeek = start.getDay(); // 0=Sunday, 1=Monday, etc.
  start.setDate(start.getDate() + ((7 - dayOfWeek) % 7));
  return start;
}
function extractOffsets(artLines) {
  const offsets = [];
  for (let row = 0; row < artLines.length; row++) {
    const line = artLines[row];
    for (let col = 0; col < line.length; col++) {
      if (line[col] === "#") {
        offsets.push(col * 7 + row);
      }
    }
  }
  return offsets;
}
function offsetsToDates(year, offsets) {
  const firstSunday = findFirstSunday(year);
  const results = [];
  for (const offset of offsets) {
    const d = new Date(firstSunday.getTime());
    d.setDate(d.getDate() + offset);
    results.push(d);
  }
  return results;
}

function makeCommitsOnDates(dates) {
  for (const dt of dates) {
    const dateString = dt.toString().split("(")[0].trim();
    const command = `git commit --allow-empty --date="${dateString}" -m "Commit on ${dt.toDateString()}"`;
    console.log("Running:", command);
    execSync(command);
  }
}

// MAIN EXECUTION:
// ---------------------------------------------------
const YEAR = 2020;
const dayOffsets = extractOffsets(asciiArt);
const commitDates = offsetsToDates(YEAR, dayOffsets);
makeCommitsOnDates(commitDates);
