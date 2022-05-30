listPokemons();

function listPokemons(){
  const request = new XMLHttpRequest();
  request.open('GET', 'https://6283929f92a6a5e462260498.mockapi.io/pokemon');
  
  request.onload = function() {
    const data = JSON.parse(request.response);
    const pokemons = data.map((item) => getContentCard(item));

    document.getElementById('card__container').innerHTML = pokemons.join('');
  };
  request.send();
}

function getContentCard(data){
    return `
    <a id="${data.id}" class="card" href="/${data.id}.html" style="background-color:${data.color || 'red'}">
      <img class="card__image" src="/assets/images/stat/stat-${data.avatar}.png" alt="${data.name}">
      <div class="card__title"> ${data.name}</div>
    </a>
    `;

}