// ====================== PROFILE PAGE ======================

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// If not logged in, redirect to login
if (!currentUser) {
    window.location.href = 'login.html';
}

// API Base URL (change this to your localtunnel URL)
const API_BASE_URL = 'https://fredda-unsurgical-martha.ngrok-free.dev';

// Load Profile Data
async function loadProfile() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/profile/${currentUser.id}`);

        if (!res.ok) throw new Error('Failed to load profile');

        const data = await res.json();

        // Fill the form
        document.getElementById('full_name').value = data.full_name || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('address').value = data.address || '';
        document.getElementById('city').value = data.city || '';
        document.getElementById('state').value = data.state || '';

        // Update sidebar
        document.querySelector('.profile-sidebar h3').textContent = data.full_name;
        document.querySelector('.profile-sidebar p').textContent = data.email;

    } catch (err) {
        console.error(err);
        showMessage('Could not load profile data', 'error');
    }
}

// Handle form submit
document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        full_name: document.getElementById('full_name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim()
    };

    try {
        const res = await fetch(`${API_BASE_URL}/api/profile/${currentUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await res.json();

        if (res.ok) {
            // Update localStorage too
            currentUser.full_name = formData.full_name;
            currentUser.email = formData.email;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            showMessage(result.message || 'Profile updated successfully!', 'success');
            loadProfile();
        } else {
            showMessage(result.message || 'Update failed', 'error');
        }

    } catch (err) {
        showMessage('Network error. Please try again.', 'error');
    }
});

function showMessage(text, type) {
    const msg = document.getElementById('message');
    msg.style.display = 'block';
    msg.style.padding = '12px 16px';
    msg.style.borderRadius = '8px';
    msg.style.marginBottom = '20px';
    msg.style.background = type === 'success' ? '#d4edda' : '#f8d7da';
    msg.style.color = type === 'success' ? '#155724' : '#721c24';
    msg.textContent = text;

    setTimeout(() => {
        msg.style.display = 'none';
    }, 4000);
}

// Load profile when page opens
loadProfile();