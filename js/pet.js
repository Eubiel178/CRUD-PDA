import { LocalStorage } from "./class/index.js";

const pets = JSON.parse(localStorage.getItem("pets")) || [];
let indexPetEditing;

const localStorageInstance = new LocalStorage("pets", pets);

const form = document.querySelector("#form-register");
const buttonSubmit = document.querySelector("#button-submit");
const list = document.querySelector("#list-pets");

function handleDelete(index) {
  if (indexPetEditing === index) {
    const confirmResponse = confirm(
      "Esse pet esta sendo editado atualmente deseja apagar registro mesmo assim?"
    );

    if (confirmResponse) {
      form.reset();
      pets.splice(index, 1);
      indexPetEditing = undefined;
      buttonSubmit.innerText = "Cadastrar";

      localStorageInstance.save();
    }
  } else {
    pets.splice(index, 1);
    localStorageInstance.save();
  }

  renderList();
}

function handleEdit(index) {
  const pet = pets[index];
  document.querySelector("#username").value = pet.name;
  document.querySelector("#email").value = pet.email;
  document.querySelector("#breed").value = pet.petInfo.breed;
  document.querySelector("#contact").value = pet.contact;
  document.querySelector("#pet-name").value = pet.petInfo.name;
  document.querySelector("#service").value = pet.service;
  document.querySelector("#button-submit").innerText = "Atualizar";

  window.scrollTo({
    top: form.offsetTop - 100,
    behavior: "smooth",
  });

  indexPetEditing = index;
}

function renderList() {
  list.innerHTML = "";

  pets.forEach((pet, index) => {
    const li = document.createElement("li");
    const petInfo = document.createElement("div");
    const actions = document.createElement("div");
    const petName = document.createElement("h4");
    const contact = document.createElement("p");
    const service = document.createElement("p");
    const remove = document.createElement("button");
    const edit = document.createElement("button");

    li.classList.add("pet");
    petInfo.classList.add("pet-info");
    actions.classList.add("actions");
    remove.classList.add("remove");
    edit.classList.add("edit");

    petName.innerText = pet.petInfo.name + " - " + pet.petInfo.breed;
    contact.innerText = pet.contact;
    service.innerText = pet.service;
    remove.innerText = "Remover";
    edit.innerText = "Editar";

    remove.addEventListener("click", () => handleDelete(index));
    edit.addEventListener("click", () => handleEdit(index));

    petInfo.append(petName, contact, service);
    actions.append(edit, remove);
    li.append(petInfo, actions);
    list.appendChild(li);
  });
}

function handleCreate(event) {
  event.preventDefault();

  const data = {
    name: document.querySelector("#username").value,
    email: document.querySelector("#email").value,
    contact: document.querySelector("#contact").value,
    service: document.querySelector("#service").value,
    petInfo: {
      name: document.querySelector("#pet-name").value,
      breed: document.querySelector("#breed").value,
    },
  };

  if (indexPetEditing || indexPetEditing === 0) {
    pets[indexPetEditing] = data;
    console.log(pets[indexPetEditing]);
    indexPetEditing = undefined;
    buttonSubmit.innerText = "Cadastrar";
  } else {
    pets.push(data);
  }

  renderList();
  localStorageInstance.save();
  form.reset();
}

form.addEventListener("submit", handleCreate);
renderList();
