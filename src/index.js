import player from './pers/player';
import Enemy from './pers/enemy';
import powerdot from './pers/powerdot';
import render from './lib/render';
import move from './lib/move';
import enemyMove from './lib/enemymove';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const enemy = Enemy();
let data = {
	pscore: 0,
	gscore: 0
};

const logicEnemy = {
	showEnemy: false
};

const keyClick = {};

document.addEventListener('keydown', event => {
	keyClick[event.keyCode] = true;
	move(keyClick, player, canvas);
});

document.addEventListener('keyup', event => {
	delete keyClick[event.keyCode];
});

const resizeCanvas = () => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	enemyMove(enemy, player, powerdot, canvas, logicEnemy, data);
	render(ctx, canvas, player, enemy, powerdot, data, img, logicEnemy);
	requestAnimationFrame(resizeCanvas);
};

document.querySelector('body').appendChild(canvas);

const img = new Image();
img.src = 'image/pac.png';
img.onload = () => {
	//window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
};

//resizeCanvas();