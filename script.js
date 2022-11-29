const display = document.getElementById("display");
const numBlock = document.getElementById("numBlock");

// Create number keys
for (i = 9; i >= 0; i--) {
  const div = document.createElement("div");
  const keyNumber = i;
  div.classList.add("key");
  div.classList.add("numKey");
  div.setAttribute("id", "num" + keyNumber);
  div.textContent = keyNumber;
  numBlock.appendChild(div);

  // Add number to display
  div.addEventListener("click", () => {
    display.textContent += keyNumber;
  });
}
