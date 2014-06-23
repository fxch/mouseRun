    var app = angular.module("myapp", ["firebase"]);
    function MyController($scope, $firebase) {
        // Global variables
        var mouseX = 0; // X position of mouse
        var mouseY = 0; // Y position of mouse
        var canvas; // canvas
        var ctx; // context
        var back = new Image(); // storage for new background piece
        var oldBack = new Image(); // storage for old background piece
        var mouse = new Image(); // mouse
        var bread = new Image(); // bread
        var heart = new Image(); // heart
        var mouseX = 80; // current mouse position X
        var mouseY = 640; // current mouse position Y
        var mouseW = 8;
        var mouseH = 80;
        var oldmouseX = 0; // old mouse position Y
        var oldmouseY = 0; // old mouse position Y
        var carX = 0;
        var carY = 0;
        var arrBreadX = [80,320,560,800,1040];
        var arrHeartX = [960,1040,1120];
        var test = 1; 
        var getBread =0;
        var time = 600;
        var val=0;

        // This function is called on page load.
        $scope.canvasSpaceGame = function(e){

              // Get the canvas element.
              canvas = document.getElementById("myCanvas");

              // Make sure you got it.
              if (canvas.getContext)
              {
                  // Specify 2d canvas type.
                  ctx = canvas.getContext("2d");

                  // BgColor.
                   // ctx.fillStyle = "black";
                   // ctx.rect(0, 0, myCanvas.width, myCanvas.height);
                  
                  //Get road image
                  //grass
                  var grass = new Image();
                  grass.src = 'asset/grass1.png';
                  ctx.drawImage(grass,0,0,myCanvas.width,myCanvas.height/9);

                  //road 1
                  var road1 = new Image();
                  road1.src = 'asset/miniroad1.jpg';
                  ctx.drawImage(road1,0,myCanvas.height/9,myCanvas.width,myCanvas.height/9);

                  //road 2
                  var road2 = new Image();
                  road2.src = 'asset/miniroad1.jpg';
                  var m =0;
                  for(m=1;m<6;m++){
                    ctx.drawImage(road2,0,myCanvas.height/9*m,myCanvas.width,myCanvas.height/9);  
                  }
                   ctx.drawImage(grass,0,myCanvas.height/9*8,myCanvas.width,myCanvas.height/9);
            
                  // Save the initial background.
                  back = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);
                  var jerry = new Image();
                  jerry.src = 'asset/jerry-up.png';

                  oldBack = back;
                  ctx.drawImage(heart,0,myCanvas.height/9*8,1120,720);
            
                  gameLoop = setInterval(doGameLoop, 16);

                  // Draw space mouse.
                  makemouse();

                  makeCarMoveRight(6);
              }

              // Add keyboard listener.
              window.addEventListener('keydown', whatKey, true);

              function doGameLoop() {
                  // Put old background down to erase mousee.
                  ctx.putImageData(oldBack, oldmouseX, oldmouseY);
                  ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
                  ctx.drawImage(grass,0,0,myCanvas.width,myCanvas.height/9);
                  var m =0;
                  for(m=1;m<8;m++){
                      ctx.drawImage(road2,0,myCanvas.height/9*m,myCanvas.width,myCanvas.height/9);  
                  }
                  ctx.drawImage(jerry,mouseX,mouseY,80,80);

                  makeHeart();

                  makeBread();

                  checkCollisionKey();

              }

              function makeHeart(){
                  heart.src = 'asset/heart.png';
                  for (var i = 0; i < arrHeartX.length; i++) {
                    ctx.drawImage(heart,arrHeartX[i],640,80,80);
                  }
              }

              function makemouse() {
                  ctx = canvas.getContext("2d");
                  ctx.drawImage(jerry,0,0,80,80);
              }

              function makeBread(){

                  bread.src = 'asset/cheese.png';
                  for (var i = 0; i < arrBreadX.length; i++) {
                      ctx.drawImage(bread,arrBreadX[i],0,80,80);
                  }
              }

              function youWin(){
                  alert("You Win, Click Ok to Play Again!");
                  arrHeartX = [960,1040,1120];
                  arrBreadX = [80,320,560,800,1040]; 
                  getBread = 0;
                  document.getElementById("key").innerHTML = "x"+getBread;
                  countdown(function() {  
                    //youLose();
              });                  
              }

              function youLose(){
                  alert("You Lose, Click Ok to Play Again!");
                  arrHeartX = [960,1040,1120];
                  arrBreadX = [80,320,560,800,1040]; 
                  getBread = 0;
                  document.getElementById("key").innerHTML = "x"+getBread;

                  countdown(function() {  
                    //youLose();
              });
              }
              
              function checkCollisionKey(){

                  if (mouseY == 0){
                      for (var i = 0; i < arrBreadX.length; i++) {
                          if (arrBreadX[i] == mouseX){ 
                                 console.log("key get!!!");
                                 mouseX = 560;
                                 mouseY = 640; // current mouse position Y
                                 arrBreadX.splice(i,1);
                                 getBread++;
                                 document.getElementById("key").innerHTML = "x"+getBread;
                          }                   
                      }
                      if (arrBreadX.length == 0){
                          youWin();
                      }
                  }
              }

               // Get key press.
              function whatKey(e) {
                  // Flag to put variables back if we hit an edge of the board.
                  var flag = 0;

                  // Get where the mouse was before key process.
                  oldmouseX = mouseX;
                  oldmouseY = mouseY;
                  oldBack = back;
                  
                  switch (e.keyCode) {

                    // Left arrow.
                  case 37:
                    mouseX = mouseX - 80;
                    if (mouseX < 0) {
                      // If at edge, reset mouse position and set flag.
                      mouseX = 0;
                      flag = 1;
                    }
                    jerry.src = "asset/jerry-left.png";
                    break;

                    // Right arrow.
                  case 39:
                    mouseX = mouseX + 80;
                    if (mouseX > myCanvas.width-80) {
                      // If at edge, reset mouse position and set flag.
                      mouseX = myCanvas.width;
                      flag = 1;
                    }
                    jerry.src = "asset/jerry-right.png";
                    break;

                    // Down arrow
                  case 40:
                    mouseY = mouseY + 80;
                    if (mouseY > myCanvas.height-80) {
                      // If at edge, reset mouse position and set flag.
                      mouseY = myCanvas.height;
                      flag = 1;
                    }
                    jerry.src = "asset/jerry-down.png";
                    break;

                    // Up arrow 
                  case 38:
                    mouseY = mouseY - 80;

                    if (mouseY < 0) {
                      // If at edge, reset mouse position and set flag.
                      mouseY = 0;
                      flag = 1;
                    }
                    jerry.src = "asset/jerry-up.png";
                    break;

                  }

                    console.log("mx"+mouseX+"my"+mouseY);

                  // If flag is set, the mouse did not move.
                  // Put everything back the way it was.
                  if (flag) {
                    mouseX = oldmouseX;
                    mouseY = oldmouseY;
                    back = oldBack;
                  } else {
                    // Otherwise, get background where the mouse will go
                    // So you can redraw background when the mouse
                    // moves again.
                    ctx.drawImage(jerry,mouseX,mouseY,80,80);
                  }
                  // doGameLoop();
              }

              function makeCarMoveRight(num){
                    /**Implementation Car Movement*/
                    var img = new Image();
                    var arrXcar = [];

                    // User Variables - customize these to change the image being scrolled, its
                    // direction, and the speed.
                    img.src = 'asset/car-right.png';
                    var CanvasXSize = myCanvas.width;
                    var CanvasYSize = myCanvas.height;
                    var speed = 10; //lower is faster
                    var scale = 1;
                    var y = 0; //vertical offset

                    // Main program
                    var dx = 0.75;
                    var imgW;
                    var imgH;
                    var x = 0;
                    var clearX;
                    var clearY;
                    var ctx;
                    var arrXcar = [];
                    var arrYcar = [];


                    img.onload = function() {
                        imgW = 80;
                        imgH = img.height*scale;
                        if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas
                        if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
                        else { clearX = CanvasXSize; }
                        if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
                        else { clearY = CanvasYSize; }
                        //Get Canvas Element
                        ctx = document.getElementById('canvas2').getContext('2d');
                        //Set Refresh Rate
                        setInterval(draw, 1);

                        //setInterval(draw, 55555555555555555);
                    }

                    function draw() {
                          //Clear Canvas
                          ctx.clearRect(0,0,clearX,clearY);
                          arrXcar = [];
                          arrYcar = [];

                          //draw image
                          var i =0,j=0,line=1,delay=0;
                          for(j=1;j<5;j++){
                            for(i=num-j;i>0;i--){
                              ctx.drawImage(img,((x-delay-(canvas2.width*i/(num-j+1)))%canvas2.width)-40,myCanvas.height/9*line+y,imgW,imgH);
                              arrXcar.unshift(((x-delay-(canvas2.width*i/(num-j+1)))%canvas2.width)-40);
                              arrYcar.unshift(myCanvas.height/9*line+y);
                              ctx.save();
                            }
                            ctx.drawImage(img,((x-delay)%canvas2.width)-40,myCanvas.height/9*line+y,imgW,imgH);
                            arrXcar.unshift(((x-delay)%canvas2.width)-40);
                            arrYcar.unshift(myCanvas.height/9*line+y);
                            line+=2;
                            //delay-=100;
                            ctx.save();
                          }

                          for(i=1;i<(num*4)+4;i++){
                            ctx.restore();
                          }
                          
                          //amount to move
                          x += dx;
          
                          // bikin kotak khusus untuk car movemovent                
                          carY = y; 

                        
                          checkCollisionCar(arrXcar,arrYcar,num,imgW);
                    }

                    function checkCollisionCar(arrX,arrY,nm,wm){ //(x, y) mobil, n = jumlah mobil, wm = panjang mobil
                          var mouseX1 = mouseX;
                          var mouseY1 = mouseY;
                          var mouseX2 = mouseX+wm;

                          var tabrakan = false;
                          var v = 3;
                          var h = 0;

                              //check apakah mobil ada dalam range mouse
                              for (var i = 0; i < arrX.length; i++){

                                      var carX1 = arrX[i]; 
                                      var carX2 = arrX[i]+wm ; 
                                      
                                      if (arrY[i] == mouseY1){
                                          if ((carX2 >= mouseX1) && (carX1 <= mouseX1) && (mouseX2 >= carX2)){
                                              // console.log("1. tabrakan di carX1: "+carX2+" carX2 :"+carX2+" mx1 : "+mouseX1); 
                                              tabrakan = true;
                                              mouseX = 560;
                                              arrHeartX.splice(0,1);
                                              mouseY = 640;
                                          } 
                                          else if ((carX1 <= mouseX2) && (carX2 >= mouseX2) && (mouseX1 <= carX2)){
                                              // console.log("2. tabrakan di "+ carX1+"mx2"+mouseX2)  ; 
                                              tabrakan = true;  
                                              mouseX = 560;
                                              arrHeartX.splice(0,1);
                                              mouseY = 640;

                                          } 
                                          else if ((carX2 >= mouseX2) && (carX1 <= mouseX1)){
                                              tabrakan = true;
                                              mouseX = 560;
                                              arrHeartX.splice(0,1);
                                              mouseY = 640;                                              
                                              // console.log("3. tabrakan di"+carX1+"mx2"+mouseX3)  ; 
                                          }
                                      }

                                      if (tabrakan == true) break;
                              }
                    }
              }

              //var percent = document.getElementById('percentage');


              function countdown(callback) {
                  time = 600;
                  val = time;
                  var audio = document.getElementById('backsound');
                  var bar = document.getElementById('progress'),
                  max = 0,
                  int = setInterval(function() {
                      bar.style.width = Math.floor(100 * val-- / time) + '%';
                      document.getElementById('waktu').innerHTML = "<h3>Time : "+Math.floor(val/10)+"</h3>";
                      if(val>(99/100*time)){
                        audio.load();
                      }
                      else if(val>(66/100*time)){
                        $( "#progress" ).removeClass().addClass( "progress-bar progress-bar-success" );}
                      else if(val>(33/100*time)){
                        $( "#progress" ).removeClass().addClass( "progress-bar progress-bar-warning" );}
                      else {
                        $( "#progress" ).removeClass().addClass( "progress-bar progress-bar-danger" );}
                      if (val == max) {
                          clearInterval(int);
                          // 600ms - width animation time
                          alert('times up!'); 
                          youLose();
                          callback && setTimeout(callback, 600);
                      } else if (arrHeartX==0) {
                          clearInterval(int);
                          // 600ms - width animation time
                          youLose();
                          callback && setTimeout(callback, 600);

                      } else if (arrBreadX==5) {
                          clearInterval(int);
                          // 600ms - width animation time
                          youWin();
                          callback && setTimeout(callback, 600);

                      }
                  }, 100);
              }

              countdown(function() {
                  //alert('times up!'); 
                          //youLose();
              });


             
        }


     
    }

    /**Kalau Mau Implementasi Firebase*/
    // var ref = new Firebase("https://v1lj60ur2lv.firebaseio-demo.com/");
    // $scope.messages = $firebase(ref);
    // $scope.addMessage = function(e) {
    //     if (e.keyCode != 13) return;
    //     $scope.messages.$add({from: $scope.name, body: $scope.msg});
    //     $scope.msg = "";
    // }