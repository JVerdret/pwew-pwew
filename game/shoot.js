var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    two_player_collision();
    bullet_collision();
    shot_collision();
    player_collision();
    ennemy_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }

}

function shot_collision()
{
    //collision between bullet and ennemy
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs((ennemy1.graphic.position.x - 1) - ((player1.bullets[i].position.x - 0.5))) < 5 &&
            Math.abs((ennemy1.graphic.position.y - 1) - ((player1.bullets[i].position.y - 0.5))) < 5)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
            ennemy1.dead();
            scene.remove(ennemy1.graphic);
            scene.remove(ennemy1);
        }
    }
}

function two_player_collision() {
    if (Math.abs((ennemy1.graphic.position.x - 1) - ((player1.graphic.position.x - 0.5))) < 10 &&
        Math.abs((ennemy1.graphic.position.y - 1) - ((player1.graphic.position.y - 0.5))) < 10)
    {
        if (player1.life === 1)
            player1.dead();
        else {
            player1.life = player1.life - 1;
            ennemy1.graphic.position.x = 150;
        }
    }
}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH )
        player1.graphic.position.x -= x - WIDTH;
    if (x < 0)
        player1.graphic.position.x -= x;
    if ( y < 0 )
        player1.graphic.position.y -= y;
    if ( y > HEIGHT )
        player1.graphic.position.y -= y - HEIGHT;

}

function ennemy_collision()
{
    //collision between player and walls
    var x = ennemy1.graphic.position.x + WIDTH / 2;
    var y = ennemy1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH )
        ennemy1.graphic.position.x -= x;
    if (x < 0)
        ennemy1.graphic.position.x -= x;
    if ( y < 0 )
        ennemy1.graphic.position.y -= y;
        ennemy1.position.y -= y;
    if ( y > HEIGHT )
        ennemy1.graphic.position.y -= y;
        ennemy1.position.y -= y;

}

function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;
    var length = noGround.length;
    var element = null;

    for (var i = 0; i < length; i++) {
        element = noGround[i];

        var tileX = (element[0]) | 0;
        var tileY = (element[1]) | 0;
        var mtileX = (element[0] + sizeOfTileX) | 0;
        var mtileY = (element[1] + sizeOfTileY) | 0;

        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY) 
            && (y < mtileY))
        {
            if (player1.life === 1)
                player1.dead();
            else {
                player1.life = player1.life - 1;
                player1.graphic.position.x = 50;
                player1.graphic.position.y = 0;
            }
        }
    }

}
