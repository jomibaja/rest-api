const darDeAlta = id => {
    console.log(id)
}

const fetchPets = async () => {
    const url = "https://us-central1-rest-api-6fc7a.cloudfunctions.net/api/pets"
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

window.onload = async () => {
    const pets = await fetchPets()
    const template = pets.reduce((acc, el) => 
    acc + tableTemplate(el), '')

    const tabla = document.getElementById('tabla')
    tabla.innerHTML = template
}
