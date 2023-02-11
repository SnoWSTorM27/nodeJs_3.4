document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    
    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }

  if (event.target.dataset.type === 'update') {
    const id = event.target.dataset.id;

    const newTitle = prompt("Введите новое название").trim();
    if (newTitle) {
      update({
        id,
        title: newTitle
      }).then(() => {
        event.target.closest('li').querySelector('#title').textContent = newTitle;
      })
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}

async function update({id, title}) {
  await fetch(`${id}`, {
    method: 'PUT',
    body: JSON.stringify({id, title}),
    headers: {
      "Content-Type": "application/json",
    }
  })
}