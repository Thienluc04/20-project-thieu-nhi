
var courseAPI = 'http://localhost:3000/courses'


function start() {
    getCourses(renderCourses);
    handleCreateForm()
}

start();

// Get API
function getCourses(callback) {
    fetch(courseAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function renderCourses(courses) {
    var listCourseBlock = document.getElementById('list-course')

    var htmls = courses.map(function (course) {
        return `<li class="course-item-${course.id}">
                    <h1 class="course-name-${course.id}">${course.name}</h1>
                    <h3 class="course-description-${course.id}">${course.description}</h3>
                    <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                    <button onclick="handleUpdateCourse(${course.id})">Sửa</button>
                </li>`;
    });
    listCourseBlock.innerHTML = htmls.join('')

}

function createCourse(data, callback) {
    var options= {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseAPI, options)
        .then(function (response) {
            response.json();
        })
        .then(callback);
}

function handleDeleteCourse(id) {
    var options= {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseAPI + '/' + id, options)
        .then(function (response) {
            response.json();
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-' + id)
            if (courseItem) {
                courseItem.remove();
            }
        });
}


function handleUpdateCourse(id) {
    var nameInput = document.querySelector('input[name="name"]')
    var descriptionInput = document.querySelector('input[name="description"]')

    var courseName = document.querySelector('.course-name-' + id).innerText
    var courseDescription = document.querySelector('.course-description-' + id).innerText

    courseName = nameInput.value
    courseDescription = descriptionInput.value

    var updateBtn = document.querySelector('.update')
    updateBtn.innerText = "SAVE"

    updateBtn.onclick = function () {
        var updateData = {
            name: nameInput.value,
            description: descriptionInput.value
        }
        updateBtn.innerText = "Create"
        nameInput.value = ""
        descriptionInput.value = ""

        var options= {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        }
        fetch(courseAPI + '/' + id, options)
            .then(function (response) {
                response.json();
            })
            .then(function() {
                getCourses(renderCourses);
                
            });

    }
}


function handleCreateForm() {
    var createBtn = document.querySelector('#create')

    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        
        var nameInput = document.querySelector('input[name="name"]')
        var descriptionInput = document.querySelector('input[name="description"]')

        nameInput.value = ""
        descriptionInput.value = ""
        
        var formData = {
            name: name,
            description: description,
        }

        createCourse(formData, function() {
            getCourses(renderCourses);
        })
        
    }
}