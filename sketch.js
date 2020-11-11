//Create variables here
var dog,dogImg,happyDogImg,foodS,foodStock,database;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDogImg =loadImage("happydog.png"); 
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.08;

  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here

  //text to display food remaining
  textSize(18);
  stroke("White");
  text("Food Remaining : " + foodS, 230,200);
  text("Note: Press the UP arrow to feed your pet milk !", 20,30);
}

//function to read values in database

function readStock(data)
{
  foodS = data.val();
}

//function to write values in database

function writeStock(x)
{

  if(x<=0)
  {
    x=20;
  }
  else
  {
    x=x-1;
  }

  

  database.ref('/').update({
    food:x
  })
}


