import random from './random';

let showEnemy = false;
export default (enemy, player, powerdot, canvas, logicEnemy, data) => {
	if (!logicEnemy.showEnemy) {
		//создание нового врага с разным цветом картинки
		enemy.pacX = random(5) * 64;
		enemy.speed = random(3);
		enemy.x = random(canvas.width - 62);
		enemy.y = random(canvas.height - 62);
		logicEnemy.showEnemy = true;
	}
	
	//логика отрисовки, когда 0, набирается новый запас передвижения, в котором будет новая локика движения соперника
	if (enemy.moving <= 0) {
		//получили запас хода
		enemy.moving = random(10) * 3;
		//задали рандомную скорость
		enemy.speed = random(3);
		//смещение относительно координат обнуляем
		enemy.dirX = 0;
		enemy.dirY = 0;
		
		//если енергия сьедена, то противник убегает
		if (powerdot.ghosteat) {
			enemy.speed = -enemy.speed;
		}
		
		//через раз будут меняться координаты то горизонтальные, то вертикальные
		if (enemy.moving % 2) {
			enemy.dirX = player.x < enemy.x ? -enemy.speed : enemy.speed;
		} else {
			enemy.dirY = player.y < enemy.y ? -enemy.speed : enemy.speed;
		}
	}
	
	//уменьшаем запас хода по данной логике передвижения
	enemy.moving--;
	
	//изменяем координаты соперника
	enemy.x += enemy.dirX;
	enemy.y += enemy.dirY;
	
	if (enemy.x + enemy.size < 0) {
		enemy.x = canvas.width;
	} else if (enemy.x > canvas.width) {
		enemy.x = -20;
	} else if (enemy.y + enemy.size < 0) {
		enemy.y = canvas.height;
	} else if (enemy.y > canvas.height) {
		enemy.y = -20;
	}
	
	//меняем вид картинки соперника
	enemy.pacY = enemy.pacY === 0 ? 32 : 0;
	
	
	//условие, что игрок зашёл на координаты энергии
	if (player.x <= powerdot.x && player.y <= powerdot.y && powerdot.x <= player.x + 20 && powerdot.y <= player.y + 20) {
		powerdot.powerUp = false;
		//в течение 500 циклов можно поедать соперника
		powerdot.pcountdoun = 500;
		//запонимаем картинку противника, после истечение возможности поедания, он вновь вернёт себе прежний цвет
		powerdot.ghostNum = enemy.pacX;
		//на время поедания противник меняет цвет
		enemy.pacX = 384;
		powerdot.ghosteat = true;
	}
	
	if (player.x <= enemy.x + 12 && player.y <= enemy.y + 32 && enemy.x <= player.x + 12 && enemy.y <= player.y + 32) {
		if (powerdot.ghosteat) {
			data.pscore += 1;
		} else {
			data.gscore += 1;
		}
		player.pacY = 0;
		player.x = 10;
		player.y = 30;
		enemy.x = random(canvas.width - 62);
		enemy.y = random(canvas.height - 62);
		powerdot.pcountdoun = 0;
	}
	
	if (powerdot.ghosteat) {
		powerdot.pcountdoun--;
		if (powerdot.pcountdoun <= 0) {
			enemy.pacX = powerdot.ghostNum;
			powerdot.ghosteat = false;
			enemy.speed = random(3);
		}
	}
	
	if (!powerdot.powerUp) {
		powerdot.x = random(canvas.width - 62);
		powerdot.y = random(canvas.height - 62);
		powerdot.powerUp = true;
	}
};