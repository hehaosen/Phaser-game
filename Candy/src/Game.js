Candy.Game = function(game){
	// 定义游戏变量
	this._player = null;
	this._candyGroup = null;
	this._spawnCandyTimer = 0;
	this._fontStyle = null;
	// 定义Candy.item里面方法需要使用的变量
	Candy._scoreText = null;
	Candy._score = 0;
	Candy._health = 0;
};
Candy.Game.prototype = {
	//初始化
	create: function(){
		// 启动ARCADE物理引擎
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// 启动全局重力
		this.physics.arcade.gravity.y = 200;
		// 显示图片: 背景图, 地面和分数
		this.add.sprite(0, 0, 'background');//背景图
		this.add.sprite(-30, Candy.GAME_HEIGHT-160, 'floor');//地面
		this.add.sprite(10, 5, 'score-bg');//分数背景图
		// 添加暂停按钮
		this.add.button(Candy.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
		// 创建怪兽
		this._player = this.add.sprite(5, 760, 'monster-idle');
		// 创建怪物的动画
		this._player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		// 播放怪物动画
		this._player.animations.play('idle');
		// 这是文字样式
		this._fontStyle = {
			font: "40px 微软雅黑",
			fill: "#FFCC00",
			stroke: "#333",
			strokeThickness: 5,
			align: "center"
		};
		// 初始化定时器
		this._spawnCandyTimer = 0;
		// 初始化分数文字
		Candy._scoreText = this.add.text(120, 20, "0", this._fontStyle);
		// 设置玩家的生命值
		Candy._health = 10;
		// 创建新的糖果组
		this._candyGroup = this.add.group();
		// 产生第一个糖果
		Candy.item.spawnCandy(this);
	},
	//暂停和继续游戏
	managePause: function(){
		// 暂停游戏
		this.game.paused = true;
		// 添加暂停信息
		var pausedText = this.add.text(100, 250, "游戏暂停\n点击任意区域开始游戏.", this._fontStyle);
		// 添加事件监听器 点击屏幕
		this.input.onDown.add(function(){
			// 删除暂停消息
			pausedText.destroy();
			// 开始游戏
			this.game.paused = false;
		}, this);
	},
	//管理游戏主循环
	update: function(){
		// 更新定时器每一帧
		this._spawnCandyTimer += this.time.elapsed;
		// 每1000帧新增一个糖果
		if(this._spawnCandyTimer > 1000) {
			// 重置定时器
			this._spawnCandyTimer = 0;
			// 产生新糖果
			Candy.item.spawnCandy(this);
		}
		// loop through all candy on the screen
		this._candyGroup.forEach(function(candy){
			// to rotate them accordingly
			candy.angle += candy.rotateMe;
		});
		// if the health of the player drops to 0, the player dies = game over
		if(!Candy._health) {
			// show the game over message
			this.add.sprite((Candy.GAME_WIDTH-594)/2, (Candy.GAME_HEIGHT-271)/2, 'game-over');
			// pause the game
			this.game.paused = true;
		}
	}
};

Candy.item = {
	//增加新糖果
	spawnCandy: function(game){
		// calculate drop position (from 0 to game width) on the x axis
		var dropPos = Math.floor(Math.random()*Candy.GAME_WIDTH);
		// define the offset for every candy
		var dropOffset = [-27,-36,-36,-38,-48];
		// randomize candy type
		var candyType = Math.floor(Math.random()*5);
		// create new candy
		var candy = game.add.sprite(dropPos, dropOffset[candyType], 'candy');
		// add new animation frame
		candy.animations.add('anim', [candyType], 10, true);
		// play the newly created animation
		candy.animations.play('anim');
		// enable candy body for physic engine
		game.physics.enable(candy, Phaser.Physics.ARCADE);
		// enable candy to be clicked/tapped
		candy.inputEnabled = true;
		// add event listener to click/tap
		candy.events.onInputDown.add(this.clickCandy, this);
		// be sure that the candy will fire an event when it goes out of the screen
		candy.checkWorldBounds = true;
		// reset candy when it goes out of screen
		candy.events.onOutOfBounds.add(this.removeCandy, this);
		// set the anchor (for rotation, position etc) to the middle of the candy
		candy.anchor.setTo(0.5, 0.5);
		// set the random rotation value
		candy.rotateMe = (Math.random()*4)-2;
		// add candy to the group
		game._candyGroup.add(candy);
	},
	//当用户点击通过时
	clickCandy: function(candy){
		// 当点击糖果时删除该糖果
		candy.kill();
		// 增加分数
		Candy._score += 1;
		// 更新分数展现
		Candy._scoreText.setText(Candy._score);
	},
	//删除糖果
	removeCandy: function(candy){
		// 删除这个糖果
		candy.kill();
		// 减少玩家生命值
		Candy._health -= 10;
	}
};
