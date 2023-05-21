console.log("running scripts")

document.addEventListener('DOMContentLoaded', () => {
    displayArtists();
    addSubmitListener();

})

function displayArtists() {
    fetch("http://localhost:3000/artdata")
        .then(res => res.json())
        .then(artists => {
            artists.forEach(artist => renderOneArtist(artist))
            // console.log(artists)
            showArtistDetails(artists[0])
        });
}

function addSubmitListener() {
    const artistForm = document.getElementById("new-artist");

    artistForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewArtist()
        artistForm.reset();
    })
}

function renderOneArtist(artist) {
    const artistImg = document.createElement('img');
    const artistDiv = document.createElement('div');
    const artistMenu = document.getElementById("artist-menu");

    artistImg.src = artist.image;


    artistMenu.append(artistDiv);
    artistDiv.append(artistImg);

    artistImg.addEventListener("mouseover", () => showArtistDetails(artist));




    const deleteButton = document.createElement("button");
    deleteButton.textContent = "remove";
    deleteButton.className = "delete-btn";
    artistDiv.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteArtist(artist.id, artistDiv))


}

function addGlow(artists) {
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


function showArtistDetails(artist) {
    const detailImage = document.getElementById("detail-image");
    const detailName = document.getElementById("detail-name");

    const detailId = document.getElementById("detail-id");
    const detailTitle = document.getElementById("detail-title");


    detailImage.src = artist.image;
    detailName.textContent = artist.name;

    detailId.textContent = artist.id;
    detailTitle.textContent = artist.title;


}

function addNewArtist() {
    const newName = document.getElementById("new-name").value;

    const newImage = document.getElementById("new-image").value;
    const newId = document.getElementById("new-id").value;
    const newTitle = document.getElementById("new-title").value;

    const newArtist = {
        "name": newName,

        "image": newImage,
        "id": newId,
        "title": newTitle
    }
    fetch("http://localhost:3000/artdata", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtist)
    })

    renderOneArtist(newArtist);


    showArtistDetails(newArtist);
}


function deleteArtist(id, artistDiv) {

    fetch(`http://localhost:3000/artists/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })


    artistDiv.remove();


    const placeholderInfo = {
        "name": "Click an Artist!",

        "image": "",
        "id": "Select a artist to display!",
        "title": "Same deal."
    }

    showArtistDetails(placeholderInfo);
}
