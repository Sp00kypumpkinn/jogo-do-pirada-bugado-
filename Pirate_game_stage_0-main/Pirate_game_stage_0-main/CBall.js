class CBall {
    constructor(x, y) {
        var options = {//dando física ao objeto
            restitution: 0.8, //Determina o quanto o corpo do objeto (body) irá "saltar/quicar" após a colisão
            friction: 1.0, //Determina o atrito entre o corpo do objeto(body) e o que ele toca.
            density: 1.0, //Determina o peso do objeto(body).
            isStatic: true
        };

        this.r = 40;
        //crie um corpo circular
        this.body = Bodies.circle (x, y, this.r, options);
 
        //carregue a imagem
        this.image = loadImage ("./assets-main/cannonball.png")
        this.trajectory = [];
        World.add(world, this.body)//adicionando ao mundo
    }
 
    shoot() {//método/function para atirar
        //defina o ângulo da bala para o canhão
        var velocity = p5.Vector.fromAngle (cannon.angle);
        velocity.mult(20);
        //defina o valor estático para o corpo
        Matter.Body.setStatic (this.body, false);
        //defina a velocidade da bala para fazer a bala se mover
        Matter.Body.setVelocity (this.body, {x: velocity.x, y: velocity.y})
    }
 
    display() {//function para mostrar a bola
        var angle = this.body.angle;
        var pos = this.body.position;
        console.log(pos)
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        //mostrar a imagem
        image(this.image, 0, 0, this.r, this.r);

        pop();

        if (this.body.velocity.x > 0 && this.body.position.x > 300){

            var position = [ this.body.position.x, this.body.position.y];
            this.trajectory.push (position);

        }

        for(var i = 0; i < this.trajectory.length; i++ ){

            image (this.image, this.trajectory[i][0], this.trajectory[0][1],5,5)

        }





    }
}
