async function fetchUserList(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if(response.ok){
            const jsonResponse = await response.json();
            console.log("typeof jsonResponse"+typeof jsonResponse);
            console.log("Array.isArray(jsonResponse)"+Array.isArray(jsonResponse));
        }else{
            throw new Error("Failed to fetch users!");
        }
    }catch(error){
        console.error(error);
    }
}

fetchUserList();