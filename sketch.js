//Open source code avail on github
//developede on 6/2/2021


//Variables

var windowsBallon;
var gameCubeImg;
var database,pos;
var hotAirBallonImg;
var baloonImg;

//Preloading Images

function preload () {
  gameCubeImg = loadImage ("gamecube.gif");
  hotAirBallonImg=loadImage("Hot Air Ballon-01.png");
  baloonImg=loadImage("Hot Air Ballon-02.png")
}

//setup

function setup () {
  
  createCanvas (800,400);

  database=firebase.database();

  windowsBallon =  createSprite (400, 200, 50, 50);
  windowsBallon.addImage(baloonImg);
  windowsBallon.scale = 0.3;

  var ballonPos=database.ref("Balloon/Position");
  ballonPos.on("value",readPos,showError);
 
}

//Display

function draw() {

  background(hotAirBallonImg);  

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
  }

 

  drawSprites();

}

function writePosition(x,y){
  database.ref("Balloon/Position").set({
      x:windowsBallon.x+x,
      y:windowsBallon.y+y
  })
 
}

function readPos(data){
  pos=data.val();
  windowsBallon.x=pos.x;
  windowsBallon.y=pos.y;
}

function showError(){
  console.log("ERROR")
  fill("red") 
  textSize(55);
  text("Error",30,30)
}

