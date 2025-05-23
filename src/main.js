// Data
let data;

// Components list
let minimizedTabs;
let fullTabs;


// Reading the data JSON
function getData() {

    // Read Json file
	const url = "data/projects.json";
	const xhr = new XMLHttpRequest();

	xhr.onload = (e) => {
		console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        
        // Load data
        data = JSON.parse(e.target.responseText);

        // Build tabs
        buildProjectsDisplay(data);
	};
	xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
	xhr.open("GET", url);
	xhr.send();
}


// Building projects display
// Assumes JSON is formatted correctly
function buildProjectsDisplay(projects) {
    if(projects == null) {
        console.log("Data is null");
        return;
    }
    
    // Getting reference to project section
    let projectContent = document.getElementById("projects");

    for(let i = 0; i < projects.categories.length; i++) {

        // Creating new category
        const newCategory = CreateCategory(projects.categories[i]);

        // Creating minimized tab
        const categorySmallTab = document.createElement("div");
        categorySmallTab.style.display = "none";
        for(let j = 0; j < projects.categories[i].projects.length && j < 3; j++) {

            const image = document.createElement("img");
            image.className = "skill-icon";
            image.src = "./media/" + projects.categories[i].projects[j].image;

            categorySmallTab.appendChild(image);
        }
        newCategory.appendChild(categorySmallTab);
        
        // Creating full tab
        const categoryFullTab = document.createElement("div");
        categoryFullTab.className = "projects-container";
        // categoryFullTab.style.display = "none";
        for(let j = 0; j < projects.categories[i].projects.length; j++) {
            categoryFullTab.appendChild(CreateProject(projects.categories[i].projects[j]));
        }
        newCategory.appendChild(categoryFullTab);

        projectContent.appendChild(newCategory);
    }
}


// Creating a new category element
function CreateCategory(data) {

    const newCategory = document.createElement("div");
    newCategory.className = "article";

    // Add title
    const name = document.createElement("h2");
    name.innerHTML = data.name;

    // Add components to category
    newCategory.appendChild(name);
    newCategory.appendChild(document.createElement("br"));

    return newCategory;
}

// Creating a new project element
function CreateProject(data) {

    // Fill in project information
    const project = document.createElement("div");
    project.className = "article project";

    // Creating image
    const image = document.createElement("img");
    image.className = "project-img";
    image.src = "./media/" + data.image;

    // Creating name
    const name = document.createElement("h2");
    name.innerHTML = data.name;

    // Creating description
    const description = document.createElement("p");
    description.innerHTML = data.description;

    // Creating button
    const button = document.createElement("button");
    if (data.demolink == "") {
        button.innerHTML = "Demo coming soon..."
    } else {
        button.innerHTML = "Live Demo"
        button.onclick = function (e) {
            window.open(data.demolink, '_blank');
        }
    }

    // Appending elements
    project.appendChild(image);
    project.appendChild(name);
    project.appendChild(description);
    project.appendChild(document.createElement("br"));
    project.appendChild(button);

    return project;
}


// Open or close a category
function ExpandProjectTab(miniTab, fullTab) {
    if(miniTab.style.display == "none") {
        miniTab.style.display = "flex";
        fullTab.style.display = "none";
    } else {
        miniTab.style.display = "none";
        fullTab.style.display = "flex";
    }
}

window.onload = function() {
    getData();
}
