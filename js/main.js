
let courses = "";
// Listen for input in search bar and call function to filter courses
courseSearch.oninput = function () {
    searchCourses();    
}
var userInput = document.getElementById("courseSearch").innerHTML; 
var etarget = "";
courseSearch.addEventListener("input", (e) => etarget = e.target.value);

// When showOpen checkbox clicked show/hide full course listing
showOpen.onclick = function () {
    if (document.getElementById("showOpen").checked == true) {
      filterClosed();
    }
    else if (document.getElementById("showOpen").checked == false) {
      resetTable();
      strikeClosedCourses();
    }
}

// Call functions to change table to dark/light mode when checkbox clicked
darkMode.onclick = function () {
    if (document.getElementById("darkMode").checked == true) {
        darkTable();
        strikeClosedCourses();
    }
    else if (document.getElementById("darkMode").checked == false) {
        lightTable();
        strikeClosedCourses();
    }
}

// Get data from server
async function fetchJSON() {
    let response = await fetch("https://csc205.cscprof.com/courses");
    courses = await response.json();

    let course_Catalog = document.getElementById("course-catalog");
    let filtered_Courses = filterCourses(courses);
    let headings = Object.keys(filtered_Courses[0]);
    // Use data to generate table and cross out full courses
    generateTableHead(course_Catalog, headings);
    generateTable(course_Catalog, filtered_Courses);
    strikeClosedCourses();
}

window.onload = (event) => {
    // Call function to get data from server
    fetchJSON();
}

function filterCourses(courses) {
    courses.forEach(function (course) {
        /* let num = course.Department + " " + course.Number + " - " + course.Title;
        course.CourseTitle = num; */

        //delete course.id;
        delete course.Line;
        delete course.Section;
        delete course.Openings;
        delete course.Capacity;
        delete course["Start Date"];
        delete course["End Date"];
        delete course.Rating;
        delete course.Email;
    });
    return courses;
}

// Generate the Table Heading
function generateTableHead(target_Table, headings) {

    // Create the thead part of the table
    let thead = target_Table.createTHead();

    // Add a row to thead to hold the heading text
    let row = thead.insertRow();

    // Loop through keys and add the text to the table
    for (let key of headings) {

        let th = document.createElement("th");
        let text = document.createTextNode(key);

        th.appendChild(text);
        row.appendChild(th);
    }
}

// Generate the data
function generateTable(target_Table, data) {

    // Create the tbody as part of the table
    let tbody = target_Table.createTBody();
    tbody.setAttribute("id", "class-data");

    // Loop through the rows of data
    for (let element of data) {

        // Create a new row in the tbody
        let row = tbody.insertRow();

        // Loop through the data for the row
        for (key in element) {

            // Create a cell in the row
            let cell = row.insertCell();

            cell.innerHTML = removeNull(element);

            if (key == "Number") {
                let detailsLink = '<a href="details.html?id=' + element.id + '">' + element.Number + '</a>';
                cell.innerHTML = detailsLink; 
            }
            else {cell.innerHTML = element[key];}

            // Create a text node that has the cell content
            //let text = document.createTextNode(element[key]);

            // Add the text content to the cell
            //cell.appendChild(text);
        }
    }
}

// Strike out and change the font color of any closed courses
function strikeClosedCourses() {

    // Get a collection of rows from the table
    let courses = document.getElementById("course-catalog").rows;

    // Get the number of rows from the table
    let length = courses.length;

    // Loop through the courses in the table
    for (let i = 1; i < length; i++) {

        // Get status of course
        let courseStatus = courses.item(i).cells.item(5).innerHTML;

        // Mute and strikethrough text if course is closed
        if (courseStatus.toString() == "Full") {
            courses[i].className = 'text-decoration-line-through text-muted';
        }
    }
}

// Apply search criteria to table
function searchCourses() {
    let tbody = document.getElementById("class-data");
    tbody.remove();
  
    let x = courses.filter(oneClass => Object.keys(oneClass)
      .some(key => String(oneClass[key]).toLowerCase().includes(etarget.toLowerCase()))); 
    let table = document.getElementById("course-catalog");
    generateTable(table, x);
    strikeClosedCourses();
    
    // If no results are found, inform user
    if (x.length < 1) {
        document.getElementById("noResults").innerHTML = "No results found"
    }
}

// Get data from table, filter closed courses, and rebuild table
function filterClosed() {
    let tbody = document.getElementById("class-data");
    tbody.remove();
  
    let x = courses.filter(oneClass => Object.keys(oneClass)
    .some(key => String(oneClass[key]).includes('Open'))); 
    let table = document.getElementById("course-catalog");
    
    generateTable(table, x); 
}

// Reset table to show closed courses
function resetTable() {
    let tbody = document.getElementById("class-data");
    tbody.remove();
  
    let x = courses.filter(oneClass => Object.keys(oneClass)
    .some(key => String(oneClass[key]))); 
    let table = document.getElementById("course-catalog");
    
    generateTable(table, x); 
}

// Check data in cells and replace any nulls with N/A
function removeNull(dataCell) {
    if (!dataCell[key]) {
      dataCell[key] = "N/A";
    }
}

// Set table to dark mode
function darkTable() {
    let courseTable = document.getElementById("course-catalog");
    courseTable.setAttribute("class", "table table-dark table-striped table-hover")
}

// Set table to light mode
function lightTable() {
    let courseTable = document.getElementById("course-catalog");
    courseTable.setAttribute("class", "table table-striped table-hover");
}