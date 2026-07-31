// ====================== ASSIGNED ORDERS ======================

const API_BASE_URL = 'https://fredda-unsurgical-martha.ngrok-free.dev';
const currentStaff = JSON.parse(localStorage.getItem('currentStaff'));

// if (!currentStaff) {
//     window.location.href = 'login.html';
// }

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentStaff');
    window.location.href = 'login.html';
});

// Mock Data (replace later with real API)
const allOrders = [
    {
        id: 'RJ1023',
        customer: 'John Mensah',
        service: 'Wash & Iron',
        weight: '8 kg',
        status: 'washing',
        time: '10:30 AM'
    },
    {
        id: 'RJ1024',
        customer: 'Abena Gyasi',
        service: 'Dry Clean',
        weight: '5 kg',
        status: 'sorting',
        time: '11:00 AM'
    },
    {
        id: 'RJ1025',
        customer: 'Kofi Addo',
        service: 'Wash & Fold',
        weight: '6 kg',
        status: 'pending',
        time: '11:30 AM'
    },
    {
        id: 'RJ1026',
        customer: 'Emelia Darko',
        service: 'Wash & Iron',
        weight: '7 kg',
        status: 'pending',
        time: '12:00 PM'
    }
];

let currentFilter = 'all';

// Render Orders
function renderOrders(filter = 'all') {
    const container = document.getElementById('ordersList');
    
    let filtered = allOrders;
    
    if (filter === 'pending') {
        filtered = allOrders.filter(o => o.status === 'pending');
    } else if (filter === 'in-progress') {
        filtered = allOrders.filter(o => o.status === 'washing' || o.status === 'sorting');
    } else if (filter === 'completed') {
        filtered = allOrders.filter(o => o.status === 'completed');
    }

    if (filtered.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#888; padding:40px;">No orders found</p>`;
        return;
    }

    container.innerHTML = filtered.map(order => `
        <div class="order-card">
            <div class="order-left">
                <div class="order-icon">
                    <i class="fas fa-tshirt"></i>
                </div>
                <div class="order-details">
                    <h3>#${order.id} • ${order.customer}</h3>
                    <p>${order.service} • ${order.weight}</p>
                </div>
            </div>
            <div class="order-right">
                <div class="order-meta">
                    <div class="time">${order.time}</div>
                    <span class="status-badge ${order.status}">${order.status}</span>
                </div>
                <button class="btn-action" onclick="startOrder('${order.id}')">
                    Start / Update <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Filter Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.dataset.filter;
        renderOrders(currentFilter);
    });
});

// Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = allOrders.filter(order => 
        order.id.toLowerCase().includes(value) || 
        order.customer.toLowerCase().includes(value)
    );
    
    const container = document.getElementById('ordersList');
    container.innerHTML = filtered.map(order => `
        <div class="order-card">
            <div class="order-left">
                <div class="order-icon">
                    <i class="fas fa-tshirt"></i>
                </div>
                <div class="order-details">
                    <h3>#${order.id} • ${order.customer}</h3>
                    <p>${order.service} • ${order.weight}</p>
                </div>
            </div>
            <div class="order-right">
                <div class="order-meta">
                    <div class="time">${order.time}</div>
                    <span class="status-badge ${order.status}">${order.status}</span>
                </div>
                <button class="btn-action" onclick="startOrder('${order.id}')">
                    Start / Update <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join('');
});

// Start / Update Order
function startOrder(orderId) {
    // Later we will redirect to Order Details or Laundry Process page
    window.location.href = `order-details.html?id=${orderId}`;
}

// Initial Load
renderOrders();