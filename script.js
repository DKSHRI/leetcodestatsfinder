document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");

  const easyLabel = document.getElementById("easy-level");
  const mediumLabel = document.getElementById("medium-level");
  const hardLabel = document.getElementById("hard-level");
const cardStatsContainer = document.querySelector(".stats-card");
  function validateUsername(username) {
    const regex = /^[a-zA-Z0-9_-]{3,16}$/;
    return regex.test(username);
  }

  async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      searchButton.textContent = "Loading...";
      searchButton.disabled = true;

      const response = await fetch(url);
      const data = await response.json();

      console.log("User data:", data);

      // Update progress circles
      let circles = document.querySelectorAll('.circle');

      // Easy
      let easyPercentage = ((data.easySolved / data.totalEasy) * 100).toFixed(2);
      easyLabel.textContent = data.easySolved;
      circles[0].style.setProperty('--progress-degree', `${easyPercentage}%`);

      // Medium
      let mediumPercentage = ((data.mediumSolved / data.totalMedium) * 100).toFixed(2);
      mediumLabel.textContent = data.mediumSolved;
      circles[1].style.setProperty('--progress-degree', `${mediumPercentage}%`);

      // Hard
      let hardPercentage = ((data.hardSolved / data.totalHard) * 100).toFixed(2);
      hardLabel.textContent = data.hardSolved;
      circles[2].style.setProperty('--progress-degree', `${hardPercentage}%`);

      // ✅ Create card data using fields from the fetched `data`
      const cardData = [
        { label: "Total Submissions", value: data.totalSolved },
        { label: "Easy Submissions", value: data.easySolved },
        { label: "Medium Submissions", value: data.mediumSolved },
        { label: "Hard Submissions", value: data.hardSolved },
        { label: "Reputation", value: data.reputation },
        { label: "Ranking", value: data.ranking },
        { label: "Contribution Points", value: data.contributionPoints },
        { label: "Acceptance Rate", value: `${data.acceptanceRate}%` }
      ];
      cardStatsContainer.innerHTML=cardData.map(
        data=>{
          return `<div class="card">
            <h3>${data.label}</h3>
            <p>${data.value}</p>
          </div>`;
        }
      ).join("")

      console.log("📊 Card Data: ", cardData);

      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  // ✅ Add event listener for search button
  searchButton.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    if (validateUsername(username)) {
      fetchUserDetails(username);
    } else {
      alert("Please enter a valid username (3–16 characters, letters, numbers, underscores, or hyphens).");
    }
  });
});
