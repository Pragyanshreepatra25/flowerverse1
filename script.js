// Sample flower data (in a real application, this would come from an API)
let flowers = JSON.parse(localStorage.getItem('flowers')) || [
    {
        id: 1,
        name: "Rose",
        scientificName: "Rosa",
        description: "The rose is a woody perennial flowering plant of the genus Rosa. Roses are best known for their beautiful flowers, which come in many colors.",
        imageUrl: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        season: "Spring to Fall"
    },
    {
        id: 2,
        name: "Tulip",
        scientificName: "Tulipa",
        description: "Tulips are spring-blooming perennial herbaceous bulbiferous geophytes. They are known for their large, showy flowers.",
        imageUrl: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        season: "Spring"
    },
    {
        id: 3,
        name: "Sunflower",
        scientificName: "Helianthus annuus",
        description: "Sunflowers are known for their large, bright yellow flower heads that follow the sun throughout the day. They can grow up to 12 feet tall.",
        imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        season: "Summer"
    },
    {
        id: 4,
        name: "Orchid",
        scientificName: "Orchidaceae",
        description: "Orchids are known for their exotic beauty and unique flower structure. They are one of the largest families of flowering plants.",
        imageUrl: "https://images.unsplash.com/photo-1566908829550-e6551b00979b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        season: "Year-round"
    },
    {
        id: 5,
        name: "Lily",
        scientificName: "Lilium",
        description: "Lilies are known for their large, fragrant flowers that come in various colors. They are popular in gardens and floral arrangements.",
        imageUrl: "https://images.unsplash.com/photo-1597826368522-9f4cb5a6ba48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        season: "Summer"
    },
    {
        id: 6,
        name: "Daisy",
        scientificName: "Bellis perennis",
        description: "Daisies are simple yet charming flowers with white petals and a yellow center. They symbolize innocence and purity.",
        imageUrl: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        season: "Spring to Fall"
    },
    {
        id: 7,
        name: "Cherry Blossom",
        scientificName: "Prunus serrulata",
        description: "Cherry blossoms are known for their delicate pink flowers that bloom in spring. They are celebrated in Japanese culture.",
        imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        season: "Spring"
    },
    {
        id: 8,
        name: "Lavender",
        scientificName: "Lavandula",
        description: "Lavender is known for its fragrant purple flowers and calming scent. It's widely used in aromatherapy and gardens.",
        imageUrl: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        season: "Summer"
    },
    {
        id: 9,
        name: "Peony",
        scientificName: "Paeonia",
        description: "Peonies are known for their large, showy flowers and sweet fragrance. They are popular in wedding bouquets.",
        imageUrl: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        season: "Late Spring to Early Summer"
    },
    {
        id: 10,
        name: "Hydrangea",
        scientificName: "Hydrangea",
        description: "Hydrangeas are known for their large clusters of flowers that can change color based on soil pH. They are popular garden shrubs.",
        imageUrl: "https://images.unsplash.com/photo-1597826368522-9f4cb5a6ba48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        season: "Summer to Fall"
    }
];

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const flowersGrid = document.getElementById('flowers-grid');
const favoritesGrid = document.getElementById('favorites-grid');
const addFlowerForm = document.getElementById('add-flower-form');
const modal = document.getElementById('add-flower');
const addFlowerButton = document.getElementById('add-flower-button');

// Display flowers
function displayFlowers(flowersToDisplay, container) {
    if (!container) return;
    
    container.innerHTML = '';
    flowersToDisplay.forEach(flower => {
        const flowerCard = document.createElement('div');
        flowerCard.className = 'flower-card';
        
        // Create Wikipedia search URL
        const wikiSearch = encodeURIComponent(flower.name + ' flower');
        const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${wikiSearch}`;
        
        // Create shop search URL
        const shopSearch = encodeURIComponent(flower.name + ' flower plant');
        const shopUrl = `https://www.amazon.com/s?k=${shopSearch}`;
        
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userEmail = localStorage.getItem('userEmail');
        const isRecommended = userEmail && userRecommendations[userEmail]?.includes(flower.id);
        
        flowerCard.innerHTML = `
            <img src="${flower.imageUrl}" alt="${flower.name}" class="flower-image">
            <div class="flower-info">
                <h3>${flower.name}</h3>
                <p><em>${flower.scientificName}</em></p>
                <p>${flower.description}</p>
                <p><strong>Blooming Season:</strong> ${flower.season}</p>
                <div class="flower-actions">
                    <button onclick="addToFavorites(${flower.id})" class="favorite-btn">Add to Favorites</button>
                    <a href="${wikiUrl}" target="_blank" class="wiki-btn">Learn More</a>
                    <a href="${shopUrl}" target="_blank" class="buy-btn">Buy Now</a>
                    ${isLoggedIn ? `
                        <button onclick="addToRecommendations(${flower.id})" class="recommend-btn ${isRecommended ? 'recommended' : ''}">
                            ${isRecommended ? 'Recommended ✓' : 'Recommend'}
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        container.appendChild(flowerCard);
    });
}

// Search functionality
function searchFlowers(query) {
    query = query.toLowerCase();
    return flowers.filter(flower => 
        flower.name.toLowerCase().includes(query) ||
        flower.scientificName.toLowerCase().includes(query) ||
        flower.description.toLowerCase().includes(query)
    );
}

// Favorites functionality
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function addToFavorites(flowerId) {
    if (!favorites.includes(flowerId)) {
        favorites.push(flowerId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites!');
    } else {
        alert('This flower is already in your favorites!');
    }
}

function getFavoriteFlowers() {
    return flowers.filter(flower => favorites.includes(flower.id));
}

// Modal functionality
function openModal() {
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        if (addFlowerForm) {
            addFlowerForm.reset();
        }
    }
}

// Category filtering
function filterByCategory(category) {
    let filteredFlowers;
    switch(category.toLowerCase()) {
        case 'spring flowers':
            filteredFlowers = flowers.filter(flower => 
                flower.season.toLowerCase().includes('spring')
            );
            break;
        case 'summer flowers':
            filteredFlowers = flowers.filter(flower => 
                flower.season.toLowerCase().includes('summer')
            );
            break;
        case 'rare flowers':
            // For rare flowers, we'll show flowers that are less common
            filteredFlowers = flowers.filter(flower => 
                ['Orchid', 'Peony', 'Hydrangea'].includes(flower.name)
            );
            break;
        default:
            filteredFlowers = flowers;
    }
    
    // Update the flowers grid with filtered results
    const flowersGrid = document.getElementById('flowers-grid');
    if (flowersGrid) {
        displayFlowers(filteredFlowers, flowersGrid);
    }
}

// Initialize category cards
function initializeCategories() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent;
            filterByCategory(category);
            
            // Scroll to flowers section
            const flowersSection = document.getElementById('flowers-grid');
            if (flowersSection) {
                flowersSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Recommendation System
let userRecommendations = JSON.parse(localStorage.getItem('userRecommendations')) || {};

function addToRecommendations(flowerId) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    if (!userRecommendations[userEmail]) {
        userRecommendations[userEmail] = [];
    }

    if (!userRecommendations[userEmail].includes(flowerId)) {
        userRecommendations[userEmail].push(flowerId);
        localStorage.setItem('userRecommendations', JSON.stringify(userRecommendations));
    }
}

function getRecommendedFlowers() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail || !userRecommendations[userEmail]) return [];

    const recommendedIds = userRecommendations[userEmail];
    return flowers.filter(flower => recommendedIds.includes(flower.id));
}

// Add new flower functionality
if (addFlowerForm) {
    addFlowerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newFlower = {
            id: flowers.length + 1,
            name: document.getElementById('flower-name').value,
            scientificName: document.getElementById('scientific-name').value,
            description: document.getElementById('description').value,
            imageUrl: document.getElementById('image-url').value,
            season: document.getElementById('season').value,
            addedBy: localStorage.getItem('userEmail') || 'anonymous',
            dateAdded: new Date().toISOString()
        };
        
        flowers.push(newFlower);
        localStorage.setItem('flowers', JSON.stringify(flowers));
        displayFlowers(flowers, flowersGrid);
        closeModal();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Flower added successfully!';
        document.querySelector('.modal-content').appendChild(successMessage);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
}

// Function to get user's flowers
function getUserFlowers() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return [];
    
    return flowers.filter(flower => flower.addedBy === userEmail);
}

// Update initializePage function
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        // Home page - show featured flowers and recommendations if logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            const recommendedFlowers = getRecommendedFlowers();
            if (recommendedFlowers.length > 0) {
                displayFlowers(recommendedFlowers, flowersGrid);
            } else {
                displayFlowers(flowers.slice(0, 3), flowersGrid);
            }
        } else {
            displayFlowers(flowers.slice(0, 3), flowersGrid);
        }
        initializeCategories();
    } else if (currentPage === 'flowers.html') {
        // Flowers page - show all flowers and search
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            const userFlowers = getUserFlowers();
            if (userFlowers.length > 0) {
                // Show user's flowers first
                displayFlowers(userFlowers, flowersGrid);
                // Then show all flowers
                setTimeout(() => {
                    displayFlowers(flowers, flowersGrid);
                }, 100);
            } else {
                displayFlowers(flowers, flowersGrid);
            }
        } else {
            displayFlowers(flowers, flowersGrid);
        }
        
        // Add flower button functionality
        if (addFlowerButton) {
            addFlowerButton.addEventListener('click', () => {
                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                if (!isLoggedIn) {
                    alert('Please login to add flowers');
                    window.location.href = 'login.html';
                    return;
                }
                openModal();
            });
        }
        
        if (searchInput && searchButton) {
            searchButton.addEventListener('click', () => {
                const searchResults = searchFlowers(searchInput.value);
                displayFlowers(searchResults, flowersGrid);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const searchResults = searchFlowers(searchInput.value);
                    displayFlowers(searchResults, flowersGrid);
                }
            });
        }
    } else if (currentPage === 'favorites.html') {
        // Favorites page - show favorite flowers
        const favoriteFlowers = getFavoriteFlowers();
        displayFlowers(favoriteFlowers, favoritesGrid);
    }
}

// Initialize the current page
initializePage();

// Close modal when clicking outside
if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Login Form Handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const remember = document.getElementById('remember').checked;
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        try {
            // Check user credentials
            const users = JSON.parse(localStorage.getItem('users')) || {};
            const user = users[email];
            
            if (!user || user.password !== password) {
                alert('Invalid email or password');
                return;
            }
            
            // Login successful
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Login successful! Redirecting...';
            loginForm.appendChild(successMessage);
            
            // Redirect to home page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        }
    });
}

// Check login status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    
    // Update navigation based on login status
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        if (isLoggedIn) {
            // Replace login link with user menu
            const loginLink = navLinks.querySelector('a[href="login.html"]');
            if (loginLink) {
                loginLink.parentElement.innerHTML = `
                    <div class="user-menu">
                        <span>${userEmail}</span>
                        <button onclick="logout()" class="logout-button">Logout</button>
                    </div>
                `;
            }
        } else {
            // If not logged in and on login page, redirect to login
            if (window.location.pathname.includes('login.html')) {
                return; // Stay on login page
            }
        }
    }
}

// Logout function
function logout() {
    try {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred during logout. Please try again.');
    }
}

// Check login status when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    // Add input validation feedback
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            this.classList.remove('invalid');
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            this.classList.remove('invalid');
        });
    }
});

// Signup functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Basic validation
            if (!fullname || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (!terms) {
                alert('Please agree to the Terms & Conditions');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Password validation
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[email]) {
                alert('An account with this email already exists');
                return;
            }
            
            // Store user data
            users[email] = {
                fullname: fullname,
                password: password, // In a real app, this should be hashed
                favorites: [],
                recommendations: []
            };
            localStorage.setItem('users', JSON.stringify(users));
            
            // Auto login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
}); 