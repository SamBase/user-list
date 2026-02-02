export default async function fetchUserList() {
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
        fetchFailed();
        return null;
    }
}

function fetchFailed() {
    showRetryButton();
    const div = document.createElement("div");
    div.textContent = "Failed to fetch user details, please press 'retry' button to try again."
    userCardsHtml.appendChild(div);
}
