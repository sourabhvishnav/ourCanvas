var drawing = [];
var currentPath = [];
var save;
var reset;
var database;
var isDrawing = false;

function setup(){
    var canvas = createCanvas(500,500);
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);
    canvas.parent('canvas');

    database = firebase.database();

    var saveButton = select('#savebtn')
    saveButton.mousePressed(saveDrawing);

    var clearButton = select('#clearbtn');
    clearButton.mousePressed(clearDrawing);

    var ref = database.ref('drawing/');
    ref.on("value",(data)=>{
    
     var d =   data.val();
     console.log(d);
     if(d!=undefined){
         drawing = data.val().paths;
     }
     else{
         drawing = [];
         clear();
     }
    })
    
} 

function saveDrawing (){
   var drawingRef = database.ref('drawing');
   drawingRef.set(
        {
        "paths": drawing
       }
   )
}
 
function startPath(){
    currentPath = [];
    drawing.push(currentPath);
    isDrawing = true;
}
function endPath(){
    isDrawing = false;
}

function clearDrawing () {
     drawing = [];
     clear();
     var dbRef = database.ref('drawing/paths');
     dbRef.remove();
}

function draw(){
    background(20);

    if(isDrawing){
        var point ={
            x: mouseX,
            y: mouseY
        };
        currentPath.push(point);
    }

    stroke(250);
    strokeWeight(5);
    noFill();
    for(var i= 0; i<drawing.length; i++){
        var path = drawing[i];
        beginShape();
        for(var a= 0; a<path.length; a++){
         vertex(path[a].x, path[a].y);
        }
        endShape();
    }


    
    //  reset(); 

  drawSprites();
}

// function reset(){
//     reset = createButton("RESET");
//     reset.position(save.x+55,save.y);
// }