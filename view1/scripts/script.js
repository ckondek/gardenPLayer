window.onload = function(){

  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight-10;
  screenRatio=canvas.width/canvas.height

  var video  = document.getElementById('videoTag');
  var activator =document.getElementById('activate');
  var test =document.getElementById('test');
  var counter=0;
  var imgObj;

  var workList;
  var lastUpdated;
  var currentLastUpdated=0;
  var currentIndex=0;
  var videoArray=[
              'http://d1ua7ibh28zfpl.cloudfront.net/gardenFilms/grow1.mp4',
              'http://d1ua7ibh28zfpl.cloudfront.net/gardenFilms/grow2.mp4',
              'http://d1ua7ibh28zfpl.cloudfront.net/gardenFilms/grow3.mp4'
            ];

  //video.src=videoArray[2];
  activator.addEventListener("click",function(){
    video.style.display="block";
    activator.style.display = "none";
    video.play();
    video.addEventListener('ended', function () {
    video.style.display="none";
    });
  });

  function triggerRandomVideo(){
    video.style.display="block";
    var choice=Math.floor(Math.random()*videoArray.length);
    video.src=videoArray[choice];
    video.load()
    video.addEventListener('canplaythrough',function(){
      video.play();
    })
    video.addEventListener('ended', function () {
      video.style.display="none";
      mainLoop()
    });
  }

  function reset(){
    garden=getDB();
    workList=[];
    currentIndex=0;
    for (var item=0;item<garden.length;item++){
      if (getGarden(garden[item])==2){
        workList.push(entryDict(garden[item]));
        console.log(entryDict(garden[item]))
      }
    }
  }
  function makeAspect(){
    let imageRatio=imgObj.width/imgObj.height;
    let newWidth=imgObj.width;
    let newHeight=imgObj.height;
    if (imageRatio < screenRatio){
      newHeight=imgObj.width/screenRatio;
    }else if (imageRatio > screenRatio){
      newWidth = imgObj.height * screenRatio;
    }
      return [newWidth,newHeight]
  }


  function getIndex(){
      console.log("getting index")
   workList=getDB()
   console.log(workList)

   lastUpdated=workList[0]['created_at'];
   console.log(currentLastUpdated)
   console.log(lastUpdated)
   if (lastUpdated>currentLastUpdated){
     currentLastUpdated=lastUpdated
     currentIndex=0;
       console.log("setting up last")
   }else{
     currentIndex=Math.floor(Math.random()*workList.length)
     console.log("Picking Random")
   }
 }
  function getImage(){
    console.log("entering get Image")
    imgObj= new Image();
    imgObj.src = workList[currentIndex]["image_file"];
    text1.innerHTML="Data Garden at Nantesbuch "+workList[currentIndex]["uuid"];

    if (workList[currentIndex]["original_created_at"]==null){
     text2.innerHTML="Original created at: an uncertain time in the past";
    }else{
     text2.innerHTML="Original created at: "+workList[currentIndex]["original_created_at"];
    }

    text3.innerHTML="Image planted in garden: "+workList[currentIndex]["created_at"];
    text4.innerHTML="This Image is generation: "+workList[currentIndex]["generation"];
    imgObj.onload = function(){
        console.log("New image loaded")
         let newSizes=makeAspect()
         context.drawImage(imgObj, imgObj.width/2-newSizes[0]/2,imgObj.height/2-newSizes[1]/2,newSizes[0],newSizes[1],0, 0,canvas.width, canvas.height);

         text1.innerHTML="Data Garden at Nantesbuch "+workList[currentIndex]["uuid"];
         if (workList[currentIndex]["original_created_at"]==null){
           text2.innerHTML="Original created at: an uncertain time in the past";
         }else{
           text2.innerHTML="Original created at: "+workList[currentIndex]["original_created_at"];
         }

         text3.innerHTML="Image planted in garden: "+workList[currentIndex]["created_at"];
         text4.innerHTML="This Image is generation: "+workList[currentIndex]["generation"];
  }

};
  function mainLoop(){
    console.log('--------------------')
    console.log("start of main loop")
    counter+=1;
    if (counter%10==0){
      triggerRandomVideo()
      console.log("endof main loop---Video")
      console.log("--------------------")

    }else{
      getIndex();
      getImage();

      setTimeout(function(){
        console.log("endof main loop---Image")
        console.log("--------------------")
        mainLoop()
      },7000);
    }
  };

mainLoop();

};
