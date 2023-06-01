const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34",
];
let dragTarget = {};
function 색추출기(colors) {
  const 랜덤값 = Math.floor(Math.random() * colors.length); //0~17
  return colors[랜덤값];
}
// display();
document.querySelector("button").addEventListener("click", (e) => {
  const text = document.querySelector("input").value;
  // local storage 저장
  const todo객체 = {};
  todo객체.text = document.querySelector("input").value;
  todo객체.category = "todo";
  todo객체.id = Date.now();
  localStorage.setItem(todo객체.id, JSON.stringify(todo객체));
  // 새로운 태그 생성
  const newTag = createTag(text, todo객체.id);
  document.querySelector(".todo").appendChild(newTag);
  // input 값 삭제 (초기화)
  document.querySelector("input").value = "";
});
// Todo 프로젝트 남은 기능
// 1) 카테고리의 변화 저장 기능
// (todo <-> doing <-> done)
// ==> drop 이벤트 함수에 추가!!!

// 2) todo 할일 삭제시 저장데이터도 삭제
// ==> 삭제 버튼 클릭 이벤트 함수에 추가!!!
// 3) 페이지 로딩시 저장데이터를 화면에 출력
// ==> 페이지 로딩시 화면 출력 기능 새로추가!!!
// : 페이지 로딩시 화면을 출력하는 함수 만듬(display함수)
// : display 함수는 로딩할때 딱 한번!! 호출됨
// 1. for loop을 돌면서 localStorage의 저장데이터를 읽음
// 2. 저장데이터(=todo데이터)의 정보를 이용하여 새로운 p tag를 만듬
// createTag(text, key);
// 3. new p tag를 category에 따라 나눠서 appendChild 해줌

const boxes = document.querySelectorAll(".box");
boxes.forEach((box, i) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  box.addEventListener("drop", (e) => {
    // console.log(e.currentTarget);
    e.currentTarget.appendChild(dragTarget);
    const todo = JSON.parse(
      localStorage.getItem(dragTarget.getAttribute("key"))
    );
    todo.category = e.currentTarget.getAttribute("category");
    localStorage.setItem(todo.id, JSON.stringify(todo));
  });
});

function createTag(text, key) {
  // 새로운 p 태그요소를 생성
  const newTag = document.createElement("p");
  newTag.innerHTML = text;
  newTag.style.backgroundColor = 색추출기(colors);
  newTag.setAttribute("draggable", true);
  // p태그요소의 dragstart 이벤트 함수
  newTag.addEventListener("dragstart", (e) => {
    dragTarget = e.currentTarget;
  });
  /*** 삭제버튼 생성 코드 - 시작 */
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = "X";
  // 삭제버튼의 클릭 이벤트함수
  deleteBtn.addEventListener("click", (e) => {
    e.currentTarget.parentElement.remove();
    const key = e.currentTarget.parentElement.getAttribute("key");
    localStorage.removeItem(key);
  });
  newTag.appendChild(deleteBtn);
  /*** 삭제버튼 생성 코드 - 끝 */

  // local storage 저장
  // 객체 상태로 저장...
  // 1) text : 할일 텍스트... 사용자 인풋에 적은 내용
  // 2) category : todo, doing, done
  // 3) id = 중복되지 않는 유니크한 값(현재시간)

  newTag.setAttribute("key", key);

  // console.log(todo객체);
  return newTag;
}
// 화면 로딩시 딱 한번 호출되서 저장되었던 데이터를 화면에 표시해줌
function display() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const todo = JSON.parse(localStorage.getItem(key));
    const color = 색추출기(colors);
    const newTag = createTag(todo.text, todo.id);
    document.querySelector(`.${todo.category}`).appendChild(newTag);
  }
}
display();
