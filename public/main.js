const form = document.getElementById("form");
const day = document.getElementById("day");
const ol = document.getElementById("ol");
const btn = document.getElementById("btn");

// バックエンドでの処理を行う前の最終確認
function startFilling() {
  if(document.querySelectorAll(".li-wrapper").length == 0){
    window.alert("no item!");
    return false;
  } else if(!window.confirm("start autofilling?")) {
    return false;
  }
}

// 入力されてた日付に問題がなければ実行される
const addShift = () => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "li-wrapper");
  ol.appendChild(wrapper);

  const li = document.createElement("li");
  li.textContent = `${day.value}${form.elements["shift"].value}`;
  wrapper.appendChild(li);

  const hidden = document.createElement("input");
  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("name", "workdays[]");
  hidden.setAttribute("value", `${day.value}${form.elements["shift"].value}`);
  wrapper.appendChild(hidden);

  const dltbtn = document.createElement("button");
  dltbtn.innerText = "delete";
  wrapper.appendChild(dltbtn);
  dltbtn.addEventListener("click", () => {
    li.parentNode.remove();
    li.remove();
    hidden.remove();
    dltbtn.remove();
  });
};

// 作成の際に日付の入力値に問題がないかチェック
btn.addEventListener("click", () => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  const object2DayArray = [];
  document.getElementsByName("workdays[]").forEach(e => {
    object2DayArray.push(e.value.replace(/昼\s*/, "").replace(/夜-明\s*/, ""));
  });

  if(day.value === "") {
    window.alert("no input date!");
    return false;
  } else if(new Date(day.value) < today) {
    window.alert("can't input past day!");
    return false;
  }
  //  else if(document.getElementsByName("workdays[]").) {

  // }
   else {
    console.log(object2DayArray);
    return addShift();
  }
});