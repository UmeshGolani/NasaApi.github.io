// API endpoint and API key
const API_ENDPOINT = "https://api.nasa.gov/planetary/apod";
const API_KEY = "PP7k401r6NQrNJpVKZ3w4Hs1f4Q7RVb1oq73cNvO";

// Get the search form and input
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Get the current image container and search history list
const currentImageContainer = document.getElementById("current-image-container");
const searchHistoryList = document.getElementById("search-history");

// Initialize the searches array from local storage
let searches = JSON.parse(localStorage.getItem("searches")) || [];

// Function to fetch data from NASA API
async function fetchImageOfTheDay(date) {
    const response = await fetch(`${API_ENDPOINT}?api_key=${API_KEY}&date=${date}`);
    console.log(response);
    const data = await response.json();
    console.log(data);
  return data;
}

// Function to display the current image of the day
async function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    console.log(currentDate);
  const data = await fetchImageOfTheDay(currentDate);
  displayImage(data);
}

// Function to display the image data in the UI
function displayImage(data) {
  currentImageContainer.innerHTML = `
    <div class="card">
      <img src="${data.url}" alt="${data.title}">
      <h3>${data.title}</h3>
      <p>${data.date}</p>
      <p>${data.explanation}</p>
    </div>
  `;
}

// Function to save a search to local storage
function saveSearch(date) {
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

// Function to display the search history list in the UI
function displaySearchHistory() {
  searchHistoryList.innerHTML = searches
    .map((date) => `<li class="search-history-item">${date}</li>`)
    .join("");
}

// Function to handle a search submission
async function handleSearchSubmit(event) {
  event.preventDefault();
  const searchDate = searchInput.value;
  const data = await fetchImageOfTheDay(searchDate);
  displayImage(data);
  saveSearch(searchDate);
  displaySearchHistory();
}

// Function to handle a search history click
async function handleSearchHistoryClick(event) {
  if (event.target.classList.contains("search-history-item")) {
    const searchDate = event.target.innerText;
    const data = await fetchImageOfTheDay(searchDate);
    displayImage(data);
  }
}

// Add event listeners to the search form and search history list
searchForm.addEventListener("submit", handleSearchSubmit);
searchHistoryList.addEventListener("click", handleSearchHistoryClick);

