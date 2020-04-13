const tableInit = `<table class="table table-striped table-bordered">
            <thead class="thead-dark">`;

function parsePoints(response) {
  let output = `${tableInit}
                        <tr><th>Player</th><th>Points</th></tr>
                    </thead>`;
  response.forEach(player => {
    output += `<tr><td>${player.name}</td><td>${player.points}</td><tr>`;
  });
  output += `</table>`;

  return output;
}

function parseGames(response) {

  let output = `${tableInit}
                          <tr><th>Games</th></tr>
                      </thead>`;
  response.forEach(game => {
    output += `<tr><td>${game.name}</td><tr>`;
  });
  output += `</table>`;

  return output;
}

function parseMinecraft(response) {

  let output = "";
  response.forEach(place => {
    let x = place.coords.x;
    let y = place.coords.y;
    let z = place.coords.z;

    let placeTable = `<table class="table table-striped table-bordered">
    <caption>${place.name}</caption>
    <thead class="thead-dark">
          <tr><th>Dimension</th><th>X</th><th>Y</th><th>Z</th></tr>
      </thead>`;
    placeTable += `<tr><td>Overworld</td><td>${x}</td><td>${y}</td><td>${z}</td><tr>`;
    placeTable += `<tr><td>Nether</td><td>${x / 8}</td><td>${y}</td><td>${z /
      8}</td><tr>`;
    placeTable += `</table><br>`;
    output += placeTable;
  });

  return output;
}
