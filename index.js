// `http://www.omdbapi.com/?apikey=[yourkey]&`
// `http://img.omdbapi.com/?apikey=[yourkey]&`

const btn = document.getElementById("search__btn");
    const clapper = document.getElementById("clapper");

    btn.addEventListener("click", () => {
      clapper.classList.add("active");

      // After animation, go to new page
      setTimeout(() => {
        window.location.href = "https://movies.html"; 
      }, 900); // slightly longer than animation
    });