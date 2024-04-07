const commandInput = document.getElementById('commandInput');
commandInput.focus();

commandInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const command = commandInput.value.trim();
    if (command !== '') {
      processCommand(command);
      commandInput.value = '';
    }
  }
});


function printOutput(output) {
  const terminal = document.querySelector('.terminal');
  const outputDiv = document.createElement('div');
  outputDiv.innerHTML = output;
  terminal.appendChild(outputDiv);
}

let welcomeMessageShown = false;

// Se llama a esta función al cargar la página
showWelcomeMessage();

function showWelcomeMessage() {
  // Verificamos si el mensaje de bienvenida no ha sido mostrado antes
  if (!welcomeMessageShown) {
    printOutput('Welcome to the terminal simulation. Type "help" for available commands.');
    welcomeMessageShown = true; // Actualizamos la bandera para indicar que el mensaje ha sido mostrado
  }
}

// Función para obtener datos de un Pokémon de la PokeAPI
async function fetchPokemonData(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    const pokemonData = await response.json();
    return pokemonData;
  } catch (error) {
    return null;
  }
}

async function fetchRandomPokemonImage() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const randomPokemonIndex = Math.floor(Math.random() * data.results.length);
    const randomPokemonName = data.results[randomPokemonIndex].name;
    const pokemonData = await fetchPokemonData(randomPokemonName);
    if (!pokemonData) {
      throw new Error('Pokemon not found');
    }
    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemonData.sprites.front_default;
    printOutput(`Name: ${pokemonData.name}`);
    printOutput(`Height: ${pokemonData.height}`);
    printOutput(`Weight: ${pokemonData.weight}`);
    printOutput(pokemonImage.outerHTML);
  } catch (error) {
    printOutput('Failed to fetch Pokemon data');
  }
}


function processCommand(command) {
  showWelcomeMessage();
  console.log(command)

  const terminal = document.querySelector('.terminal');

  // Crear un nuevo div para el input del comando
  const inputDiv = document.createElement('div');
  inputDiv.classList.add("consola");

  // Crear el input
  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'text');
  inputElement.setAttribute('disabled', '');
  inputElement.value = `$ ${command}`; // Mostrar el comando ingresado por el usuario
  inputElement.setAttribute('id', 'commandInput');

  // Agregar el input al div del input
  inputDiv.appendChild(inputElement);

  // Agregar el div del input a la terminal
  terminal.appendChild(inputDiv);

  switch (command) {
    case 'help':
      printOutput('Available commands: about, date, help, info, ls, media, poke, social.');
      break;
    case 'social':
      printSocialLinks();
      break;
    case 'info':
      printOutput('This is a terminal simulation.');
      break;
    case 'date':
      getFormattedDate();
      break;
    case 'clear', 'c':
      clearTerminal();
      break;
    case 'ls -l', 'ls':
      ls();
      break;
    case 'media':
      openMedia();
      break;
    case 'poke':
      fetchRandomPokemonImage();
      break;
    case 'about':
      about();
      break;

    default:
      printOutput('Command not found. Type "help" for available commands.');
      break;
  }
}


function printSocialLinks() {
  const socialLinks = document.createElement('ul');
  socialLinks.classList.add('social-links');
  printOutput('Mis Redes Sociales de Contacto.');
  const facebookLink = createSocialLink('Facebook', 'https://web.facebook.com/jhon.vidal.90226', 'fa-facebook');
  const whatsappLink = createSocialLink('Whatsapp', 'https://api.whatsapp.com/send?phone=56959059544', 'fa-whatsapp');
  const instagramLink = createSocialLink('Instagram', 'https://www.instagram.com/logic_null', 'fa-instagram');
  const linkedInLink = createSocialLink('LinkedIn', 'https://www.linkedin.com/in/jhon-muller', 'fa-linkedin-in');
  const githubLink = createSocialLink('Github', 'https://github.com/MrJhonny', 'fa-github');
  const curriculumLink = createSocialLink('Curriculum', './assets/docs/CV_Ingles_Jhon-Muller.pdf', 'fa-wpforms');

  socialLinks.appendChild(facebookLink);
  socialLinks.appendChild(whatsappLink);
  socialLinks.appendChild(instagramLink);
  socialLinks.appendChild(linkedInLink);
  socialLinks.appendChild(githubLink);
  socialLinks.appendChild(curriculumLink);

  printOutput(socialLinks.outerHTML);
}

function ls() {
  printOutput("-r--r--r-- jmuller jmuller 17/06/1992 12:00 CV_Ingles_Jhon-Muller.pdf");
}

function about() {
  printOutput("Terminal Emulator Project created by Jhon Müller");
}

function createSocialLink(text, url, iconClass) {
  const linkItem = document.createElement('li');
  const link = document.createElement('a');
  const icon = document.createElement('i');

  link.href = url;
  icon.classList.add('fab', iconClass);
  // Agregar margen derecho al ícono para crear espacio entre el ícono y el texto
  icon.style.marginRight = '5px';
  link.appendChild(icon);
  link.appendChild(document.createTextNode(text));
  linkItem.appendChild(link);

  return linkItem;
}

function getFormattedDate() {
  const currentDateTime = new Date().toLocaleString();
  const formattedDateTime = `Current date and time: ${currentDateTime}`;
  printOutput(formattedDateTime);
}

function clearTerminal() {
  location.reload(); 
}

function openMedia() {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  commandInput.focus(); 
}
