const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0,0, canvas.width, canvas.height);
    background.update();
    shop.update();
    player.update();
    // enemy.update();

    //player movement
    player.velocity.x = 0;
    if( keys.a.pressed && player.lastKey === 'a') 
    {
        player.velocity.x = -5;
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');
    }
    else {
        player.switchSprite('idle');
    }

    if(player.velocity.y < 0) 
    {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0)
    {
        player.switchSprite('fall');
    }

    //enemy movement
    enemy.velocity.x = 0;
    if( keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') 
    {
        enemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    }

    //detect collision
    if(rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking) 
    {
        player.isAttacking = false;
        console.log('kaabooom!');
        enemy.health -= 20;
        document.getElementById('enemy-health').style.width = enemy.health + "%";
    }

    if(rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking) 
    {
        enemy.isAttacking = false;
        console.log('evil-kaabooom!');
        player.health -= 20;
        document.getElementById('player-health').style.width = player.health + "%";
    }

    //end game on health
    if(enemy.health <= 0 || player.health <= 0)
    {
        determineWinner({player, enemy, timerId});
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y:0
    },
    imgSrc: './img/background.png'
});

const shop = new Sprite({
    position: {
        x: 600,
        y:128
    },
    imgSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
});

const player = new Fighter({
    name: 'hero',
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    color: 'red',
    offset: {
        x:0,
        y:0
    },
    imgSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imgSrc: './img/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            imgSrc: './img/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imgSrc: './img/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imgSrc: './img/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imgSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6,
        }
    }
});

const enemy = new Fighter({
    name: 'mao',
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x:-50,
        y:0
    }
});

animate();
decreaseTimer();
window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
        break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
        break;
        case 'w':
            player.velocity.y = -20;
        break;
        case ' ':
            player.attack();
        break;


        //enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
        break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
        break;
        case 'ArrowDown':
            enemy.attack();
        break;
    }
});

window.addEventListener('keyup', event => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
        break;
        case 'a':
            keys.a.pressed = false;
        break;
        case 'w':
            keys.a.pressed = false;
        break;
    }
    // console.log(event.key);

    //enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
        break;
    }

});