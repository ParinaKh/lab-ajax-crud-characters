const charactersAPI = new APIHandler("http://localhost:8000");

// console.log(charactersAPI.getFullList());

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function(event) {
      charactersAPI
        .getFullList()
        .then(apiRes => {
          const characters = apiRes.data;
          let tpl = "";
          characters.forEach(char => {
            tpl += `<div class="character-info">
          <div class="name">Character Name : ${char.name} </div>
          <div class="occupation">Character Occupation : ${char.occupation}</div>
          <div class="cartoon">Is a Cartoon? : ${char.cartoon}</div>
          <div class="weapon">Character Weapon : ${char.weapon}</div>
        </div>`;
          });
          const container = document.querySelector(".characters-container");
          container.innerHTML = tpl;
        })
        .catch(err => {
          console.log(err);
        });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function(event) {
      let id = document.querySelector(".operation>input").value;
      charactersAPI.getOneRegister(id).then(apiRes => {
        const char = apiRes.data;
        let tpl = "";
        tpl += `<div class="character-info">
          <div class="name">Character Name : ${char.name} </div>
          <div class="occupation">Character Occupation : ${char.occupation}</div>
          <div class="cartoon">Is a Cartoon? : ${char.cartoon}</div>
          <div class="weapon">Character Weapon : ${char.weapon}</div>
        </div>`;
        const container = document.querySelector(".characters-container");
        container.innerHTML = tpl;
      });
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function(event) {
      let idValue = document.querySelector(".operation.delete>input").value;
      const charToDelete = document.querySelector(".character-info");
      // charactersAPI.deleteOneRegister(idValue).then(apiRes => {
      //   const charToDelete = apiRes.data;
      //   deleteOneRegister(charToDelete);
      deleteOneRegister(charToDelete);
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function(event) {});

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      let inputs = document.querySelectorAll("#new-character-form input");
      const newChar = {};
      inputs.forEach(input => {
        if (input.name === "cartoon") {
          newChar[input.name] = input.checked;
        } else {
          newChar[input.name] = input.value;
        }
      });
      charactersAPI.createOneRegister(newChar);
    });
});

// var someObject = jsonObject[1][2];
