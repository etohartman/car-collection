async function fetchCars() {
  const res = await fetch('/api/cars');
  const cars = await res.json();
  const list = document.getElementById('car-list');
  list.innerHTML = '';
  cars.forEach(car => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${car.year} ${car.make} ${car.model}</span>
      <div>
        <button onclick="editCar('${car._id}', '${car.make}', '${car.model}', ${car.year})">Edit</button>
        <button onclick="deleteCar('${car._id}')">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function addCar(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  await fetch('/api/cars', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) });
  form.reset(); fetchCars();
}

async function editCar(id, make, model, year) {
  const newMake = prompt('Make:', make);
  const newModel = prompt('Model:', model);
  const newYear = prompt('Year:', year);
  if (newMake && newModel && newYear) {
    await fetch(`/api/cars/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ make: newMake, model: newModel, year: Number(newYear) }) });
    fetchCars();
  }
}

async function deleteCar(id) {
  if (confirm('Delete this car?')) {
    await fetch(`/api/cars/${id}`, { method: 'DELETE' });
    fetchCars();
  }
}

document.getElementById('add-car-form').addEventListener('submit', addCar);
document.getElementById('logout').addEventListener('click', () => fetch('/auth/logout').then(() => window.location='/'));
window.onload = fetchCars;