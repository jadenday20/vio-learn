let assignments = document.querySelector('.assignments');
let label = document.createElement('label');
let select = document.createElement('select');

label.setAttribute('for', 'assignment-list')
select.setAttribute('name', 'assignment-list')
select.setAttribute('id', 'assignment-list')
select.setAttribute('multiple', 'true')

assignments.appendChild(label);
assignments.appendChild(select)

function get_checkboxes(assignment){
    let text = assignment.textContent;
    let checkbox = document.createElement('option');
    checkbox.setAttribute('value', text);
    assignment.appendChild(checkbox);
}

assignments.forEach(get_checkboxes);