const numBlock = document.getElementById("numBlock");

for (i = 9; i >= 0; i--) {
  const div = document.createElement("div");
  div.classList.add("numKeys");
  div.setAttribute("id", "num" + i);
  div.textContent = i;
  numBlock.appendChild(div);
}
