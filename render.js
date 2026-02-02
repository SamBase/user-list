import {retryFetchHtml} from "./main.js"

export function showRetryButton() {
    retryFetchHtml.classList.remove("notVisible");
}

export function hideRetryButton() {
    retryFetchHtml.classList.add("notVisible");
}