const BSB = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let c_out;
const tc = [1, 2, 3, 4];
let c_in = 0,
    arr = [],
    rsT = 0;
function cb(e) {
    let r = [...e];
    for (let e = r.length - 1; e > 0; e--) {
        const o = Math.floor(Math.random() * (e + 1));
        [r[e], r[o]] = [r[o], r[e]];
    }
    return r;
}
const row = (e, r, o) => -1 === e[r.rowIndex].indexOf(o),
    col = (e, r, o) => !e.some((e) => e[r.colIndex] === o),
    sc = (e, r, o) => {
        const t = r.rowIndex - (r.rowIndex % 2),
            n = r.colIndex - (r.colIndex % 2);
        let l = !0;
        for (let r of [0, 1]) for (let c of [0, 1]) e[t + r][n + c] === o && (l = !1);
        return l;
    },
    sp = (e, r, o) => row(e, r, o) && col(e, r, o) && sc(e, r, o),
    nEC = (e) => {
        const r = { rowIndex: "", colIndex: "" };
        return (
            e.forEach((e, o) => {
                if ("" !== r.colIndex) return;
                let t = e.find((e) => 0 === e);
                void 0 !== t && ((r.rowIndex = o), (r.colIndex = e.indexOf(t)));
            }),
            "" !== r.colIndex && r
        );
    },
    fS = (e) => {
        const r = nEC(e);
        if (!r) return e;
        for (let o of cb(tc)) {
            if ((c_out++, c_out > 2e7)) throw new Error("Recursion Timeout");
            if (sp(e, r, o)) {
                if (((e[r.rowIndex][r.colIndex] = o), fS(e))) return e;
                e[r.rowIndex][r.colIndex] = 0;
            }
        }
        return !1;
    },
    suC = (e) => {
        const r = BSB.map((e) => e.slice());
        return fS(r), r;
    },
    sR = (e, r, o) => {
        0 !== o && (o--, sR(e, r, o));
    },
    sZ = () => {
        let e = Math.floor(16 * Math.random() + 0);
        if (0 == arr.length) arr.push(e), c_in++, sZ();
        else if (-1 == arr.indexOf(e) && c_in < 7) arr.push(e), c_in++, sZ();
        else if (7 !== c_in) sZ();
        else if (7 == c_in) return arr;
    },
    reset = () => {
        (c_in = 0), (arr = []);
    },
    renderBoard = (e) => {
        let r = -1;
        (c_in = 0), (arr = []), sZ();
        const o = suC(),
            t = sZ(),
            n = [];
        for (let e = 0; e < 4; e++) n[e] = [];
        for (let e = 0; e < 4; e++) for (let l = 0; l < 4; l++) r++, n[e].push({ data: -1 == t.indexOf(r) ? 0 : o[e][l], error: 0, success: 0 });
        return { finalResult: o, renderGrid: n, resetTime: rsT++ };
    };
export { renderBoard };
