window.addEventListener('load', function () {
  const $imageMandrake = document.querySelector('.img_mandrake');

  const $canvas = document.querySelector('#sprite_canvas');
  const _ctx = $canvas.getContext('2d');

  $canvas.width = 500;
  $canvas.height = 500;
  _ctx.imageSmoothingQuality = 'high';

  class Strite {
    constructor(canvasWidth, canvasHeight, image, scale) {
      this.width = canvasWidth;
      this.height = canvasHeight;

      this.image = image;
      this.scale = scale;

      this.spriteWidth = 256;
      this.spriteHeight = 256;

      this.minFrame = 0;
      this.maxFrame = 355;
      this.frame = 0;
      this.frameX = 0;
      this.frameY = 0;
    }

    draw() {
      _ctx.drawImage(
        this.image,
        this.spriteWidth * this.frameX,
        this.spriteHeight * this.frameY,
        this.spriteWidth,
        this.spriteHeight,
        this.width / 2 - (this.spriteWidth * this.scale) / 2,
        this.height / 2 - (this.spriteHeight * this.scale) / 2,
        this.spriteWidth * this.scale,
        this.spriteHeight * this.scale
      );
    }

    update() {
      if (this.frame < this.maxFrame) this.frame = this.frame + 1;
      else this.frame = this.minFrame;

      this.frameX = this.frame % 18;
      this.frameY = Math.floor(this.frame / 18);
    }

    setAnimation(newMinFrame, newMaxFrame) {
      this.minFrame = newMinFrame;
      this.maxFrame = newMaxFrame;
      this.frame = this.minFrame;
    }
  }

  const mandrake = new Strite(500, 500, $imageMandrake, 2);

  function animate() {
    _ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    mandrake.draw();
    mandrake.update();
    requestAnimationFrame(animate);
  }

  animate();

  // 컨트롤 버튼 클릭 이벤트
  const groupControl = document.querySelector('.group-control');
  groupControl.addEventListener('click', function (e) {
    const $target = e.target;
    const _min = $target.dataset.min;
    const _max = $target.dataset.max;

    mandrake.setAnimation(Number(_min), Number(_max));
  });
});
