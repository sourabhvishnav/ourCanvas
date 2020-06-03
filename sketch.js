var brush;

function setup(){
    var canvas = createCanvas(500,500);
   
    brush = new Paint(200,200,200,200);
}

function draw(){
    background(15);

    brush.display();
}