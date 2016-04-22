Candy.MainMenu = function(game){};
Candy.MainMenu.prototype = {
	create: function(){
		// 显示图片
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
		this.add.sprite((Candy.GAME_WIDTH-395)/2, 60, 'title');
		// 添加开始按钮,并且在点击是开始游戏
		this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// 开始游戏状态
		this.state.start('Game');
	}
};