const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var cannon;
var angle;
var cball;
//var boat;
var boats = []

var balls = [];

var boatAnimation = [];
var boatSpritedata, boatSpritesheet = [];

var isGameOver = false

//criar variável para objeto 

function preload() {
  //adicionar imagem de fundo
  backgroundImg = loadImage("./assets-main/background.gif");
  //adicionar imagem da torre
  towerImg = loadImage("./assets-main/tower.png");

  boatSpritedata = loadJSON ("./assets-main/boat-main/boat-main/boat.json")
  brokenBoatSpritesheet = loadImage("./assets-main/boat-main/boat-main/broken_boat.png");

  
}


function setup() {
  //criar canvas para o fundo cobrir a tela inteira
  canvas = createCanvas (700,500);
 
  engine = Engine.create();
  world = engine.world;

  //rectMode(CENTER);
  //ellipseMode(RADIUS);

  angle = -PI/4;
 
  //criar objeto torre, lembra da palavra chave para criar um objeto?
  tower = new Tower (5, 110, 160, 310);
  cannon = new Cannon (120, 50, 100, 50, angle);
  boat = new Boat(width, height - 100, 200, 200, -100);

  var boatFrames = boatSpritedata.frames

  for(var i = 0; i < boatFrames.lenght; i++){

    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push (img);


  }

  




  //cball = new CBall (cannon.x, cannon.y);

}

function draw() {
  background(189);
  //adicionando imagem para ser exibida
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);

  for (var i = 0;  i < balls.length; i++){

    showCannonBalls (balls[i], i);
    console.log(i);

    for (var j= 0; j< boats.lenght; j++){
        if (balls[i] !== undefined && boats[j] !== undefined){
          var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
            if(collision.collided){
              boats[j].remove(j);
              Matter.World.remove(world, balls[i].body);
              balls.splice (i, 1);
              i--;
         }

      }
    }
  }

//exibir a torre (Desafio 4)
  showBoats();
  tower.display();
  cannon.display();
  //boat.display();
  //cball.display();

 
}

function keyPressed(){

  if (keyCode == DOWN_ARROW){
    //cball.shoot();
    var cball = new CBall (cannon.x, cannon.y);
    balls.push(cball);
    console.log(balls);

  }

}


function showCannonBalls(ball, index){

  ball.display()

  if(ball.body.position.x >= width || ball.body.position.y >= height -50){

    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);

  }

}

function keyReleased() {

  if (keyCode === DOWN_ARROW){
    balls[balls.length - 1].shoot();
  
  }

}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(
        width,
        height - 100,
        170,
        170,
        position,
        boatAnimation
      );
 
 
      boats.push(boat);
    }
 
    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });
 
      boats[i].display();
      boats[i].animate();

      var collision = Matter.SAT.collides(tower.body, boats[i].body);
      if(collision.collided && !boats[i].isBroken) {
        isGameOver = true;
        gameOver();
      }

     
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}


function gameOver() {
  swal(
    {
      title: `Fim de Jogo!!!`,
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if(isConfirm) {
        location.reload();
      }
    }
  );
}
 

