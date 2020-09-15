function getDB(){

  let db = "https://tangled.garden/api/images/?garden=4&ordering=-created_at";
  let request = new XMLHttpRequest()
  request.open("GET",db,false)
  request.send()

  return JSON.parse(request.responseText)
}
//returns a function that takes an Object as parameter
//and returns Object[key]. To be used with Array.map()
function getByKey(key){
  return function (entry){
    return entry[key];
  }
}

let getPath=getByKey('image_file')
let getGen=getByKey('generation')
let getCreated=getByKey('original_created_at')
let getCamera=getByKey('camera')
let getGarden=getByKey('garden')

function getByKeys(key1,key2,key3,key4){
  return function (entry){
    return [entry[key1],entry[key2],entry[key3],entry[key4]];
  }
}

function getNewDictByKeys(key1,key2,key3,key4,key5){
  return function (entry){
    var a=key1
    return {[key1]:entry[key1],[key2]:entry[key2],[key3]:entry[key3],[key4]:entry[key4],[key5]:entry[key5]};
  }
}

let getList=getByKeys('image_file','original_created_at','created_at','generation','uuid');
let entryDict=getNewDictByKeys('image_file','original_created_at','created_at','generation','uuid');
