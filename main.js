async function fetchUserList(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        }else{
            throw new Error("Failed to fetch users!");
        }
    }catch(error){
        console.error(error);
    }
}

async function displayUsers(userList){
    console.log("displayUsers --START");
    
    try{
        const userCardsHtml = document.querySelector(".userCards");
        // const userCardsHtml = document.getElementById("xyz");

        console.log("userCardsHtml:"+userCardsHtml.outerHTML);
        

        let userListCards= userList.map((element)=>createUserDetailCard(element));
        console.log("--------"+userListCards);

        for (let index = 0; index < userListCards.length; index++) {
            userCardsHtml.appendChild(userListCards[index]);
        }

    }catch(error){
        console.error(error);
    }
    console.log("displayUsers --END");
}

function createUserDetailCard(user){
    try{
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
        

        return cardDiv;

    }catch(error){
        console.error(error);
    }
}

async function f1(){
    const userList = await fetchUserList();
    displayUsers(userList);
}

f1();