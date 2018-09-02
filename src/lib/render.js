export default (ctx, canvas, player, enemy, powerdot, data, img, logicEnemy) => {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = "20px Verbana";
	
	ctx.fillStyle = 'white';
	//информация, кто сколько раз кого убил
	ctx.fillText(`Человек: ${data.pscore} Соперник: ${data.gscore}`, 2, 20);
	
	ctx.drawImage(img, player.pacX, player.pacY, player.size, player.size, player.x, player.y, player.size, player.size);
	ctx.drawImage(img, enemy.pacX, enemy.pacY, enemy.size, enemy.size, enemy.x, enemy.y, enemy.size, enemy.size);

	if (logicEnemy.showEnemy) {
		ctx.fillStyle = 'yellow';
		ctx.beginPath();
		ctx.arc(powerdot.x, powerdot.y, 8, 0, Math.PI * 2, true);
		ctx.fill();
	}
};