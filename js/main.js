
/**
 * courses - an array - indicated by the opening and closing [ ]
 * 
 * Each element of the array is a JSON object. { } indicate the start and the end of an object.  In the object are name/value pairs in 
 * the format of "name": "value"  If the value is numeric, the pair can be "name": 4  (no quotes around the number)
 * 
 * This format is JSON or JAvaScript Object Notation - more info here https://www.w3schools.com/js/js_json_intro.asp
 */

let courses = [
    {"Line":81,"Department":"BUS","Number":344,"Section":1,"Title":"MANAGEMENT OF INFORMATION SYSTEMS","Faculty":"Richards, Gordon P.","Openings":2,"Capacity":30,"Status":"Open","Day":"MWF","StartTime":"1:25:00 PM","EndTime":"2:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":167,"Department":"CSC","Number":133,"Section":2,"Title":"SURVEY OF COMPUTER SCIENCE","Faculty":"Madeira, Scott","Openings":6,"Capacity":15,"Status":"Open","Day":"H","StartTime":"2:00:00 PM","EndTime":"4:50 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":0,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":168,"Department":"CSC","Number":133,"Section":3,"Title":"SURVEY OF COMPUTER SCIENCE","Faculty":"Madeira, Scott","Openings":7,"Capacity":15,"Status":"Open","Day":"T","StartTime":"6:30:00 PM","EndTime":"9:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":0,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":169,"Department":"CSC","Number":133,"Section":"0A","Title":"SURVEY OF COMPUTER SCIENCE","Faculty":"Richards, Gordon P.","Openings":15,"Capacity":45,"Status":"Open","Day":"TH","StartTime":"8:00:00 AM","EndTime":"9:20 AM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 110 Chemistry room","Credits":4,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":170,"Department":"CSC","Number":190,"Section":1,"Title":"HTML","Faculty":"Madeira, Scott","Openings":4,"Capacity":25,"Status":"Open","Day":"M","StartTime":"2:30:00 PM","EndTime":"3:25 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 312A","Credits":1,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":171,"Department":"CSC","Number":205,"Section":1,"Title":"HCI DESIGN & PROGRAMMING","Faculty":"Madeira, Scott","Openings":10,"Capacity":25,"Status":"Open","Day":"MWF","StartTime":"11:15:00 AM","EndTime":"12:10 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":172,"Department":"CSC","Number":344,"Section":1,"Title":"MANAGEMENT INFORMATION SYSTEM","Faculty":"Poteete, Paul W. Steffine, Aaron","Openings":2,"Capacity":90,"Status":"Open","Day":"MWF","StartTime":"1:25:00 PM","EndTime":"2:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":173,"Department":"CSC","Number":363,"Section":"E1","Title":"DATABASE SYSTEMS","Faculty":"Hinderliter, Jeffery A","Openings":4,"Capacity":30,"Status":"Open","Day":"T","StartTime":"6:30:00 PM","EndTime":"9:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 233 Engineering Lab\/Classroom","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":296,"Department":"HUM","Number":103,"Section":"0A","Title":"INVITATION TO THE HUMANTIES","Faculty":"Miller, Eric John","Openings":12,"Capacity":180,"Status":"Open","Day":"W","StartTime":"11:15:00 AM","EndTime":"12:10 PM","Campus":" Main Campus","Building":" Old Main","Room":" John White Chapel","Credits":0,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021"}
]

// Create a filtered copy of the courses array
filtered_Courses = courses.filter(function(value, index, arr){
    delete value.Line;
    delete value.Section;
    delete value.Openings;
    delete value.Capacity;
    delete value.Campus;
    delete value["Start Date"];
    delete value["End Date"];
    return value;
})

// Pop up an alert on the page after the page and all stylesheets and images have loaded
window.onload = (event) => {

    // Create an annoying popup to show that we have access to the data in the courses JSON array
    alert(courses[5].Title);

    // Log a message to the console to show that you can use this for debugging purposes
    console.log('The page is loaded. We are in the console');

    // Get table from HTML, keys from the filtered courses, and call function to create table header
    let course_Catalog = document.getElementById("course-catalog")
    let headings = Object.keys(filtered_Courses[0]);
    generateTableHead(course_Catalog, headings);

    // Fill the table with course info
    generateTable(course_Catalog, filtered_Courses);

    // Cross out closed courses
    strikeClosedCourses();
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

    // Loop through the rows of data
    for (let element of data) {

        // Create a new row in the tbody
        let row = tbody.insertRow();

        // Loop through the data for the row
        for (key in element) {

            // Create a cell in the row
            let cell = row.insertCell();

            // Create a text node that has the cell content
            let text = document.createTextNode(element[key]);

            // Add the text content to the cell
            cell.appendChild(text);
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
        let courseStatus = courses.item(i).cells.item(4).innerHTML;

        // Mute and strikethrough text if course is closed
        if (courseStatus.toString() == "Closed") {
            courses[i].className = 'text-decoration-line-through text-muted';
        }
    }
}
