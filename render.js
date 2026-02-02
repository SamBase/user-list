import { retryFetchHtml, userCardsHtml } from "./main.js"

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

export function reduceCardInfo() {
    const emailDivs = document.querySelectorAll(".userEmail");
    emailDivs.forEach(emailDiv => { emailDiv.classList.add("notVisible") });
}

export function extendCardInfo() {
    const emailDivs = document.querySelectorAll(".userEmail");
    emailDivs.forEach(emailDiv => { emailDiv.classList.remove("notVisible") });
}

export function hideSummary() {
    const summaryHtml = document.getElementById("summaryCard");
    summaryHtml.classList.add("notVisible");
}

export function unhideSummary() {
    const summaryHtml = document.getElementById("summaryCard");
    summaryHtml.classList.remove("notVisible");
}
