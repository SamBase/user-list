let userList = null;
const searchBoxHtml = document.getElementById("searchBox");
searchBoxHtml.addEventListener('input', (event) => { pp(event); });

function pp(event) {
    let nameToSearch = event.target.value;

    if (nameToSearch.trim() == "") {
        f1();
        return null;
    }

    let result = searchUserName(nameToSearch);

    // let card = null;
    // if(result!=null){
    //     card = createUserDetailCard(result)
    // }else{
    //     card = "User not found";
    // }
    displayUsers([result]);
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

async function displayUsers(userList) {
    console.log("displayUsers --START");

    try {
        const userCardsHtml = document.querySelector(".userCards");
        userCardsHtml.innerHTML = "";

        let userListCards = userList.map((element) => createUserDetailCard(element));
        console.log("--------" + userListCards);

        for (let index = 0; index < userListCards.length; index++) {
            if (userListCards[index] != null) {
                userCardsHtml.appendChild(userListCards[index]);
            } else {
                let nullHtmlElement = document.createElement('div');
                nullHtmlElement.textContent="NULL"

                userCardsHtml.appendChild(nullHtmlElement);
            }
        }

    } catch (error) {
        console.error(error);
    }
    console.log("displayUsers --END");
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

async function f1() {
    userList = await fetchUserList();
    displayUsers(userList);
}

f1();