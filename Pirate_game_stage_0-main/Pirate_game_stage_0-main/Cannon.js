class Cannon {

constructor (x, y, width, height, angle){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;

}

display(){
    if (keyIsDown(RIGHT_ARROW)){
        this.angle += 0.05;
    }

    if (keyIsDown(LEFT_ARROW)){
        this.angle -= 0.05;
    }

    fill ("black");
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    rect(-10, -20, this.width, this.height);
    pop();
    arc(this.x - 30, this.y + 90, 140, 200, PI, TWO_PI );
    noFill();
}

}