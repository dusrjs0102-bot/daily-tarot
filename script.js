const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

let stage = 1;
let dropInterval = 1000; // 초기 속도

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10 * stage;
        rowCount *= 2;
        
        // 줄을 깨면 스테이지가 무한 상승하며 속도가 걷잡을 수 없이 빨라짐!
        stage++;
        document.getElementById('stage').innerText = stage;
        
        // 스테이지가 오를수록 떨어지는 속도가 미친듯이 빨라짐 (나중엔 0초가 됨)
        dropInterval = Math.max(20, 1000 - (stage * 150));
        
        // 악랄한 경고 문구 변경
        const msgs = [
            "인간의 손으로는 깰 수 없다.",
            "블록이 눈보다 빠르게 떨어진다!",
            "포기하는 것이 정신 건강에 좋습니다.",
            "무한의 지옥에 오신 것을 환영합니다."
        ];
        document.getElementById('hell-msg').innerText = msgs[Math.floor(Math.random() * msgs.length)];
    }
    updateScore();
}

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    if (type === 'T') return [[0,0,0],[1,1,1],[0,1,0]];
    else if (type === 'O') return [[2,2],[2,2]];
    else if (type === 'L') return [[0,3,0],[0,3,0],[0,3,3]];
    else if (type === 'J') return [[0,4,0],[0,4,0],[4,4,0]];
    else if (type === 'I') return [[0,5,0,0],[0,5,0,0],[0,5,0,0],[0,5,0,0]];
    else if (type === 'S') return [[0,6,6],[6,6,0],[0,0,0]];
    else if (type === 'Z') return [[7,7,0],[0,7,7],[0,0,0]];
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function draw() {
    context.fillStyle = '#1a0000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
    
    // 악랄한 기능: 스테이지 3 이상부터는 좌우로 움직일 때 반대 방향으로 밀어내는 트랩 발동!
    if (stage >= 3 && Math.random() < 0.3) {
        player.pos.x -= dir; 
    }
}

function playerReset() {
    const pieces = 'TJLOSZI';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    
    if (collide(arena, player)) {
        // 죽으면 스테이지를 강제로 리셋하고 더 매운맛으로 시작
        arena.forEach(row => row.fill(0));
        player.score = 0;
        stage = 1;
        dropInterval = 1000;
        document.getElementById('stage').innerText = stage;
        updateScore();
    }
}

function playerRotate(dir) {
    const posX = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = posX;
            return;
        }
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }
    if (dir > 0) matrix.forEach(row => row.reverse());
    else matrix.reverse();
}

let dropCounter = 0;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score').innerText = player.score;
}

const colors = [
    null,
    '#ff0033', 
    '#ff3300', 
    '#ff9900', 
    '#cc00ff', 
    '#ff00ff', 
    '#9900ff', 
    '#ff3366',
];

const arena = createMatrix(12, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') playerMove(-1);
    else if (event.key === 'ArrowRight') playerMove(1);
    else if (event.key === 'ArrowDown') playerDrop();
    else if (event.key === 'ArrowUp') playerRotate(1);
    else if (event.key === ' ') {
        while (!collide(arena, player)) {
            player.pos.y++;
        }
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        dropCounter = 0;
    }
});

playerReset();
updateScore();
update();
