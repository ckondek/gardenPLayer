window.onload = function(){

  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  context.fillStyle = "black";
  screenRatio=canvas.width/canvas.height
  var video  = document.getElementById('videoTag');
  var counter=8;
  var imgObj=new Image();;
  var workList;
  var lastUpdated;
  var currentLastUpdated="2020-09-15T11:49:14.353296Z";
  var currentIndex=0;
  var videoArray=[
              'http://d1ua7ibh28zfpl.cloudfront.net/gardenFilms/grow1.mp4',
              'http://d1ua7ibh28zfpl.cloudfront.net/gardenFilms/grow2.mp4',
              'http://d1ua7ibh28zfpl.cloudfront.net/gardenFilms/grow3.mp4'
            ];


  function triggerRandomVideo(){
      console.log("video sequence Triggered")
      video.style.display="block";

      var choice=Math.floor(Math.random()*videoArray.length);
      video.src=videoArray[choice];
      video.play();
      context.fillRect(0, 0, canvas.width, canvas.height);

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

  video.addEventListener('ended', function () {
        video.style.display="none";
        counter+=1;
        console.log("Video end is called")
        mainLoop();
      });

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

       var gen=parseInt(workList[currentIndex]["generation"])+1
       text4.innerHTML="This Image is generation: "+gen;

        timer =setTimeout(function(){
         counter+=1;
         console.log("Image timeout is called.")
         console.log("About to call mainLoop")
         mainLoop()
       },7000);
     }

  function getImage(){

    workList=getDB()
    lastUpdated=workList[0]['created_at'];
    console.log(lastUpdated>currentLastUpdated)
    console.log(lastUpdated)
      console.log(lastUpdated)

   if (lastUpdated>currentLastUpdated){
     currentLastUpdated=lastUpdated

     currentIndex=0;

    console.log("New image found. Will load most recent update")
   }else{
     currentIndex=Math.floor(Math.random()*workList.length)
     console.log("No new image")
     console.log("Picking Random")
   }
    console.log("Current Image index is: "+currentIndex)

    console.log("Image object created")
    console.log("Current Image inside getImage is index is: "+currentIndex)

    imgObj.src = workList[currentIndex]["image_file"];
    console.log("Image.src added")
    console.log("src is: "+workList[currentIndex]["image_file"])


  };
  function mainLoop(){
    console.log("------------------*********-----------------------------------")
    console.log("back in main loop")
    console.log("The counter is: "+counter)
    if (counter%10==0){
      console.log("_________")
      console.log("Calling triggerVideo()")
      triggerRandomVideo();
    }else{
      console.log("_________")
      console.log("Calling getImage()")
      getImage();
    }
    console.log("do we every get here?")
  };

mainLoop();

};
