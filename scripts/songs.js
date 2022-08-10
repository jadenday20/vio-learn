const requestURL = 'sheet_music/songs.json';

const cards = document.querySelector("#songs");

function displaySongs(song) {
    let card = document.createElement('section');
    let doc = document.createElement('iframe');
    let subtitle = document.createElement('p');

    doc.setAttribute('src', `sheet_music/${song.file}.pdf`);
    doc.setAttribute('frameborder', `0`);
    subtitle.textContent = song.name;
    subtitle.setAttribute('class', 'sub');
    // doc.setAttribute('onload', `resizeIframe(this)`)
    // doc.onload = function(){
    //     doc.style.height = doc.contentWindow.document.documentElement.scrollHeight + 'px';
    // }
    card.appendChild(subtitle);
    card.appendChild(doc);
    cards.appendChild(card);
}

// function resizeIframe(frame) {
//     frame.style.height = frame.contentWindow.document.documentElement.scrollHeight + 'px';
// }

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject);  // temporary checking for valid response and data parsing
        const songs = jsonObject['songs'];
        songs.forEach(displaySongs);

    });