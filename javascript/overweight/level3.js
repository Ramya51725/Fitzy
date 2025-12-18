const categoryId = localStorage.getItem("category_id");
if (!categoryId) {
  alert("Category not found. Please login again.");
}

const level = "level3";

const container = document.getElementById("exerciseContainer");
const detailContainer = document.getElementById("exerciseDetail");

const API_URL = `http://127.0.0.1:8000/exercise/by-category-level?category_id=${categoryId}&level=${level}`;

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    container.innerHTML = "";

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No exercises found</p>";
      return;
    }

    data.forEach(ex => {
      const card = document.createElement("div");
      card.className = "exercise-card";

      const imgPath = ex.exercise_image
        ? ex.exercise_image.startsWith("http")
          ? ex.exercise_image
          : `/Assets/${ex.exercise_image}`
        : "/Assets/default.png";

      card.innerHTML = `
        <img src="${imgPath}">
        <p>${ex.title}</p>
      `;

      card.onclick = () => showExerciseDetail(ex);
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    container.innerHTML = "<p>Error loading exercises</p>";
  });


function showExerciseDetail(ex) {

  let videoHTML = `<p>No video available</p>`;

  if (ex.exercise_video) {

    if (ex.exercise_video.includes("youtube")) {
      videoHTML = `
        <iframe src="${ex.exercise_video}" allowfullscreen></iframe>
      `;
    }
    else {
      videoHTML = `
        <video controls muted>
          <source src="${ex.exercise_video}" type="video/mp4">
        </video>
      `;
    }
  }

  detailContainer.innerHTML = `
    <h2>${ex.title}</h2>

    <div class="video-box">
      ${videoHTML}
    </div>

    <p><strong>Instructions</strong><br>
      ${ex.instruction || "No instructions"}
    </p>

    <p><strong>Breathing Tip</strong><br>
      ${ex.breathing_tip || "No breathing tip"}
    </p>

    <p><strong>Focus areas</strong></p>
    <div class="focus-areas">
      ${(ex.focus_area || []).map(a =>
        `<div class="focus-pill">${a}</div>`
      ).join("")}
    </div>
  `;
}

