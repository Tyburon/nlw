

//pegando os estados da api do ibge
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()})
    .then(states =>{

        for(const state of states){

            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }

        
    })
}

//pegando as cidades por uf
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => {return res.json()})
    .then(cities =>{

        for(const city of cities){

            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        } 

        citySelect.disabled = false;

    })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
    

    /*
    (res) => {return res.json()}  tambem pode ser escrito assim: res => res.json()
*/

//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){

    item.addEventListener("click", handleSelectedItem)

}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(){
    const itemLi = event.target
    
    //add or remova a class
    itemLi.classList.toggle("selected")

//Preparando a seleção dos campos para o back-end

    const itemId = itemLi.dataset.id
    
    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound

    })

    //se ja tiver selecionado
    if(alreadySelected >= 0){

        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent

        })

        selectedItems = filteredItems

    //se não tiver selecionado
    //adicionar a seleção
    }else{

        selectedItems.push(itemId)

    }

    collectedItems.value = selectedItems

}