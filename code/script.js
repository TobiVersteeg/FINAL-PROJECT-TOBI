// const selectedFiltersContainer = document.getElementById('selected-filters');
// const filterOptions = document.querySelectorAll('.filter-options input[type="checkbox"]');

// const MAX_SELECTION = 5;
// const colors = ['#f55c4e', '#4ec3f5', '#4ef58e', '#f5d94e', '#f5b54e'];

// filterOptions.forEach((checkbox, index) => {
//     checkbox.addEventListener('change', () => {
//         const selectedCount = selectedFiltersContainer.childElementCount;
        
//         if (checkbox.checked) {
//             if (selectedCount >= MAX_SELECTION) {
//                 checkbox.checked = false;
//                 alert("You can select a maximum of 5 filters.");
//                 return;
//             }

//             const filterLabel = document.createElement('div');
//             filterLabel.classList.add('selected-filter');
//             filterLabel.style.backgroundColor = colors[selectedCount % colors.length];
//             filterLabel.textContent = checkbox.parentElement.textContent.trim();
//             filterLabel.addEventListener('click', () => {
//                 checkbox.checked = false;
//                 filterLabel.remove();
//             });

//             selectedFiltersContainer.appendChild(filterLabel);
//         } else {
//             const filterToRemove = Array.from(selectedFiltersContainer.children).find(
//                 filter => filter.textContent.trim() === checkbox.parentElement.textContent.trim()
//             );
//             if (filterToRemove) filterToRemove.remove();
//         }
//     });
// });

const selectedFiltersContainer = document.getElementById('selected-filters');
const filterOptions = document.querySelectorAll('.filter-options input[type="checkbox"]');
const giftList = document.getElementById('gift-list');

const MAX_SELECTION = 5;
const colors = ['#f55c4e', '#4ec3f5', '#4ef58e', '#f5d94e', '#f5b54e'];

let selectedFilters = []; // Keeps track of active filters
let giftsData = [];

// Load the JSON database
fetch('gifts.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load gifts.json');
    return response.json();
  })
  .then(data => {
    giftsData = data;
    renderGifts(giftsData); // Render all gifts initially
  })
  .catch(error => console.error('Error loading JSON:', error));

// Function to render gifts based on filters
function renderGifts(gifts) {
  giftList.innerHTML = ''; // Clear the current list

  // Apply filters
  const filteredGifts = gifts.filter(gift => {
    // Check if gift matches at least two filters
    let matches = 0;

    // Match hobbies
    if (selectedFilters.some(filter => gift.categories.includes(filter))) matches++;

    // Match other criteria (budget, age, gender) based on your data structure
    selectedFilters.forEach(filter => {
      if (
        filter === gift.gender || // Match gender
        (Array.isArray(filter) && gift.price >= filter[0] && gift.price <= filter[1]) // Match budget
      ) {
        matches++;
      }
    });

    return matches >= 2; // Display gifts matching at least two filters
  });

  // Render filtered gifts
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

    const description = document.createElement('p');
    description.textContent = gift.description;
    giftContainer.appendChild(description);

    const links = document.createElement('div');
    gift.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link;
      a.textContent = 'View Gift';
      a.target = '_blank';
      a.className = 'gift-link';
      links.appendChild(a);
    });
    giftContainer.appendChild(links);

    giftList.appendChild(giftContainer);
  });
}

// Functionality for selecting and deselecting filters
filterOptions.forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    const selectedCount = selectedFiltersContainer.childElementCount;

    if (checkbox.checked) {
      if (selectedCount >= MAX_SELECTION) {
        checkbox.checked = false;
        alert('You can select a maximum of 5 filters.');
        return;
      }

      const filterValue = checkbox.value; // Assuming the value attribute contains the filter value
      selectedFilters.push(filterValue);

      const filterLabel = document.createElement('div');
      filterLabel.classList.add('selected-filter');
      filterLabel.style.backgroundColor = colors[selectedCount % colors.length];
      filterLabel.textContent = checkbox.parentElement.textContent.trim();
      filterLabel.addEventListener('click', () => {
        checkbox.checked = false;
        filterLabel.remove();
        selectedFilters = selectedFilters.filter(f => f !== filterValue); // Remove filter from active list
        renderGifts(giftsData); // Re-render gifts
      });

      selectedFiltersContainer.appendChild(filterLabel);
    } else {
      const filterValue = checkbox.value;
      selectedFilters = selectedFilters.filter(f => f !== filterValue); // Remove filter from active list

      const filterToRemove = Array.from(selectedFiltersContainer.children).find(
        filter => filter.textContent.trim() === checkbox.parentElement.textContent.trim()
      );
      if (filterToRemove) filterToRemove.remove();
    }

    renderGifts(giftsData); // Re-render gifts after filters update
  });
});
