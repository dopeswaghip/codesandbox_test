import "./styles.css";

const onClickAdd = () => {
  // TextBoxの値を取得し、空文字で初期化
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  //ToDo: createIncompleteList()
  createIncompleteList(inputText);
};

//targetを受け取り、未完了リストからtarget要素を削除する関数を作成しておく(共通処理なので)
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストにliを追加する関数
const createIncompleteList = (text) => {
  // liの生成
  const li = document.createElement("li");

  // divの生成
  const div = document.createElement("div");
  div.className = "list-row";

  //pの生成
  const p = document.createElement("p");
  p.innerText = text;

  //button(完了)の生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親の親のliを未完了リストから削除し、完了リストに複製する。
    const completeTarget = completeButton.parentNode.parentNode;
    deleteFromIncompleteList(completeTarget);
    //完了リストに追加する要素
    const text = completeTarget.firstElementChild.firstElementChild.innerText;
    // liタグ以下を初期化
    completeTarget.textContent = null; //<li></li>が生成された
    //div, pの生成
    const div = document.createElement("div");
    div.className = "list-row";
    const p = document.createElement("p");
    p.innerText = text;
    div.appendChild(p);
    //button(戻す)生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 戻すボタンの親タグ(li)を完了リストから削除する
      const deleteTarget = backButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキストの取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });
    div.appendChild(backButton);
    completeTarget.appendChild(div);
    document.getElementById("complete-list").appendChild(completeTarget);
  });

  //button(削除)の生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親の親(li)を未完了リストから削除する
    const deleteTarget = deleteButton.parentNode.parentNode;
    deleteFromIncompleteList(deleteTarget);
  });

  // divタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
