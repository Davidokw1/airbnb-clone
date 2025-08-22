
        // Modal functionality
        const locationField = document.getElementById('location-field');
        const checkinField = document.getElementById('checkin-field');
        const checkoutField = document.getElementById('checkout-field');
        const guestsField = document.getElementById('guests-field');
        
        const locationModal = document.getElementById('location-modal');
        const datesModal = document.getElementById('dates-modal');
        const guestsModal = document.getElementById('guests-modal');
        
        const closeButtons = document.querySelectorAll('.close-modal');
        const modalButtons = document.querySelectorAll('.modal-button');
        
        // Sample locations
        const sampleLocations = [
            'New York, NY',
            'Los Angeles, CA',
            'Chicago, IL',
            'Miami, FL',
            'San Francisco, CA',
            'Seattle, WA',
            'Austin, TX',
            'Denver, CO',
            'Boston, MA',
            'Washington, DC'
        ];
        
        // Open modals
        locationField.addEventListener('click', () => {
            locationModal.style.display = 'flex';
            document.getElementById('location-search').focus();
        });
        
        checkinField.addEventListener('click', () => {
            datesModal.style.display = 'flex';
        });
        
        checkoutField.addEventListener('click', () => {
            datesModal.style.display = 'flex';
        });
        
        guestsField.addEventListener('click', () => {
            guestsModal.style.display = 'flex';
        });
        
        // Close modals
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                locationModal.style.display = 'none';
                datesModal.style.display = 'none';
                guestsModal.style.display = 'none';
            });
        });
        
        modalButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('modal-button-secondary')) {
                    locationModal.style.display = 'none';
                    datesModal.style.display = 'none';
                    guestsModal.style.display = 'none';
                } else if (button.classList.contains('modal-button-primary')) {
                    // Save functionality
                    locationModal.style.display = 'none';
                    datesModal.style.display = 'none';
                    guestsModal.style.display = 'none';
                }
            });
        });
        
        // Location search
        const locationSearch = document.getElementById('location-search');
        const locationResults = document.getElementById('location-results');
        
        locationSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            locationResults.innerHTML = '';
            
            if (searchTerm.length > 0) {
                const filteredLocations = sampleLocations.filter(location => 
                    location.toLowerCase().includes(searchTerm)
                );
                
                filteredLocations.forEach(location => {
                    const resultItem = document.createElement('div');
                    resultItem.style.padding = '10px';
                    resultItem.style.cursor = 'pointer';
                    resultItem.style.borderRadius = '8px';
                    resultItem.textContent = location;
                    
                    resultItem.addEventListener('click', () => {
                        locationField.querySelector('input').value = location;
                        locationModal.style.display = 'none';
                    });
                     resultItem.addEventListener('mouseenter', () => {
                        resultItem.style.backgroundColor = '#F7F7F7';
                    });
                    
                    resultItem.addEventListener('mouseleave', () => {
                        resultItem.style.backgroundColor = 'transparent';
                    });
                    
                    locationResults.appendChild(resultItem);
                });
            }
        });
        
        // Date selection
        const checkinDate = document.getElementById('checkin-date');
        const checkoutDate = document.getElementById('checkout-date');
        
        checkinDate.addEventListener('change', () => {
            const checkinValue = checkinDate.value;
            if (checkinValue) {
                const checkin = new Date(checkinValue);
                const checkout = new Date(checkin);
                checkout.setDate(checkout.getDate() + 1);
                
                checkoutDate.min = checkout.toISOString().split('T')[0];
                
                // Format date for display
                const options = { month: 'short', day: 'numeric' };
                const formattedDate = checkin.toLocaleDateString('en-US', options);
                checkinField.querySelector('input').value = formattedDate;
            }
        });
        
        checkoutDate.addEventListener('change', () => {
            const checkoutValue = checkoutDate.value;
            if (checkoutValue) {
                // Format date for display
                const options = { month: 'short', day: 'numeric' };
                const formattedDate = new Date(checkoutValue).toLocaleDateString('en-US', options);
                checkoutField.querySelector('input').value = formattedDate;
            }
        });
        
        // Guest counter
        const guestCounterButtons = document.querySelectorAll('.guest-counter-btn');
        const adultsCount = document.getElementById('adults-count');
        const childrenCount = document.getElementById('children-count');
        const infantsCount = document.getElementById('infants-count');
        
        guestCounterButtons.forEach(button => {
            button.style.width = '32px';
            button.style.height = '32px';
            button.style.borderRadius = '50%';
            button.style.border = '1px solid #DDDDDD';
            button.style.backgroundColor = 'white';
            button.style.cursor = 'pointer';
            button.style.fontSize = '16px';
            
            button.addEventListener('click', () => {
                const type = button.dataset.type;
                const action = button.dataset.action;
                
                if (type === 'adults') {
                    let count = parseInt(adultsCount.textContent);
                    if (action === 'plus') {
                        count++;
                    } else if (action === 'minus' && count > 1) {
                        count--;
                    }
                     adultsCount.textContent = count;
                } else if (type === 'children') {
                    let count = parseInt(childrenCount.textContent);
                    if (action === 'plus') {
                        count++;
                    } else if (action === 'minus' && count > 0) {
                        count--;
                    }
                    childrenCount.textContent = count;
                } else if (type === 'infants') {
                    let count = parseInt(infantsCount.textContent);
                    if (action === 'plus') {
                        count++;
                    } else if (action === 'minus' && count > 0) {
                        count--;
                    }
                    infantsCount.textContent = count;
                }
                
                // Update guests field
                const Human = parseInt(adultsCount.textContent);
                const children = parseInt(childrenCount.textContent);
                const infants = parseInt(infantsCount.textContent);
                
                let guestsText = `${Human} adult${adults > 1 ? 's' : ''}`;
                if (children > 0) {
                    guestsText += `${children} child${children > 1 ? 'ren' : ''}`;
                }
                if (infants > 0) {
                    guestsText +=  `${infants} infant${infants > 1 ? 's' : ''}`;
                }
                
                guestsField.querySelector('input').value = guestsText;
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === locationModal) {
                locationModal.style.display = 'none';
            }
            if (e.target === datesModal) {
                datesModal.style.display = 'none';
            }
            if (e.target === guestsModal) {
                guestsModal.style.display = 'none';
            }
        });
        
        // Initialize guests field
        guestsField.querySelector('input').value = '1 adult';
