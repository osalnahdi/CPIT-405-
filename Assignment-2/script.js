document.getElementById("searchBtn").addEventListener("click", async () => {
  const teamName = document.getElementById("teamInput").value.trim();
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (!teamName) {
    results.innerHTML = "<p>Please enter a team name.</p>";
    return;
  }

  const apiKey = "7b9ec1b5f8fd1d054caf3c8e049e5a9d";
  const leagueId = 307; // Premier League
  const season = 2022; // الموسم الفعلي الحالي (بدل 2024)

  try {
    // Step 1: Get team ID
    const teamRes = await fetch(`https://v3.football.api-sports.io/teams?search=${teamName}`, {
      method: "GET",
      headers: { "x-apisports-key": apiKey }
    });
    const teamData = await teamRes.json();

    if (!teamData.response || teamData.response.length === 0) {
      results.innerHTML = `<p>No team found for "${teamName}".</p>`;
      return;
    }

    const team = teamData.response[0].team;
    const teamId = team.id;

    // Step 2: Get team statistics
    const statsRes = await fetch(`https://v3.football.api-sports.io/teams/statistics?league=${leagueId}&season=${season}&team=${teamId}`, {
      method: "GET",
      headers: { "x-apisports-key": apiKey }
    });

    const statsData = await statsRes.json();

    if (!statsData.response) {
      results.innerHTML = `<p>No statistics available for ${team.name} in ${season} season.</p>`;
      return;
    }

    const stats = statsData.response;

    // Defensive checks
    const leagueName = stats.league ? stats.league.name : "Unknown League";
    const played = stats.fixtures?.played?.total ?? "N/A";
    const wins = stats.fixtures?.wins?.total ?? "N/A";
    const draws = stats.fixtures?.draws?.total ?? "N/A";
    const losses = stats.fixtures?.loses?.total ?? "N/A";
    const goalsFor = stats.goals?.for?.total?.total ?? "N/A";
    const goalsAgainst = stats.goals?.against?.total?.total ?? "N/A";
    const cleanSheets = stats.clean_sheet?.total ?? "N/A";

    results.innerHTML = `
      <h2>${team.name} (${leagueName} ${season})</h2>
      <div class="card">
        <img src="${team.logo}" width="100" alt="${team.name}">
        <h3>Team Statistics</h3>
        <p><strong>Played:</strong> ${played}</p>
        <p><strong>Wins:</strong> ${wins}</p>
        <p><strong>Draws:</strong> ${draws}</p>
        <p><strong>Losses:</strong> ${losses}</p>
        <p><strong>Goals For:</strong> ${goalsFor}</p>
        <p><strong>Goals Against:</strong> ${goalsAgainst}</p>
        <p><strong>Clean Sheets:</strong> ${cleanSheets}</p>
      </div>
    `;
  } catch (err) {
    console.error(err);
    results.innerHTML = "<p>Error fetching team statistics. (Check plan or league availability)</p>";
  }
});
