import {retryFetchHtml, userCardsHtml} from "./main.js"

export function showRetryButton() {
    retryFetchHtml.classList.remove("notVisible");
}

export function hideRetryButton() {
    retryFetchHtml.classList.add("notVisible");
}

export function resetUserCardsWindow() {
    userCardsHtml.innerHTML = "";
}

function displayUserCard(userDetailCard) {
    userCardsHtml.appendChild(userDetailCard);
}

export function displayUserCards(userDetailCards) {
    resetUserCardsWindow();

    for (let index = 0; index < userDetailCards.length; index++) {
        displayUserCard(userDetailCards[index]);
    }
}