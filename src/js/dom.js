import '../css/style.scss';

var submit = document.querySelector('input[type="submit"]');
submit.addEventListener('click', handleSubmit);
var items = document.getElementById('items');
items.addEventListener('click', handleDelete);
var filter = document.getElementById('filter');
filter.addEventListener('keyup', filterItems);

function handleSubmit(e) {
    e.preventDefault();
    var newItem = document.getElementById('item').value;
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem));
    var button = document.createElement('button');
    button.className = 'btn btn-danger btn-sm float-right delete';
    button.appendChild(document.createTextNode('X'));
    li.appendChild(button);
    items.appendChild(li);    
}

function handleDelete(e) {
    e.preventDefault();
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
          var li = e.target.parentElement;
          items.removeChild(li);
        }
    }
}

function filterItems(e){
    var text = e.target.value.toLowerCase();
    var item = items.getElementsByTagName('li');
    Array.from(item).forEach(function(item){
      var itemName = item.firstChild.textContent;
      if(itemName.toLowerCase().indexOf(text) != -1){
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
}