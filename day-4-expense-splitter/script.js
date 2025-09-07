let hunger = 50;
let happiness = 50;
let energy = 50;

const hungerBar = document.getElementById('hunger');
const happinessBar = document.getElementById('happiness');
const energyBar = document.getElementById('energy');
const pet = document.getElementById('pet');
const message = document.getElementById('message');
function updateStatus() {
  hungerBar.textContent = hunger;
  happinessBar.textContent = happiness;
  energyBar.textContent = energy;

  // Optional: change color based on value
  document.getElementById('hunger').style.color = hunger < 20 ? 'red' : 'black';
  document.getElementById('happiness').style.color = happiness < 20 ? 'red' : 'black';
  document.getElementById('energy').style.color = energy < 20 ? 'red' : 'black';
}
document.getElementById('feed-btn').addEventListener('click', () => {
  hunger = Math.max(0, hunger - 20);
  happiness = Math.min(100, happiness + 5);
  pet.classList.add('playing');
  setTimeout(() => pet.classList.remove('playing'), 300);
  message.textContent = "Yum! Pet is fed.";
  updateStatus();
});

document.getElementById('play-btn').addEventListener('click', () => {
  happiness = Math.min(100, happiness + 15);
  energy = Math.max(0, energy - 10);
  pet.classList.add('playing');
  setTimeout(() => pet.classList.remove('playing'), 300);
  message.textContent = "Yay! Pet is happy.";
  updateStatus();
});

document.getElementById('sleep-btn').addEventListener('click', () => {
  energy = Math.min(100, energy + 20);
  hunger = Math.min(100, hunger + 5);
  pet.classList.add('sleeping');
  setTimeout(() => pet.classList.remove('sleeping'), 1000);
  message.textContent = "Zzz... Pet is sleeping.";
  updateStatus();
});
setInterval(() => {
  hunger = Math.min(100, hunger + 1);
  happiness = Math.max(0, happiness - 1);
  energy = Math.max(0, energy - 1);
  updateStatus();

  if(hunger >= 100) message.textContent = "Pet is starving!";
  if(energy <= 0) message.textContent = "Pet is exhausted!";
  if(happiness <= 0) message.textContent = "Pet is sad!";
}, 5000); // every 5 seconds
