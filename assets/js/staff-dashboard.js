// // ====================== STAFF DASHBOARD ======================

// const API_BASE_URL = 'https://fredda-unsurgical-martha.ngrok-free.dev'; // ← change if needed
// const currentStaff = JSON.parse(localStorage.getItem('currentStaff'));

// // Protect page
// if (!currentStaff) {
//     window.location.href = 'login.html';
// }

// // Set staff name
// document.getElementById('staffName').textContent = currentStaff.full_name || 'Staff';
// document.getElementById('staffNameTop').textContent = currentStaff.full_name || 'Staff';

// // Logout
// document.getElementById('logoutBtn').addEventListener('click', () => {
//     localStorage.removeItem('currentStaff');
//     window.location.href = 'login.html';
// });

// // Load Dashboard Data
// async function loadDashboard() {
//     try {
//         // Example: Fetch stats (you will create this endpoint later)
//         // const res = await fetch(`${API_BASE_URL}/api/staff/dashboard/${currentStaff.id}`);
//         // const data = await res.json();

//         // Temporary mock data (replace later with real API)
//         const mockData = {
//             pending: 18,
//             washing: 6,
//             ironing: 4,
//             packaging: 2,
//             orders: [
//                 { id: 'RJ1023', customer: 'John Mensah', service: 'Wash & Iron', weight: '8 kg', status: 'washing' },
//                 { id: 'RJ1024', customer: 'Abena Gyasi', service: 'Dry Clean', weight: '5 kg', status: 'sorting' }
//             ],
//             notifications: [
//                 { message: 'New order #RJ1025 has been assigned to you.', time: '10 min ago' },
//                 { message: 'Order #RJ1021 has been completed.', time: '25 min ago' },
//                 { message: 'Express order #RJ1022 is ready for delivery.', time: '1 hour ago' }
//             ]
//         };

//         // Update stats
//         document.getElementById('pendingCount').textContent = mockData.pending;
//         document.getElementById('washingCount').textContent = mockData.washing;
//         document.getElementById('ironingCount').textContent = mockData.ironing;
//         document.getElementById('packagingCount').textContent = mockData.packaging;

//         // Render Orders
//         const ordersContainer = document.getElementById('todayOrders');
//         ordersContainer.innerHTML = mockData.orders.map(order => `
//             <div class="order-item">
//                 <div class="order-info">
//                     <h4>#${order.id} • ${order.customer}</h4>
//                     <p>${order.service} • ${order.weight}</p>
//                 </div>
//                 <div style="display:flex; align-items:center; gap:12px;">
//                     <span class="status ${order.status}">${order.status}</span>
//                     <button class="btn-start">Start Job →</button>
//                 </div>
//             </div>
//         `).join('');

//         // Render Notifications
//         const notifContainer = document.getElementById('recentNotifications');
//         notifContainer.innerHTML = mockData.notifications.map(n => `
//             <div class="notification-item">
//                 <i class="fas fa-bell"></i>
//                 <div>
//                     <p>${n.message}</p>
//                     <small>${n.time}</small>
//                 </div>
//             </div>
//         `).join('');

//     } catch (err) {
//         console.error('Dashboard load error:', err);
//     }
// }

// // Run on page load
// loadDashboard();