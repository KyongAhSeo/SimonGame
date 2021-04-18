let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];

let userClickedPattern = [];

var started = false;
var level = 0;

//처음 게임을 시작하기위해 키보드를 눌렀을때
$(document).on("keydown", thisShouldHappen);

function thisShouldHappen() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

//사용자가 누르는 버튼
$(".btn").click(function () {
  //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//사용자의 버튼 클릭 패턴과 정답이 일치하는지 확인
function checkAnswer(currentLevel) {
  //사용자가 누른 마지막 버튼과 정답이 일치할때
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    //사용자가 누른 버튼 패턴과 정답의 순서가 일치할때
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//게임을 시작할때 randomNumber에 의해 눌러지는 버튼
function nextSequence() {

  //게임이 시작되면 userClickedPattern array 리셋
  userClickedPattern =[];

  //한 단계 위로 올라갈때마다 레벨 증가
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

//눌러지는 버튼에 맞는 사운드
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//버튼을 누르면 생기는 에니메이션
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//새로운 게임 시작
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

