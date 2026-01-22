let userList = null;
let isUserListFetched = false;
const userCardsHtml = document.getElementById("userCards");

const searchBoxHtml = document.getElementById("searchBox");
searchBoxHtml.addEventListener('input', (event) => { search(event); });

function search(event) {
    let nameToSearch = event.target.value;

    //if searchbox is empty then display all the users
    if (nameToSearch.trim() == "") {
        main();
        return null;
    }

    let result = searchUserName(nameToSearch);

    let card = null;
    if (result != null) {
        card = createUserDetailCard(result);
        resetUserCardsWindow();
        displayUserCard(card);
    } else {
        userNotFound();
    }
}

function searchUserName(nameToSearch) {
    console.log("searching for name:" + nameToSearch);
    let result = userList.find((element) => {
        return element.name == nameToSearch
    });

    console.log("Search result:" + result);


    if (result != null) {
        return result;
    } else {
        return null;
    }
}

async function fetchUserList() {
    if (isUserListFetched == true) return userList;
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (response.ok) {
            const jsonResponse = await response.json();
            isUserListFetched = true;
            console.log("User details fetched succesfully");
            console.log("Total users:" + jsonResponse.length);
            console.log(jsonResponse);

            return jsonResponse;
        } else {
            throw new Error("Failed to fetch users!");
        }
    } catch (error) {
        console.error("Error occured while fetching user list:" + error);
    }
}

function displayUserCards(userDetailCards) {
    resetUserCardsWindow();

    for (let index = 0; index < userDetailCards.length; index++) {
        displayUserCard(userDetailCards[index]);
    }
}

function resetUserCardsWindow() {
    userCardsHtml.innerHTML = "";
}

function displayUserCard(userDetailCard) {
    userCardsHtml.appendChild(userDetailCard);
}

function createUserDetailCards(userList) {
    let userDetailCards = userList.map((element) => createUserDetailCard(element));
    return userDetailCards;
}

function createUserDetailCard(user) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add("userCard");

    let userNamDiv = document.createElement('div');
    userNamDiv.classList.add("userName");
    userNamDiv.textContent = user.name;

    let userEmailDiv = document.createElement('div');
    userEmailDiv.classList.add("userEmail");
    userEmailDiv.textContent = user.email;

    let userCompanyDiv = document.createElement('div');
    userCompanyDiv.classList.add("userCompany");
    userCompanyDiv.textContent = user.company.name;

    cardDiv.appendChild(userNamDiv);
    cardDiv.appendChild(userEmailDiv);
    cardDiv.appendChild(userCompanyDiv);

    return cardDiv;
}

async function main() {
    userList = await fetchUserList();
    const userDetailCards = createUserDetailCards(userList);
    displayUserCards(userDetailCards);
}

main();

function userNotFound() {
    let div = document.createElement("div");
    div.textContent = "No results found";
    resetUserCardsWindow();
    userCardsHtml.appendChild(div);
}
