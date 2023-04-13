const form = document.querySelector('form');
const lyricsDiv = document.querySelector('#lyrics');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const artist = document.querySelector('#artist').value;
    const title = document.querySelector('#title').value;
    fetch(`https://api.vagalume.com.br/search.php?art=${artist}&mus=${title}&apikey=AIzaSyAjsm_rxEOqdEbaCxLYXBn4nM2VAb-BHkk`)
        .then(response => response.json())
        .then(data => {
            if (data.type === 'exact' && data.mus.length > 0) {
                lyricsDiv.innerHTML = data.mus[0].text.replace(/\n/g, '<br>');
            } else {
                throw new Error('No se encontraron resultados');
            }
        })
        .catch(error => {
            lyricsDiv.innerText = `Error: ${error.message}`;
        });
});