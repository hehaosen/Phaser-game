var Candy = {};
Candy.Boot = function(game){};
Candy.Boot.prototype = {
	preload: function(){
		// 加载进度条图片
		this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function(){
		// 设置选项
		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		// 开启预加载器
		this.state.start('Preloader');
	}
};