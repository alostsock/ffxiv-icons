import fs from 'fs';
import ejs from 'ejs';

function getFiles(dir) {
    return fs.readdirSync(dir).map (f => `/${dir}/${f}`);
}

// helps pick up heterogeneity in sizing/positioning
function shuffle(arr) {
  for (let current = 0; current < arr.length; current++) {
    const random = Math.floor(Math.random() * current);
    [arr[current], arr[random]] = [arr[random], arr[current]];
  }
  return arr;
}

const job = {}
for (const type of ['healer', 'tank', 'melee', 'ranged', 'caster', 'limited']) {
    job[type] = shuffle(getFiles(`icons/job/${type}`));
}

const role = shuffle(getFiles('icons/role'));

const data = { ...job, role };

ejs.renderFile('build/index.ejs', data, { root: '.'}, (err, html) => {
    if (err) {
        throw Error(err);
    } else {
        fs.writeFileSync('index.html', html);
    }
});
