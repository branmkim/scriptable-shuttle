const express = require('express');
const app = express();
const port = 3000;

const monthu = require('./monthu.json')
const fri = require('./fri.json')
const weekend = require('./weekend.json')

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

app.use(express.json());

app.get('/api/times', (req, res) => {
    const now = new Date();
    const weekday = weekdays.indexOf(now.toLocaleDateString("en-US", {timeZone: "America/New_York", weekday: "short"}))
    const hour = now.toLocaleTimeString("en-US", {timeZone: "America/New_York", hour12: false, hour: "2-digit"})
    const min = now.toLocaleTimeString("en-US", {timeZone: "America/New_York", hour12: false, minute: "2-digit"})

    let man = null;
    let mtc = null;
    if (weekday <= 3) {
        man = monthu.man;
        mtc = monthu.mtc;
    } else if (weekday == 4) {
        man = fri.man;
        mtc = fri.mtc;
    } else {
        man = weekend.man;
        mtc = weekend.mtc;
    }

    let nextMan = -1;
    let nextMtc = -1;
    for (let i = 0; i < man.length; i++) {
        if (hour < man[i].h || (hour == man[i].h && min < man[i].m)) {
            if (nextMan == -1) nextMan = i;
        }
    }
    for (let i = 0; i < mtc.length; i++) {
        if (hour < mtc[i].h || (hour == mtc[i].h && min < mtc[i].m)) {
            if (nextMtc == -1) nextMtc = i;
        }
    }

    let resMan = [man[nextMan]];
    if (nextMan + 1 < man.length - 1) resMan.push(man[nextMan + 1]);
    if (nextMan + 2 < man.length - 1) resMan.push(man[nextMan + 2]);

    let resMtc = [mtc[nextMtc]];
    if (nextMtc + 1 < mtc.length - 1) resMtc.push(mtc[nextMtc + 1]);
    if (nextMtc + 2 < mtc.length - 1) resMtc.push(mtc[nextMtc + 2]);

    res.json({ resMan, resMtc });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});