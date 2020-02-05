const tableInit = `<table class="table table-striped table-bordered">
            <thead class="thead-dark">`;

function parsePoints(response) {
  if (response.status == 500) return `Unexpected error : ${response.message}`;

  let payload = response.payload;
  let output = `${tableInit}
                        <tr><th>Player</th><th>Points</th></tr>
                    </thead>`;
  payload.forEach(player => {
    output += `<tr><td>${player.name}</td><td>${player.points}</td><tr>`;
  });
  output += `</table>`;

  return output;
}

function parseGames(response) {
  if (response.status == 500) return `Unexpected error : ${response.message}`;

  let payload = response.payload;
  let output = `${tableInit}
                          <tr><th>Games</th></tr>
                      </thead>`;
  payload.forEach(game => {
    output += `<tr><td>${game.name}</td><tr>`;
  });
  output += `</table>`;

  return output;
}
