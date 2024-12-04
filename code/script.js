const selectedFiltersContainer = document.getElementById('selected-filters');
const filterOptions = document.querySelectorAll('.filter-options input[type="checkbox"]');
const priceSlider = document.getElementById('price-slider');
const priceDisplay = document.getElementById('price-display');
const giftList = document.getElementById('gift-list');

const MAX_SELECTION = 5;
const colors = ['#f55c4e', '#4ec3f5', '#4ef58e', '#f5d94e', '#f5b54e'];

let selectedFilters = [];
let maxPrice = 500;
let giftsData = [];

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

function matchesPriceFilter(price) {
  return price <= maxPrice;
}

function renderGifts(gifts) {
  giftList.innerHTML = '';

  const filteredGifts = gifts.filter(gift => {
    const matchesHobby = hobbyFilters.length === 0 || hobbyFilters.some(filter => gift.categories.includes(filter));
    const matchesPrice = matchesPriceFilter(gift.price);
    return matchesHobby && matchesPrice;
  });

  filteredGifts.forEach(gift => {
    const giftContainer = document.createElement('div');
    giftContainer.className = 'gift';

    const img = document.createElement('img');
    img.src = gift.image;
    img.alt = gift.name;
    giftContainer.appendChild(img);

    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';

    const name = document.createElement('h3');
    name.textContent = gift.name;
    infoContainer.appendChild(name);

    const price = document.createElement('p');
    price.textContent = `€${gift.price.toFixed(2)}`;
    infoContainer.appendChild(price);

    const button = document.createElement('button');
    button.textContent = 'View Gift';
    button.className = 'view-gift-btn';
    button.addEventListener('click', () => {
      viewGift(gift.id);
    });
    infoContainer.appendChild(button);

    giftContainer.appendChild(infoContainer);
    giftList.appendChild(giftContainer);
  });
}

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

function renderGifts(gifts) {
  giftList.innerHTML = '';

  const hobbyFilters = selectedFilters.filter(filter => !filter.includes('-'));

  const filteredGifts = gifts.filter(gift => {
    const matchesHobby = hobbyFilters.length === 0 || hobbyFilters.some(filter => gift.categories.includes(filter));
    const matchesPrice = matchesPriceFilter(gift.price);
    return matchesHobby && matchesPrice;
  });

  filteredGifts.forEach(gift => {
    const giftContainer = document.createElement('div');
    giftContainer.className = 'gift';

    const img = document.createElement('img');
    img.src = gift.image;
    img.alt = gift.name;
    giftContainer.appendChild(img);

    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';

    const name = document.createElement('h3');
    name.textContent = gift.name;
    infoContainer.appendChild(name);

    const price = document.createElement('p');
    price.textContent = `€${gift.price.toFixed(2)}`;
    infoContainer.appendChild(price);

    const button = document.createElement('button');
    button.textContent = 'View Gift';
    button.className = 'view-gift-btn';
    button.addEventListener('click', () => {
      viewGift(gift.id); 
    });
    infoContainer.appendChild(button);

    giftContainer.appendChild(infoContainer);
    giftList.appendChild(giftContainer);
  });
}


priceSlider.addEventListener('input', () => {
  maxPrice = parseInt(priceSlider.value, 10);
  priceDisplay.textContent = `€${maxPrice}`;
  renderGifts(giftsData);
});

function viewGift(giftId) {
  const gift = giftsData.find(g => g.id === giftId); 

  if (gift) {
      localStorage.setItem('giftDetail', JSON.stringify(gift));

      window.location.href = 'gift-detail.html';
  }
}


loadGifts();
