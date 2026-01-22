let userList = null;
const userCardsHtml = document.getElementById("userCards");

const searchBoxHtml = document.getElementById("searchBox");
searchBoxHtml.addEventListener('input', (event) => { search(event); });

function search(event) {
    let nameToSearch = event.target.value;

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
    try {
        console.log(userList)
        let result = userList.find((element) => {
            console.log(element);
            return element.name == nameToSearch
        });

        console.log("Search ended:" + result);


        if (result != null) {
            return result;
        } else {
            return null;
        }

    } catch (error) {
        console.error(error);
    }
}

async function fetchUserList() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            throw new Error("Failed to fetch users!");
        }
    } catch (error) {
        console.error(error);
    }
}

async function displayUserCards(userDetailCards) {

    try {
        resetUserCardsWindow();

        for (let index = 0; index < userDetailCards.length; index++) {
            displayUserCard(userDetailCards[index]);
        }
    } catch (error) {
        console.error(error);
    }

}

function resetUserCardsWindow() {
    userCardsHtml.innerHTML = "";
}

async function displayUserCard(userDetailCard) {
    try {
        console.log("displayUserCard userDetailCard");
        console.log(userDetailCard);

        userCardsHtml.appendChild(userDetailCard);
    } catch (error) {
        console.error(error);
    }
}

function createUserDetailCards(userList) {
    try {
        let userDetailCards = userList.map((element) => createUserDetailCard(element));
        console.log("User details cards all:" + userDetailCards);
        return userDetailCards;
    } catch (error) {
        console.error(error);
    }
}

function createUserDetailCard(user) {
    try {
        console.log("createUserDetailCard --START");
        console.log(user);

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

        console.log(cardDiv.outerHTML);

        console.log("createUserDetailCard --END");

        return cardDiv;

    } catch (error) {
        console.error(error);
        return null;
    }
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
