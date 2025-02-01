const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];



const courseDetails = document.querySelector("#course-details");
function displayCourseDetails(course) {console.log(course)
    courseDetails.innerHTML = `
        <button id="closeModal">close</button>
        ${course}
    `;
    courseDetails.showModal();
    document.querySelector("#closeModal").addEventListener("click", (e) => {
        courseDetails.close();
    });
}


const courseList = document.querySelector("#course-list");

const courseCategories = document.querySelector("#course-categories");
const categories = ["All", "WDD", "CSE"];
let selectedCategory = "All";

const addToCourseList = (courseName, completed) => {
    courseList.innerHTML += `<li class="${completed ? 'completed' : 'not-completed'} ${courseName}">${courseName}</li>`;
}
const updateCourseList = (selectedCategory) => {
    courseList.innerHTML = '';
    if (!(categories.includes(selectedCategory))) 
        selectedCategory = "All";
    if (selectedCategory === "All") {
        courses.forEach((course) => {
            addToCourseList(`${course.subject}-${course.number}`, course.completed);
        });
    } else {
        courses.filter((course) => course.subject === selectedCategory).forEach((course) => {
            addToCourseList(`${course.subject}-${course.number}`, course.completed);
        });
    }

    if (selectedCategory === "All") {//changing innerHTML resets eventlisteners -> forEach loops/filter/if statements have to be repeated
        courses.forEach((course) => {
            //addToCourseList(`${course.subject} ${course.number}`, course.completed);
            document.querySelector(`.${course.subject}-${course.number}`).addEventListener("click", e => {
                displayCourseDetails(`${course.subject}:${course.number}`);
            });
        });
    } else {
        courses.filter((course) => course.subject === selectedCategory).forEach((course) => {
            document.querySelector(`.${course.subject}-${course.number}`).addEventListener("click", e => {
                displayCourseDetails(`${course.subject}:${course.number}`);
            });
            //addToCourseList(`${course.subject} ${course.number}`, course.completed);
        });
    }
    const totalCredits = courses.reduce((total, course) => course.subject === selectedCategory || selectedCategory === "All" ? total + course.credits : total, 0);
    document.querySelector("#total-credits").innerHTML = `Total Credits: ${totalCredits}`;
}

categories.forEach((category) => {
    courseCategories.innerHTML += `<li><button ${category === selectedCategory ? 'class="selected"' : ''} id="course-category-${category}">${category}</button></li>`
});
categories.forEach((category) => {
    courseCategories.querySelector(`#course-category-${category}`).addEventListener("click", (e) => {
        courseCategories.querySelector(`#course-category-${selectedCategory}`).classList.remove("selected");
        courseCategories.querySelector(`#course-category-${category}`).classList.add("selected");
        selectedCategory = category;
        updateCourseList(selectedCategory);
    });
});
updateCourseList(selectedCategory);

