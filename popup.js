document.getElementById("apiForm").addEventListener("submit", async(e) =>{
    e.preventDefault();

    const url = document.getElementById("url").value;
    const method = document.getElementById("method").value;
    const headers = document.getElementById("headers").value;
    const body = document.getElementById("body").value;

    try{
        const response = await fetch(url,
            {
                method,
                headers : headers ? JSON.parse(headers) : {},
                body : method !== "GET" ? JSON.stringify(JSON.parse(body)) : null
            }
        );

        const responseData = await response.json();
        document.getElementById("response").innerText = JSON.stringify(responseData, null, 2);
    } catch(error){
        document.getElementById("response").innerText = `Error: ${error.message}`;
    }
})