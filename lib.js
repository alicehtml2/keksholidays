const COLORS = {
    bg: '#fdf6e3',
    fg: '#657b83',
    green: '#4E9A06',
    red: '#dc322f',
    yellow: '#b58900',
    orange: '#cb4b16'
}

const NS = {
    SVG: 'http://www.w3.org/2000/svg',
    XLINK: 'http://www.w3.org/1999/xlink'
}

const KEKSHEAD = 'KEKSHEAD';

const init = () => {
    document.body.style.backgroundColor = COLORS.bg;
    const canvas = document.querySelector('.canvas');
    const g = document.createElementNS(NS.SVG, 'g');
    g.setAttributeNS(null, 'color', COLORS.fg);
    g.setAttributeNS(null, 'stroke-width', 2);
    g.setAttributeNS(null, 'transform', 'translate(2,0)')
    canvas.appendChild(g);

    return g;
}

const setAttrs = (elem, attrs) => {
    for (let name in attrs) {
        elem.setAttributeNS(null, name, attrs[name]);
    }
}

const drawUse = (id, attrs) => {
    let use = document.createElementNS(NS.SVG, 'use');

    use.setAttributeNS(NS.XLINK, 'xlink:href', id);

    setAttrs(use, attrs)
    
    return use;
}

const moveElem = (ctx, elem, {x,y}) => {
    ctx.appendChild(elem);
    setTimeout(() => {
        setAttrs(elem, {
            transform: `translate(${x || 0},${y || 0})`
        });
    }, 0);
}

const drawCommit = (x, y) => drawUse('#commit', {
    x: x,
    y: y,
    width: 40,
    height: 40,
});

const drawParent180 = (x, y) => drawUse('#parent-180', {
    x: x - 1,
    y: y,
    width: 21,
    height: 40
});

const drawParent135 = (x, y) => drawUse('#parent-135', {
    x: x - 9.5,
    y: y - 9.5,
    width: 36,
    height: 36
});

const drawKeks = (x, y) => {
    let keks = drawUse('#keks', {
        width: 40,
        height: 40,
        transform: `translate(${x},${y})`
    });

    keks.setAttribute('id', KEKSHEAD);
    keks.style.transition = 'transform 0.5s, opacity 0.5s';

    return keks;
};

const getKeks = () => document.getElementById(KEKSHEAD);

const moveKeks = (ctx, {x, y}) => {
    moveElem(ctx, getKeks(), {x, y})
}

const drawBranch = (data) => {
    let x = - data.width / 2;
    let bottom = [
      [ -5, 19 ].join(','),
      [  0, 25 ].join(','),
      [ +5, 19 ].join(',')
    ];
    let top = [
      [ -5, 1 ].join(','),
      [  0, -5 ].join(','),
      [ +5, 1 ].join(',')
    ];

    let rect = document.createElementNS(NS.SVG, 'rect');
    setAttrs(rect, { x: x, y: 0, width: data.width, height: 20, rx: 2, ry: 2, fill: data.color });

    let text = document.createElementNS(NS.SVG, 'text');
    setAttrs(text, {
        x: 0,
        y: 15,
        'font-size': 16,
        'font-family':
        'PT Sans',
        'text-anchor': 'middle',
        fill: '#fff'
    });
    text.innerHTML = data.name;
    
    let path;
    if (data.bottom) {
        path = drawPath(bottom, data.color)
    } else if (data.top) {
        path = drawPath(top, data.color);
    }

    let g = document.createElementNS(NS.SVG, 'g');
    g.appendChild(drawBunch([
        rect,
        text,
        path
    ]));
    g.style.transition = 'transform 0.5s, opacity 0.5s';

    setAttrs(g, {
        transform: `translate(${data.x || 0}, ${data.y || 0})`
    })

    return g;
}

const drawPath = (path, color) => {
    let p = document.createElementNS(NS.SVG, 'path');
    setAttrs(p, {
        fill: color,
        d: 'M ' + path.join('L ') + ' Z'
    });
    return p;
}

const drawBunch = (elems) => {
    let d = document.createDocumentFragment();
    for (let e of elems) {
        d.appendChild(e)
    }
    return d;
}
