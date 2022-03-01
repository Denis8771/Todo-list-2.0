const addButtonNode = document.querySelector(".js-add-btn");
const itemsListNode = document.querySelector(".js-items-list");
const inputNode = document.querySelector(".js-input");
const wrapper = document.querySelector(".js-wrapper");

let itemsLocal = [];

if(localStorage.getItem('itemsLocal')){
    itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
};



addButtonNode.addEventListener('click', () => {
    const item = {
        id: `${Math.random()}`,
        text: inputNode.value,
        checked: false,
        archived: false,
        important: false
    }

    if(inputNode.value == "") return;
    itemsLocal.push(item);
    render();
    localStorage.setItem('itemsLocal',  JSON.stringify(itemsLocal));
    inputNode.value = "";
});

function toggleImportantById(id) {
    itemsLocal.forEach(item => {
        if (item.id === id) {
            item.important = !item.important;
        }
    })

    console.log(itemsLocal);
}

function deleteItem(id) {
    itemsLocal.forEach(item => {
        if (item.id === id) {
            item.archived = true;
        }
    })
}

function updateStorage() {
    localStorage.setItem('itemsLocal',  JSON.stringify(itemsLocal));

}
 
function render() {
    itemsListNode.innerHTML = itemsLocal.map((elem, index) => {
        if (elem.archived) {
            return '';
        } 
        return `<li class='todoLi ${elem.important ? 'liBgrd' : ''}' data-id="${elem.id}">
            <input type="checkbox" id='${elem.id}' data-index='${index}' ${elem.checked ? 'checked' : '' }>        
            <label for="${elem.id}" class="js-label">${elem.text}</label>
            <button data-id="${elem.id}" class="btn">Delete</button>
        </li>`
        }).join(""); 
};

itemsListNode.addEventListener('click', (e) => {
    if(!e.target.matches('input')) return;
    const element = e.target.dataset.index;
    itemsLocal[element].checked = !itemsLocal[element].checked;
    updateStorage();
});


wrapper.addEventListener('dblclick', function(event){
    const target = event.target;
    const id = target.dataset.id;
    console.log(id);
    toggleImportantById(id);
    render();
    updateStorage(); 
})

itemsListNode.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    const id = event.target.dataset.id;
    deleteItem(id);
    render();
    localStorage.setItem('itemsLocal',  JSON.stringify(itemsLocal));
});

render();
