const name = new URLSearchParams(window.location.search).get("pokemon");
const url = `https://6283929f92a6a5e462260498.mockapi.io/pokemon/${name}`;

function getCharacteristics(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const characteristics = characteristic(data);
        document.querySelector('main.container').innerHTML = characteristics;
        document.documentElement.style.setProperty('--pokemon-color', `${data.color}`);
        document.title = `Pokémon Unite | ${data.name}`;
        loadEvolutions(data);
    });
    
}

function characteristic(item){
    return `
        <section class="preview__container">
        <div class="preview__pokemon">
            <img src="/assets/images/stat/stat-${item.avatar}.png" alt="${item.name}" class="preview__image">
        </div>
        <div class="preview__details">
            <h1 class="pokemon__color">${item.name}</h1>
            <p class="preview__level">Nível: ${item.level}</p>
            <p class="preview__description">
            ${item.description}
            </p>
            <div class="preview__pills">
            <span class="preview__pill">${item.stats_battle[0]}</span>
            <span class="preview__pill">${item.stats_battle[1]}</span>
            </div>
        </div>
        </section>
        <section class="skills__container">
        <h2 class="skills__title pokemon__color">
            Skills do Pokémon
        </h2>
        <p class="skills__description">
            Esse Pokémon possui as seguintes habilidades de batalha:
        </p>
        <div class="skills__list">
            <div class="skills__item">
            <label class="skills__label pokemon__color">Ataque</label>
            <progress class="skills__progress pokemon__color" max="100" value="${item.skills.attack}"></progress>
            </div>
            <div class="skills__item">
            <label class="skills__label pokemon__color">Resistência</label>
            <progress class="skills__progress pokemon__color" max="100" value="${item.skills.resistance}"></progress>
            </div>
            <div class="skills__item">
            <label class="skills__label pokemon__color">Mobilidade</label>
            <progress class="skills__progress pokemon__color" max="100" value="${item.skills.mobility}"></progress>
            </div>
            <div class="skills__item">
            <label class="skills__label pokemon__color">Pontuação</label>
            <progress class="skills__progress pokemon__color" max="100" value="${item.skills.punctuation}"></progress>
            </div>
            <div class="skills__item">
            <label class="skills__label pokemon__color">Apoio</label>
            <progress class="skills__progress pokemon__color" max="100" value="${item.skills.support}"></progress>
            </div>
        </div>
        </section>
        <section class="evolutions__container">
            <h2 class="pokemon__color">Evoluções</h2>
            <p class="evolutions__description">Esse Pokémon pode evoluir em:</p>
            <div class="evolutions__list">

            </div>
        </section>
    `;
}

function loadEvolutions(pokemon) {

    if (pokemon.evolutions.length === 0) {
        document.querySelector('.evolutions__container').innerHTML = `
            <h2 class="pokemon__color">Evoluções</h2>
            <p class="evolutions__description">Esse Pokémon não possui evoluções</p>
        `
    }  else {
        const evolutions = pokemon.evolutions.map((evolution) => `
            <div class="evolutions__item">
                <img src="/assets/images/evolution/${((evolution.avatar).replace('+', '-')).replace('+', '-')}" alt="${evolution.name}" class="evolutions__image">
                <div class="evolutions__details">
                    <p class="evolutions__name pokemon__color">${evolution.name}</p>
                    <p class="evolutions__level">${evolution.level === null ? '' : `Nível ${evolution.level}`}</p>
                </div>
            </div>
        `)
        document.querySelector('.evolutions__list').innerHTML = evolutions.join('')
    }
}

getCharacteristics();