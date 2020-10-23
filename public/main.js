const darDeAlta = id => {
    console.log(id)
}

const url = "https://us-central1-rest-api-6fc7a.cloudfunctions.net/api/pets"

const fetchPets = async () => {
    const response = await fetch(url)
    const json = await response.json()

    return json
}

const tableTemplate = ({ _id, nombre, tipo, descripción }) => `
    <tr>
        <td>${nombre}</td>
        <td>${tipo}</td>
        <td>${descripción}</td>
        <td><button onclick="darDeAlta('${_id}')">Dar de Alta</button></td>
    </tr>
`

const handleSubmit = async e => {
    e.preventDefault()
    const { nombre, tipo, descripción } = e.target
    const data = {
        nombre: nombre.value,
        tipo: tipo.value,
        descripción: descripción.value,
    }
    nombre.value = ''
    tipo.value = ''
    descripción.value = ''

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    const json = await response.json()
    const template = tableTemplate({
        ...data,
        _id: json,
    })

    const tabla = document.getElementById('tabla')
    tabla.insertAdjacentHTML('beforeend', template)
}

window.onload = async () => {
    const petForm = document.getElementById('pet-form')
    petForm.onsubmit = handleSubmit
    const pets = await fetchPets()
    const template = pets.reduce((acc, el) => 
    acc + tableTemplate(el), '')

    const tabla = document.getElementById('tabla')
    tabla.innerHTML = template
}
