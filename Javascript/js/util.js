function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
        rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y 
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}
let timer = 60;
let timerId;
function determineWinner({player, enemey, timerId})
{
    clearTimeout(timerId);
    document.getElementById('result').style.display = 'flex';
    if(player.health === enemy.health)
    {
        document.getElementById('result').innerText = 'Tie';
    }
    else if ( player.health > enemy.health)
    {
        document.getElementById('result').innerText = 'Player 1 Wins!';
    }
    else if ( player.health < enemy.health)
    {
        document.getElementById('result').innerText = 'Player 2 Wins!';
    }
}

function decreaseTimer() {
    if(timer > 0)
    {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--;
    document.getElementById('timer').innerText = timer;
    }

    if(timer === 0)
    {
        determineWinner({player, enemy, timerId});

    }
}