// APP FUNCTIONALITY GOES IN HERE

const quotesContainer = document.querySelector(".quotes-container");
const generateBtn = document.querySelector(".generate-btn");
const tweetBtn = document.querySelector(".tweet-btn");

// QUERRY THE DOM FOR THE SPINNER TO BE DISPLAYED BEFORE THE ACTUAL DATA ARRIVES
const spinner = document.querySelector(".sk-chase");

//  QUERY DOM FOT TWITER BUTTON
const twitterButton = document.querySelector("#js-tweet");
// FUNCTION TO GET RANDOM QUOTES USING AN API
const API_URL = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const getRandomQuotes = async () => {
  spinner.classList.add("active");
  generateBtn.disabled = true;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.log(error);
  } finally {
    spinner.classList.remove("active");
    generateBtn.disabled = false;
  }
};

generateBtn.addEventListener("click", async () => {
  const quote = await getRandomQuotes();
  quotesContainer.textContent = quote;
  setTweetButton(quote);
});

if (quotesContainer.innerText === "") {
  quotesContainer.innerHTML = `
  <p class="no-content-text">Click to get started!</p>
  `;
}

function setTweetButton(quote) {
  twitterButton.setAttribute(
    "href",
    `https://twitter.com/share?text=${quote} - Auraqule`
  );
  console.log(quote, tweetBtn);
}
