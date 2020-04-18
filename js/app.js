class Sun {
  constructor() {
    this.x = 400;
    this.y = 0;
  };
}

class Enemy {
  constructor(x, y, style, speed) {
    this.startingX = x;
    this.startingY = y;
    this.x = this.startingX;
    this.y = this.startingY;
    this.direction = 'ltr';
    this.style = style;
    this.speed = Math.floor(Math.random() * 50) + 25;
  };

  collision() {
    if( (player.x > this.x - 90) && (player.x < this.x + 90) ) {
      if( (player.y > this.y - 85) && (player.y < this.y + 85) ) {
        if (player.lives < 1) {
          player.lives = 3;
          player.lvl = 0;

          allEnemies.forEach((enemy) => {
            enemy.speed = Math.floor(Math.random() * 50) + 25;
          });
        } else {
          player.lives--;
        }

        player.x = 400;
        player.y = 400;

        allEnemies.forEach((enemy) => {
          enemy.x = enemy.startingX;
          enemy.y = enemy.startingY;
        });

        const livesBoard = document.querySelector('#lives span');
        livesBoard.textContent = player.lives;
        
        const score = document.querySelector('#score span');
        score.textContent = player.lvl; 
      };
    };
  };

  update(dt) {
    this.collision();

    let movement = (this.speed * dt);

    if (this.direction === 'ltr') {
      if(this.x < 800) {
        this.x += movement;
      } else {
        this.direction = 'rtl';
      }
    } else {
      if(this.x > 0) {
        this.x -= movement;
      } else {
        this.direction = 'ltr';
      };
    };
  };
};

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lvl = 0;
    this.lives = 3;
  }


  update() {
    if((this.x > 300) && (this.x < 500)) {
      if(this.y < 90 && this.y >= -100) {
        this.levelUp();
      };
    };
  };

  handleInput(target) {
    if(target) {
      if(target === 'up') {
        if(this.y > 0) {
          this.y -= 25;
        }
      } else if (target === 'down') {
        if(this.y < 420) {
          this.y += 25;
        }
      } else if (target === 'left') {
        if(this.x > 0) {
          this.x -= 25;
        }; 
      } else {
        if(this.x < 780) {
          this.x += 25;
        }
      };
    };
  };

  levelUp() {
    const score = document.querySelector('#score span');
    score.textContent = ++this.lvl;
    this.x = 400;
    this.y = 400;
    allEnemies.forEach((enemy) => {
      enemy.speed += Math.floor(Math.random() * 60) + 10;
    });
  }
}

const sun = new Sun();
const enemy1 = new Enemy(0, 20, 'enemy1', 100);
const enemy2 = new Enemy(0, 140, 'enemy2', 200);
const enemy3 = new Enemy(0, 260, 'enemy3', 50);

const allEnemies = [];
allEnemies.push(enemy1, enemy3, enemy2);

const player = new Player(400, 400); 

document.addEventListener('keyup', function(e) {
  const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
