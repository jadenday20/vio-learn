const requestURL = 'sheet_music/songs.json';

const cards = document.querySelector("#songs");

function displaySongs(song) {
    let card = document.createElement('section');
    let doc = document.createElement('iframe');
    let subtitle = document.createElement('p');
    card.setAttribute('id', song.file)

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

    if (song.audioFiles != ""){
        let audio_list = document.createElement('ul');
        audio_list.setAttribute("id", `${song.file}List`)
        audio_list.setAttribute("class", "audio-list");
        audio_list.style.display = "none";
        let audio_button = document.createElement('button');
        audio_button.style.margin = "15px auto";
        audio_button.setAttribute("onclick", `function toggleAudio(){const thisList = document.querySelector('#${song.file}List'); thisList.style.display == 'none' ? thisList.style.display = 'block' : thisList.style.display = 'none'};toggleAudio()`);
        audio_button.textContent = `${song.name} Audio Files`;
        function insertAudio(audioFile) {
            let audio_li = document.createElement('li');
            let label = document.createElement('label');
            let audio_tag = document.createElement('audio');
            let audio_source = document.createElement('source');

            audio_li.style.marginTop = "15px";
            label.textContent = audioFile;
            audio_tag.controls = "controls";
            audio_source.setAttribute('src', `audio_files/${audioFile}.m4a`);
            audio_source.setAttribute('type', `audio/mpeg`);
            audio_tag.appendChild(audio_source);
            audio_li.appendChild(label);
            audio_li.appendChild(audio_tag);
            audio_list.appendChild(audio_li);
        }

        audio_files = song.audioFiles;
        audio_files.forEach(insertAudio);
        card.append(audio_button);
        card.appendChild(audio_list);
    }
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