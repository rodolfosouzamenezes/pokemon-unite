loadPokemon();

function loadPokemon(){
    fetch('https://6283929f92a6a5e462260498.mockapi.io/pokemons')
    .then(response => response.json())
    .then(data => {
        const pokemons = data.map((item) => pokemon(item))
        document.querySelector('.card__container').innerHTML = pokemons.join('')
    });
}

function pokemon(item){
    return `
    <a class="card" style="background:${item.color}" href="/characteristics.html?pokemon=${item.avatar}">
        <img class="card__image" src="/assets/images/stat/stat-${item.avatar}.png">
        <div class="card__title">${item.name}</div>
    </a>
    `;
}

function searchPokemon() {
    let input = document.getElementById('search__field').value
    input = input.toLowerCase();
    let card = document.getElementsByClassName('card__title');
      
    for (i = 0; i < card.length; i++) { 
        if (!card[i].innerHTML.toLowerCase().includes(input)) {
            card[i].parentNode.style.display="none";
        }
        else {
            card[i].parentNode.style.display="list-item";                 
        }
    }
}


