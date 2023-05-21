document.addEventListener("DOMContentLoaded", () => {
    displayArtists();
    addSubmitListener();

})

// fetch artists

fetch("http://localhost:3000/artists")
    .then(res => res.json())
    .then(artistsData => {
        // artists.forEach(artist => renderOneArtist(artist))
        ArtistsDisplay(artistsData),
            showCaseArtist(artistsData[0]),
            addNewArtist()
    })

const ArtistsDisplayNav = document.querySelector("#artists-guild")

const artistName = document.querySelector(".name")
const artistDate = document.querySelector(".date")
const artistImage = document.querySelector(".detail-image")
const artistObjectName = document.querySelector("#object-name")
const artistTitle = document.querySelector("#title")


function ArtistsDisplay(artists) {
    artists.forEach(artist => {
        const eachArtist = document.createElement('img')
        eachArtist.src = artist.image
        ArtistsDisplayNav.appendChild(eachArtist)
        eachArtist.addEventListener("click", event => {
            showCaseArtist(artist)
        })
        eachArtist.addEventListener('mouseover', event => {
            addGlow(event, eachArtist);
        })
    })
}
// artistImage.addEventListener('mousemove', event => {
//     addGlow(event, artistImage);


function addGlow(event, artistImage) {
    const colors = ['red', 'blue', 'green'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    artistImage.style.borderColor = randomColor;
    artistImage.style.borderWidth = '5px';
    artistImage.style.borderStyle = 'solid';
    artistImage.style.transition = 'border-color 0.5s, border-width 0.5s';

    setTimeout(() => {
        artistImage.style.borderColor = '';
        artistImage.style.borderWidth = '';
        artistImage.style.borderStyle = '';
        artistImage.style.transition = '';
    }, 1000);
}

function addGlowToMainArtist(event, artistImage) {
    const colors = ['red', 'blue', 'green'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    artistImage.style.borderColor = randomColor;
    artistImage.style.borderWidth = '5px';
    artistImage.style.borderStyle = 'solid';
    artistImage.style.transition = 'border-color 0.5s, border-width 0.5s';
}


function showCaseArtist(artists) {
    artistName.textContent = artists.name
    artistDate.textContent = artists.date
    artistImage.textContent = artists.image
    artist.artistsObjectName = artists.objectname
    artistTitle.textContent = artists.title

    artistImage.addEventListener('mouseover', event => {
        addGlowToMainArtist(event, artistImage);

    })

}

const newArtistName = document.querySelector("#new-name")
const newArtistsDate = document.querySelector("#new-date")
const newArtistsImage = document.querySelector("#new-detail-image")
const newArtistsObjectName = document.querySelector("#new-object-name")
const newArtistsTitle = document.querySelector("#new-title")

function addNewArtist() {
    const newArtistForm = document.querySelector("#new-artist")
    newArtistForm.addEventListener('submit', event => {
        event.preventDefault()
        const newArtist = {
            name: newArtistName.value,
            date: newArtistsDate.value,
            image: newArtistsImage.value,
            artistObjectName: newArtistsObjectName.value,
            title: newArtistName.value,

        }
        ArtistsDisplay([newArtist])
    })
}

