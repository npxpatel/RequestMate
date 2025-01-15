document.getElementById("apiForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = document.getElementById("url").value;
    const method = document.getElementById("method").value;
    const headers = document.getElementById("headers").value;
    const body = document.getElementById("body").value;

    try {
        // Parse user-provided headers and add default headers
        const defaultHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };

        const userHeaders = headers ? JSON.parse(headers) : {};
        const combinedHeaders = { ...defaultHeaders, ...userHeaders };

        // Make the fetch request
        const response = await fetch(url, {
            method,
            headers: combinedHeaders,
            body: method !== "GET" ? JSON.stringify(JSON.parse(body)) : null
        });

        // Handle response
        const responseData = await response.json();
        document.getElementById("response").innerText = JSON.stringify(responseData, null, 2);
    } catch (error) {
        document.getElementById("response").innerText = `Error: ${error.message}`;
    }


    // adding request to history
    function saveRequestHistory(request){
        const history = JSON.parse(localStorage.getItem("requestHistory")) || [];
        history.push({...request, timestamp : new Date().toISOString()});
        localStorage.setItem("requestHistory" , JSON.stringify(history));
    }

    const currentRequest = {
        url,
        method,
        headers,
        body
    }

    saveRequestHistory(currentRequest);

    
});


