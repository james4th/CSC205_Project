window.onload = (event) => {
    // Get the id of the course
    let id = getCourseId();
    let serverUrl = getServerUrl(id);

    // Call function to get data from server
    getCourseDetails(serverUrl);
}

// Fetch data from server
async function getCourseDetails(serverUrl) {
    let response = await fetch(serverUrl);
    let data = await response.json();
    // Fill in details with data
    fillCourseDetails(data);
}

// Add data from server to details page
function fillCourseDetails(details) {
    // Store keys and data, and create empty array
    let ids = Object.keys(details);
    let content = Object.values(details);
    let html_ids = [];
    //let detailsHeader = document.getElementById("details-header");

    // Loop through id's, delete any white space, and save in array
    for (let i = 0; i < ids.length; i++) {
        html_ids.push(ids[i].split(" ").join(""));
    }

    // Loop through html_ids and for each id add that content to the HTML page
    for (let i = 0; i < html_ids.length; i++) {
        // If field is Email, creat mailto link
        if (html_ids[i] == "Email") {
            let emailLink = '<a href="mailto:' + content[i] + '" class = "link-light">' + content[i] + '</a>';
            document.getElementById(html_ids[i]).innerHTML += emailLink;
        }
        // Generate header
        /* else if (html_ids[i] == "Department") {detailsHeader.innerHTML += content[i];}
        else if (html_ids[i] == "Number") {detailsHeader.innerHTML += " " + content[i];}
        else if (html_ids[i] == "Title") {detailsHeader.innerHTML += " - " + content[i];} */
        else {document.getElementById(html_ids[i]).innerHTML += removeNull(content[i]);}
    }
}

function getCourseId() {
    let url_str = document.URL;
    let url = new URL(url_str);
    return url.searchParams.get('id');
}


function getServerUrl(id){
    return "https://csc205.cscprof.com/courses/" + id;
}

// Check for null values and replace with N/A
function removeNull(dataCell) {
    if (!dataCell) {
      dataCell = "N/A";
      return dataCell;
    } else {return dataCell};
}