import fs from 'fs';
import ejs from 'ejs';

const isDev = process.env.NODE_ENV === "development"

function getFiles(dir) {
    return fs.readdirSync(dir).map (f => `/${dir}/${f}`);
}

// helps pick up heterogeneity in sizing/positioning during testing
function shuffle(arr) {
  if (isDev) {
    for (let current = 0; current < arr.length; current++) {
      const random = Math.floor(Math.random() * current);
      [arr[current], arr[random]] = [arr[random], arr[current]];
    }
  }
  return arr;
}

const job = {}
for (const type of ['healer', 'tank', 'melee', 'ranged', 'caster', 'limited']) {
    job[type] = shuffle(getFiles(`icons/job/${type}`));
}

const role = shuffle(getFiles('icons/role'));

const misc = shuffle(getFiles('icons/misc'));

const data = { ...job, role, misc };

const outFile = isDev ? 'index-dev.html' : 'index.html';

ejs.renderFile('build/index.ejs', data, { root: '.'}, (err, html) => {
    if (err) {
        throw Error(err);
    } else {
        fs.writeFileSync(outFile, html);
    }
});
