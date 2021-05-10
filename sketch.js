var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup,obstacleGroup
var score = 0
var invisibleground
var PLAY = 1
var END = 0
var gameState = PLAY
var jungle
var bg

function preload(){
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 jungleImage = loadImage("jungle.jpg")
}

function setup() {
 createCanvas(600,400);
 
  bg = createSprite(300,160,50,50)
  bg.addImage(jungleImage)
  bg.scale = 1.2
  bg.velocityX = -5
  
  
  
 monkey = createSprite(80,350,50,50)
 monkey.addAnimation ("running",monkey_running);
 monkey.scale = 0.15
 // monkey.debug = true
 // monkey.setCollider( "circle",0,0,300 )
  
  
  
  bananaGroup = new Group()
  obstacleGroup = new Group()
  
 invisibleground = createSprite(300,380,1200,10) 
  invisibleground.visible = false;
}

function draw() {
  
  background("black");
  
  drawSprites()
    
  
   monkey.collide(invisibleground)
  
  if(gameState === PLAY ){
    
    if(keyDown("space")){
    monkey.velocityY = -10 
    }
    
   // score = score + Math.round( frameRate()/60)
  
    invisibleground.velocityX = -5
    
   if (bg.x < 0){
   bg.x = bg.width/2;
  }
    
    monkey.velocityY = monkey.velocityY +0.8
    
    if (invisibleground.x < 0){
   invisibleground.x = invisibleground.width/2;
  }
   
   
    
  spawnObstacles()
  spawnbanana()
    
    if(bananaGroup.isTouching(monkey)){
       bananaGroup.destroyEach()
       score = score + 2
       }
    
    switch(score){
           
      case 10: monkey.scale = 0.2 
        break;
        case 20: monkey.scale = 0.25  
        break;
        case 30: monkey.scale = 0.30 
        break;
        case 40: monkey.scale = 0.40   
        break;
        default: break;
        
           }
    
    
    
   if( obstacleGroup.isTouching(monkey)  ){
     
     if( monkey.scale > 0.15  ){
        monkey.scale = 0.15
        } 
      
     else { gameState = END}
     
   }
    
  }
  
  
  
  else if(gameState === END) {
    
    invisibleground.velocityX = 0
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    bg.velocityX = 0
    monkey.velocityY = 0
    textSize(30)
    fill(0)
    text("Game Over",250,200)

  }
 textSize(20)
  text("survivalTime: " + score,400,50);

  
  }

 function spawnbanana() {
   
  if(World.frameCount % 150 === 0) {
    var banana = createSprite(600,200,800,10);
    banana.addImage(bananaImage)
    banana.scale = 0.08
    banana.velocityX = -5
    bananaGroup.add(banana)
    }  
     
  }

function spawnObstacles() {
   
  if(World.frameCount % 150 === 0) {
    var obstacle = createSprite(600,350,800,10);
    //obstacle.debug = true
    obstacle.setCollider( "circle",0,0,200 )
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.20
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle)
  }
}



