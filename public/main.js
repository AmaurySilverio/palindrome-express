let trash = document.getElementsByClassName("fa-trash");

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    let word = this.parentNode.parentNode.childNodes[1].innerText;
    let newWord = word.replace(/\s/g, ""); // gets rid of extra space in span, so we just get the innerText
    console.log(word);
    fetch("palindromeInQuestion", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: newWord,
        // console.log(word)
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
