class Boat {
  constructor(x, y, width, height, boatPos, boatAnimation) {
    var options = {//adicionar valores

      restitution: 0.8,
      friction: 1.0,
      density: 1.0,

    };

    this.animation = boatAnimation;

    this.speed = 0.05;

    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x, y, width, height, options);

    //criar variável para obter as posições aleatórias do navio à partir do código
      this.boatPosition = boatPos
    //carregar imagem nos navios
    this.image = loadImage ("assets-main/boat.png")
    World.add(world, this.body);
  }

  animate () {
    this.speed += 0.05 % 1.1;
  }


  remove(index) {
    this.animation = brokenBoatAnimation;
    this.speed = 0.05;
    this.width = 300;
    this.height = 300;
    setTimeout(() => {//função para fazer os navios desaparecerem lentamente
      Matter.World.remove(world, boats[index].body)//removendo navio do mundo
      boats.splice(index, 1);//removendo navio da matriz
    }, 2000);//limite de tempo para os navios desaparecerem
  }



  display() {
   //criar variável para obter o ângulo do corpo
      var angle = this.body.angle;
      var pos = this.body.position;
      var index = floor (this.speed % this.animation.length);
   //salvar as novas configurações
      push()
    translate(pos.x, pos.y);
    rotate(angle);
    // definir o imageMode como centro
      imageMode (CENTER);
    //mostrar a imagem
   image (this.animation[index], 0, this.boatPosition, this.width, this.height)
    //adicionar função pronta q remove o valor de preenchimento atual para exibir imagens
      noTint()
    //redefinir os estilos de desenho
      pop()
  }
}

  