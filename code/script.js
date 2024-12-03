const selectedFiltersContainer = document.getElementById('selected-filters');
const filterOptions = document.querySelectorAll('.filter-options input[type="checkbox"]');
const giftList = document.getElementById('gift-list');

const MAX_SELECTION = 5;
const colors = ['#f55c4e', '#4ec3f5', '#4ef58e', '#f5d94e', '#f5b54e'];

let selectedFilters = [];
let giftsData = [];

// Load JSON data
async function loadGifts() {
  try {
    const response = await fetch('gifts.json');
    if (!response.ok) throw new Error('Failed to load gifts.json');
    giftsData = await response.json();
    renderGifts(giftsData);
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
}

// Render gifts based on filters
function renderGifts(gifts) {
  giftList.innerHTML = ''; // Clear the current list

  const filteredGifts = selectedFilters.length
    ? gifts.filter(gift =>
        selectedFilters.some(filter => gift.categories.includes(filter))
      )
    : gifts;

  filteredGifts.forEach(gift => {
    const giftContainer = document.createElement('div');
    giftContainer.className = 'gift';

    const img = document.createElement('img');
    img.src = gift.image;
    img.alt = gift.name;
    giftContainer.appendChild(img);

    const name = document.createElement('h3');
    name.textContent = gift.name;
    giftContainer.appendChild(name);

    const price = document.createElement('p');
    price.textContent = `€${gift.price.toFixed(2)}`;
    giftContainer.appendChild(price);

    gift.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link;
      a.textContent = 'View Gift';
      a.target = '_blank';
      giftContainer.appendChild(a);
    });

    giftList.appendChild(giftContainer);
  });
}

// Handle filter selection
filterOptions.forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    const selectedCount = selectedFiltersContainer.childElementCount;

    if (checkbox.checked) {
      if (selectedCount >= MAX_SELECTION) {
        checkbox.checked = false;
        alert('You can select a maximum of 5 filters.');
        return;
      }

      selectedFilters.push(checkbox.value);
      const filterLabel = document.createElement('div');
      filterLabel.classList.add('selected-filter');
      filterLabel.style.backgroundColor = colors[selectedCount % colors.length];
      filterLabel.textContent = checkbox.value;
      filterLabel.addEventListener('click', () => {
        checkbox.checked = false;
        filterLabel.remove();
        selectedFilters = selectedFilters.filter(f => f !== checkbox.value);
        renderGifts(giftsData);
      });

      selectedFiltersContainer.appendChild(filterLabel);
    } else {
      selectedFilters = selectedFilters.filter(f => f !== checkbox.value);
      const filterToRemove = Array.from(selectedFiltersContainer.children).find(
        filter => filter.textContent === checkbox.value
      );
      if (filterToRemove) filterToRemove.remove();
    }

    renderGifts(giftsData);
  });
});

// Initial load
loadGifts();
