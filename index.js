'use strict';
function getRepo(userInput) {
    const toFetch = `https://api.github.com/search/repositories?q=user:${userInput}&sort=stars&order=asc`;
    fetch(toFetch)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`)

        })

}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.items.length; i++) {
        $('#results-list').append(
            `<li><h3><a href="${responseJson.items[i].html_url}" target="_blank">${responseJson.items[i].name}</a></h3>
            <p>${responseJson.items[i].created_at}</p>
            <p>${responseJson.items[i].owner.login}</p>
            </li>`
        )
    };

    $('#results').removeClass('hidden');
}




function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let userInput = $('.user-name').val();
        $('#results').addClass('hidden');
        getRepo(userInput);


    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});