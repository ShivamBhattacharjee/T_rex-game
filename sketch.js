var trex,trex_running,trex_collided;
var ground,invisible_ground,groundImage;
var cloudsGroup,cloudImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score;

function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
groundImage=loadImage("ground2.png");
  
cloudImage=loadImage("cloud.png");
  

  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
                        
  
}  

function setup() {
  createCanvas(600, 200);
  
  trex=createSprite(50,180,20,10);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  
  ground=createSprite(200,180,400,10);
  ground.addImage("ground",groundImage);
  ground.x=ground.width/2;
  ground.velocityX=-4;
  
  invisible_ground=createSprite(200,190,400,10);
  invisible_ground.visible=false;
  
  cloudsGroup=new Group();
  
  obstaclesGroup=new Group();
  
  score=0;
  
  
}

function draw() {
  background(180);
   score+= Math.round(World.frameCount/4);
  text("Score: "+ score, 250, 100);
  
  //console.log(trex.y);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 159){
    trex.velocityY = -10 ;
  }
  
  //add gravity
  trex.velocityY = trex.velocityY + 0.8;
  
  //stop trex from falling down
  trex.collide(invisible_ground);
  
  //spawn the clouds
  spawnClouds();
  
  //spawn obstacles
  spawnObstacles();
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}


