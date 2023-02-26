var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloud,cloudImage,fondo,fondoImage;
var gameOver,restart,gameOverImage,restartImage;
var obstaculo,obstaculoImage;
var jumpSound,dieSound,checkpoint;
var grupoObstaculos,grupoNubes;
var vidas = 1;
var puntuacion =0;

// game over,todas las imagenes  y todas van a ser un load image 


function preload(){
//Creacion de objetos 

    fondoImage= loadImage("fondo-01.jpg");

      //Trex
     trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
     trex_collided = loadAnimation("trex_collided.png");

    //Ground
    groundImage = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");

    //obstaculos
    obstaculo1 = loadImage("obstacle1.png");
    obstaculo2 = loadImage("obstacle2.png");
    obstaculo3 = loadImage("obstacle3.png");
    obstaculo4 = loadImage("obstacle4.png");
    obstaculo5 = loadImage("obstacle5.png");
    obstaculo6 = loadImage("obstacle6.png");
    //estado
    gameOverImage = loadImage("gameOver.png");
    restartImage = loadImage("restart.png");

    //carga sonidos
    jumpSound = loadSound("jump.mp3");
    dieSound = loadSound("die.mp3");
    checkpoint =loadSound("checkpoint.mp3");

}
  
  
function setup() {

    //Creacion de Cnvas 
    createCanvas(800,600);
   // createCanvas(windowWidth,windowHeight);
  fondo = createSprite(0,0,100,0);
  fondo.addImage(fondoImage);
  fondo.scale= 0.5;
    //fondo.x = fondo.width/2;
   // fondo.velocityX = -4;
    //crear sprite de trex 
    trex = createSprite(50,370,20,50);
    gameOver = createSprite (200,240,50,50);
    restart = createSprite(200,300,50,20);

    //Crear objeto trex  animado
    trex.addAnimation("trex_running",trex_running);
    trex.addAnimation("trex_collided",trex_collided); 
    trex.scale = 0.5;

   
  //crear sprite de suelo
    ground = createSprite(0,400,400,20);//cambiar 
    ground.addImage("ground2",groundImage);
    ground.x = ground.width/2;   //el ancho se divida en 2
    ground.velocityX = -4 ;
  // ground = createSprite(10,335,20,20);
   gameOver.addImage(gameOverImage);
   restart.addImage(restartImage);
   gameOver.scale = 1.5;
   restart.scale = 0.7;
   gameOver.visible =false;
   restart.visible = false; 


  //sprite obstaculosg
  //obstaculo.addImage("obstacule1","obstacule2","obstacule3","obstacule4","obstacule5","obstacule6",obstaculoImage);

  /*
  //estado
  gameOver.addImage("gameOver",gameOverImage);
  restart.addImage("restart",restartImage);
  //mover  piso   coordenada X - izquierda 
  ground.x = ground.x - 3;
  */
  //coordenada x de ground  hacer que se duplique

  
  //crear sprite de suelo invisible 
  invisibleGround =createSprite(50,405,20,20);
  invisibleGround.visible = false;

  grupoObstaculos = new Group();//almacenar los grupos de los elementos 
  grupoNubes = new Group();
  

  
}

function draw() {
  //establecer el color de fondo
  background(fondoImage);
 
 // fondo = createSprite(0,0,100,100);
  //fondo.addImage(fondoImage);
  score();
  creacionNubes();
  creacionObstaculos();
  choqueObstaculos();
  //hacer que el trex salte al presionar la barra espaciadora
  if(keyDown("space") && trex.y>= 160){
    trex.velocityY = -10;
    jumpSound.play();
  }
  //agregar gravedad
  trex.velocityY = 0.5 + trex.velocityY;

  //hacer que el piso se repita 
  if(ground.x<0){
  ground.x = ground.width/2;
  ground.velocityX = -4;
  }

  /*if(fondo.x<0){
    fondo.x = fondo.width/2;
    fondo.velocityX = -4;
    }
*/
  //evitar que el trex caiga
  trex.collide(invisibleGround); //unir el trex con el piso
  //visualiza Sprites
  drawSprites();
}

function creacionNubes(){
 
  if(frameCount % 100 === 0){
    console.log("aparece");
    cloud = createSprite (600,100,10,15);
    cloud.y =Math.round(random(80,200));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.3;
    cloud.velocityX = -2;
    console.log("Nube");
   cloud.lifetime = 300; // ancho o largo canva/ velocidad del objeto
   grupoNubes.add(cloud);

  }
}

function creacionObstaculos(){
  if(frameCount % 100 == 0){
    
obstaculo = createSprite(600,400,10,20);
obstaculo.velocityX = -4;
obstaculo.y = Math.round(random(398,401));
var aleatoria = Math.round(random(1,6));
console.log(frameCount);
console.log(aleatoria);
switch(aleatoria){
  case 1: obstaculo.addImage(obstaculo1); break;
  case 2: obstaculo.addImage(obstaculo2); break;
  case 3: obstaculo.addImage(obstaculo3); break;
  case 4: obstaculo.addImage(obstaculo4); break;
  case 5: obstaculo.addImage(obstaculo5); break;
  case 6: obstaculo.addImage(obstaculo6); break;
  default: break;
}
obstaculo.scale = 0.1;
//Timepo de vida
 obstaculo.lifetime = 150; // 
 grupoObstaculos.add(obstaculo);
  }
}

function choqueObstaculos(){
  if(grupoObstaculos.isTouching(trex)){
    console.log("perdio");
    vidas = vidas - 1;
    dieSound.play();//suene cuando muere
      if(vidas === 0){
        end();
      }
  }
}

function end(){
  gameOver.visible = true;
  restart.visible = true;
  grupoObstaculos.setVelocityXEach(0);
  grupoNubes.setVelocityXEach(0);
  trex.changeAnimation("trex_collided",trex_collided);
  grupoNubes.setLifetimeEach(-1);
  grupoObstaculos.setLifetimeEach(-1);
  //parar los grupos
  //restart.mousePressed(reset());
  if(mousePressedOver(restartImage)){
    console.log("reset");
    reset();
  }
}

function reset(){
  console.log("reset");
  gameOver.visible = false;
  restart.visible = false;
  puntuacion = 0;
  grupoNubes.destroyEach(); //destruit los grupos
  grupoObstaculos.destroyEach(); //pendiente
  trex.changeAnimation("trex_running",trex_running);
}

//texto,funcion para score (framecount,frame reate )
function score(){
  textSize(10);  //puntuacion fill,color,ubicacion guia codorg
  text("Puntuacion:  "+ puntuacion, 100, 50);
  puntuacion = puntuacion + Math.round(getFrameRate()/60);// cada 60 va a aumentar la velocidad
  ground.velocityX = -(6+3 *puntuacion/100);//

}