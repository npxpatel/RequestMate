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


// display request history

function displayRequestHistory() {
    const requestHistory = JSON.parse(localStorage.getItem("requestHistory")) || [];
    const historyContainer = document.getElementById("historyContainer");

    // Toggle visibility
    if (historyContainer.style.display === "block") {
        historyContainer.style.display = "none";
        document.getElementById("showHistory").textContent = "Show History";
        return;
    }


    historyContainer.innerHTML = ""; 

    requestHistory.forEach((request, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = ` ${request.method} ${request.url}`;
        listItem.textContent += `\n `;
        listItem.style.cursor = "pointer";
        listItem.onclick = () => populateForm(request);
        historyContainer.appendChild(listItem);
    });

    historyContainer.style.display = "block";
    document.getElementById("showHistory").textContent = "Hide History";
}


function populateForm(request) {
    document.getElementById("url").value = request.url;
    document.getElementById("method").value = request.method;
    document.getElementById("headers").value = request.headers;
    document.getElementById("body").value = request.body;
}


document.getElementById("showHistory").addEventListener("click", displayRequestHistory);


// clear History

function clearRequestHistory(){
    localStorage.removeItem("requestHistory");
}

document.getElementById("clearHistory").addEventListener("click", clearRequestHistory);

