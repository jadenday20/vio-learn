function add_checkboxes(){
    let assignments = document.querySelectorAll('.assignments > *');
    let ul = document.querySelector('.assignments')
    assignments.forEach(get_checkboxes);
    
    function get_checkboxes(assignment){
        if (assignment.tagName === 'LI'){
            let text = assignment.textContent;
            let checkbox = document.createElement('input');
            let label_text = document.createElement('span');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('name', text);
            label_text.textContent = text;
            let label = document.createElement('label');
            // label.setAttribute('for', text)
            ul.appendChild(label);
            label.appendChild(checkbox);
            label.appendChild(label_text);
            ul.appendChild(document.createElement('br'));
            assignment.remove();
        }
        else{
            const clone = assignment.cloneNode(true);
            ul.appendChild(clone);
            assignment.remove();
        }
        
    }
    let checklist_button = document.querySelector('#checklist_view');
    checklist_button.style.display = 'none';
    let list_button = document.querySelector('#list_view');
    list_button.style.display = 'block';
}

function remove_checkboxes(){
    let assignments = document.querySelectorAll('.assignments > *');
    let ul = document.querySelector('.assignments')
    assignments.forEach(get_checkboxes);
    
    function get_checkboxes(assignment){
        if (assignment.tagName === 'LABEL'){
            let text = assignment.textContent;
            let li = document.createElement('li');
            li.textContent = text;
            ul.appendChild(li)
            assignment.remove();
        }
        else if (assignment.tagName === 'BR'){
            assignment.remove();
        }
        else{
            const clone = assignment.cloneNode(true);
            ul.appendChild(clone);
            assignment.remove();
        }
        
    }
    let checklist_button = document.querySelector('#checklist_view');
    checklist_button.style.display = 'block';
    let list_button = document.querySelector('#list_view');
    list_button.style.display = 'none';
}