window.addEventListener('load', () => {
  // canvas 호출
  const $canvas = document.querySelector('#canvas1');

  // canvas 2d로 설정 : canvas요소.getContext
  const _ctx = $canvas.getContext('2d');

  // canvas 크기 설정
  $canvas.width = 500;
  $canvas.height = 500;

  // Class 생성: animation 설정
  class Animation {
    constructor(canvasWidth, canvasHeight) {
      this.image = document.querySelector('.image-mandrake');
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;

      // sprite 크기 설정
      this.spriteWidth = 256;
      this.spriteHeight = 256;

      this.width = this.spriteWidth;
      this.height = this.spriteHeight;

      this.scale = 2;

      // 시작 위치 = (캔버스 너비 / 2) - (출력 이미지 너비 * scale / 2)
      this.x = this.canvasWidth / 2 - (this.width * this.scale) / 2;
      this.y = this.canvasHeight / 2 - (this.height * this.scale) / 2;

      // 프레임 설정
      this.minFrame = 0;
      this.maxFrame = 355;
      this.frame = 0;
      this.FrameX = 3;
      this.FrameY = 2;
    }

    draw(context) {
      // drawImage([삽입할 이미지], [포커싱 x], [포커싱 y], [포커싱 너비], [포커싱 높이], [출력 이미지 시작 위치 X], [출력 이미지 시작 위치 Y], [출력 이미지 너비], [출력 이미지 높이], )
      context.drawImage(
        this.image,
        this.FrameX * this.spriteWidth,
        this.FrameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width * this.scale,
        this.height * this.scale
      );
    }

    update() {
      // (최소 프레임 ~ 최대 프레임)를 반복하는 값 설정
      this.frame = this.frame < this.maxFrame ? this.frame + 1 : this.minFrame;

      // this.frame으로 row/column 반복하는 값 도출
      this.FrameX = this.frame % 18;
      this.FrameY = Math.floor(this.frame / 18);
    }

    setAnimation(newMinFrame, newMaxFrame) {
      // 시작과 끝 값만 조절하도록 설정
      this.minFrame = newMinFrame;
      this.maxFrame = newMaxFrame;
      this.frame = this.minFrame;
    }
  }

  const mandrake = new Animation($canvas.width, $canvas.height);

  function animate() {
    // requestAnimationFrame(animate);는 canvas에 모든 애니메이션을 남긴다.
    // _ctx.clearRect로 캔버스를 지워줘야함
    // _ctx.clearRect([캔버스 시작 위치 X], [캔버스 끝 위치 Y], [캔버스 너비], [캔버스 높이]);
    _ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    mandrake.draw(_ctx);
    mandrake.update();
    requestAnimationFrame(animate);
  }

  animate();

  const all = document.querySelector('#all');
  all.addEventListener('click', function () {
    mandrake.setAnimation(0, 355);
  });

  const grow = document.querySelector('#grow');
  grow.addEventListener('click', function () {
    mandrake.setAnimation(0, 75);
  });

  const wink = document.querySelector('#wink');
  wink.addEventListener('click', function () {
    mandrake.setAnimation(76, 112);
  });

  const float = document.querySelector('#float');
  float.addEventListener('click', function () {
    mandrake.setAnimation(113, 262);
  });

  const hide = document.querySelector('#hide');
  hide.addEventListener('click', function () {
    mandrake.setAnimation(263, 355);
  });
});
