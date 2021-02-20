var dog, database, x, position, foodStock, dogImg, dogImg1, foodS;

function preload()
{
	dogImg=loadImage("Images/dogImg.png");
  dogImg1=loadImage("Images/dogImg1.png");
}

function setup() {

  database = firebase.database();

	createCanvas(800, 800);
  dog=createSprite(400,400,50,50);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  
}

function readStock(data){

  foodS=data.val();

}

function writeStock(x){

  if(x<0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })

  
}


function draw() {  

  background(46,139,87);

  textSize(18);
  fill("black");
  text("Food Left:"+foodS,350,320);
  text("##Use UP Arrow to feed the Dog!",50,50);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
   dog.addImage(dogImg1);
}
  if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
  
}



  drawSprites();
  

}



