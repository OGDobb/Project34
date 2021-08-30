//Create variables here
var dog, happyDog, database, foodS, foodStock, foodObj;
var dogImg, happyDogImg;
function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(250,250);
  dog.addImage("dogImg",dogImg);
  dog.scale=0.1;

  // feed=createButton("Feed the dog");
  // feed.position(700,95);
  // feed.mousePressed(feedDog);

  // addFood=createButton("Add Food");
  // addFood.position(800,95);
  // addFood.mousePressed(addFoods);

  
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage("happyDogImg",happyDogImg);
dog.changeImage("happyDogImg");
}
//display();

textSize(15);
fill("white");
stroke("black");
text("Note: Press UP_ARROW Key to Feed Drago Milk!",100,50);

text("Food Available: " + foodS, 200, 100);

// if(lastFed>=12){
//   Text("Last Feed : "+ lastFed%12 + " PM", 350,30);
// }else if(lastFed==0){
//   Text("Last Feed : 12 AM", 350,30);
// }else{
//   Text("Last Feed : "+ lastfed + " AM", 350,30);
// }
drawSprites();
}



 
  //add styles here




function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

