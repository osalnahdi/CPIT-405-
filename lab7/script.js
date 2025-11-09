const accessKey = "o1-fsma8L300_6Rh5x4K223EnN7CQQOCCW7RGNel3b8"; 

const container = document.getElementById("image-container");
const queryInput = document.getElementById("query");

function displayImages(results) {
  container.innerHTML = "";
  results.forEach(photo => {
    const img = document.createElement("img");
    img.src = photo.urls.small;
    img.alt = photo.alt_description || "Unsplash Photo";
    container.appendChild(img);
  });
}

//XHR
function searchXHR() {
  const query = queryInput.value;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayImages(data.results);
    } else {
      alert("Error fetching images");
    }
  };
  xhr.send();
}

//Fetch Promises
function searchFetch() {
  const query = queryInput.value;
  fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`)
    .then(res => res.json())
    .then(data => displayImages(data.results))
    .catch(() => alert("Error fetching images"));
}

//Async/Await
async function searchAsync() {
  const query = queryInput.value;
  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
    const data = await res.json();
    displayImages(data.results);
  } catch (err) {
    alert("Error fetching images");
  }
}


searchAsync();
