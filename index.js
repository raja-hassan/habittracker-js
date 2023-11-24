const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

addHabitBtn.addEventListener('click', addHabit);

function addHabit() {
  const habit = habitInput.value.trim();

  if (habit !== '') {
    const habitItem = document.createElement('div');
    habitItem.classList.add('habitItem');
    habitItem.innerHTML = `
      <span>${habit}</span>
      <div class="progressBar">
        <div class="progressFill"></div>
      </div>
      <div class="daysContainer"></div>
      <div class="streak">Streak: 0</div>
      <button class="resetBtn">Reset</button>
    `;
    habitList.appendChild(habitItem);
    habitInput.value = '';
  } else {
    alert('Please enter a habit!');
  }
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('habitItem')) {
    toggleDay(e.target);
  } else if (e.target.classList.contains('resetBtn')) {
    resetHabit(e.target.parentElement);
  }
});

function toggleDay(habitItem) {
  const daysContainer = habitItem.querySelector('.daysContainer');
  const progressFill = habitItem.querySelector('.progressFill');
  const streakCount = habitItem.querySelector('.streak');
  const streakValue = parseInt(streakCount.textContent.split(': ')[1]);

  const day = document.createElement('span');
  day.classList.add('day');

  if (daysContainer.childElementCount < 30) {
    day.classList.toggle('checked');
    daysContainer.appendChild(day);
    updateProgress(habitItem, progressFill, streakCount, streakValue + 1);
  } else {
    alert('You have reached the maximum days!');
  }
}

function updateProgress(habitItem, progressFill, streakCount, newStreak) {
  const daysContainer = habitItem.querySelector('.daysContainer');
  const checkedDays = daysContainer.querySelectorAll('.checked').length;
  const progress = (checkedDays / 30) * 100;
  progressFill.style.width = progress + '%';

  streakCount.textContent = `Streak: ${newStreak}`;
}

function resetHabit(habitItem) {
  const daysContainer = habitItem.querySelector('.daysContainer');
  const progressFill = habitItem.querySelector('.progressFill');
  const streakCount = habitItem.querySelector('.streak');
  
  daysContainer.innerHTML = '';
  progressFill.style.width = '0%';
  streakCount.textContent = 'Streak: 0';
}
