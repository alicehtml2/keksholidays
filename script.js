const ctx = init();

const steps = [];
const branches = {};

document.addEventListener('keypress', e => {
    if (e.keyCode === 32 && steps.length) {
        let step = steps.shift();
        step(ctx);
    }

    console.log(document.getElementById(KEKSHEAD));
});

steps.push((ctx) => {
    let elems = [
        drawCommit(0, 40),
        drawParent180(40, 40),
        drawCommit(60, 40),
        drawParent180(100, 40),
        drawCommit(120, 40)
    ];

    ctx.appendChild(drawBunch(elems));
});

steps.push((ctx) => {
    let keks = drawKeks(120, 40);
    keks.style.opacity = '0';
    
    ctx.appendChild(keks);
    
    setTimeout(() => {
        keks.style.opacity = 1;
    }, 0);
});

steps.push((ctx) => {
    let elems = [
        drawParent180(160, 40),
        drawCommit(180, 40)
    ];

    ctx.appendChild(drawBunch(elems));
    moveKeks(ctx, { x: 180, y: 40 });
})

steps.push((ctx) => {
    moveKeks(ctx, { x: 60, y: 40 });
});

steps.push((ctx) => {
    moveKeks(ctx, { x: 180, y: 40 });
});

steps.push((ctx) => {
    branches.master = drawBranch({
        name: 'master',
        bottom: true,
        color: COLORS.green,
        width: 70,
        x: 200,
        y: 15
    });

    branches.master.style.opacity = '0';
    
    ctx.appendChild(branches.master);
    
    setTimeout(() => {
        branches.master.style.opacity = 1;
    }, 0);
});

steps.push((ctx) => {
    let elems = [
        drawParent180(220, 40),
        drawCommit(240, 40)
    ];

    ctx.appendChild(drawBunch(elems));
    moveKeks(ctx, { x: 240, y: 40 });
    moveElem(ctx, branches.master, { x: 260, y: 15 });
});

steps.push((ctx) => {
    moveKeks(ctx, { x: 120, y: 40 });

    branches.yellowDesign = drawBranch({
        name: 'yellow-design',
        top: true,
        color: COLORS.yellow,
        width: 110,
        x: 140,
        y: 85
    });

    branches.yellowDesign.style.opacity = '0';
    
    ctx.appendChild(branches.yellowDesign);
    
    setTimeout(() => {
        branches.yellowDesign.style.opacity = 1;
    }, 500);
});

steps.push((ctx) => {
    let elems = [
        drawParent135(160, 80),
        drawCommit(180, 100)
    ];

    ctx.appendChild(drawBunch(elems));
    moveKeks(ctx, { x: 180, y: 100 });
    moveElem(ctx, branches.yellowDesign, { x: 200, y: 145 });
});

steps.push((ctx) => {
    moveKeks(ctx, { x: 240, y: 40 });
});

steps.push((ctx) => {
    let elems = [
        drawParent180(280, 40),
        drawCommit(300, 40)
    ];

    ctx.appendChild(drawBunch(elems));
    moveKeks(ctx, { x: 300, y: 40 });
    moveElem(ctx, branches.master, { x: 320, y: 15 });
});

steps.push((ctx) => {
    moveKeks(ctx, { x: 180, y: 100 });
});

steps.push((ctx) => {
    let elems = [
        drawParent180(220, 100),
        drawCommit(240, 100)
    ];

    ctx.appendChild(drawBunch(elems));
    moveKeks(ctx, { x: 240, y: 100 });
    moveElem(ctx, branches.yellowDesign, { x: 260, y: 145 });
});

steps.push((ctx) => {
    let elems = [
        drawParent180(280, 100),
        drawCommit(300, 100)
    ];

    ctx.appendChild(drawBunch(elems));
    moveKeks(ctx, { x: 300, y: 100 });
    moveElem(ctx, branches.yellowDesign, { x: 320, y: 145 });
});

steps.push((ctx) => {
    let elems = [
        drawParent180(340, 40),
        drawCommit(360, 40)
    ];

    ctx.appendChild(drawBunch(elems));
    moveKeks(ctx, { x: 360, y: 40 });
    // moveElem(ctx, branches.yellowDesign, { x: 320, y: 145 });
});

// while (steps.length) {
//     let step = steps.shift();
//     step(ctx);
// }