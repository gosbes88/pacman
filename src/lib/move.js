import { keys } from '../utils/constants';

export default (keyClick, player, canvas) => {
	if (keyClick[keys.LEFT]) {
		player.x -= player.speed;
		player.pacY = 64;
		player.x = player.x + player.size < 0 ? canvas.width : player.x;
	} else if (keyClick[keys.RIGHT]) {
		player.x += player.speed;
		player.pacY = 0;
		player.x = player.x > canvas.width ? -20 : player.x;
	} else if (keyClick[keys.UP]) {
		player.y -= player.speed;
		player.pacY = 96;
		player.y = player.y + player.size < 0 ? canvas.height : player.y;
	} else if (keyClick[keys.DOWN]) {
		player.y += player.speed;
		player.pacY = 32;
		player.y = player.y > canvas.height ? -20 : player.y;
	}
	
	player.pacX = player.pacX === 320 ? 352 : 320;
};