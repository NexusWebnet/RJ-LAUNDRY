// ====================== CUSTOMER DASHBOARD JS ======================

document.addEventListener('DOMContentLoaded', function() {

    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    console.log('%c👋 RJ Laundry Dashboard Loaded Successfully!', 'color: #00A651; font-weight: bold; font-size: 14px;');

    // Quick Actions Hover Effect
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 166, 81, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.08)';
        });
    });

    // Fake Order Status Update (Demo)
    function simulateOrderUpdate() {
        const statusElement = document.querySelector('.status');
        if (statusElement) {
            const statuses = ['At Laundry', 'Washing', 'Ironing', 'Ready for Pickup', 'Out for Delivery'];
            let index = 0;
            
            setInterval(() => {
                index = (index + 1) % statuses.length;
                statusElement.textContent = statuses[index];
            }, 8000); // Update every 8 seconds (demo)
        }
    }

    simulateOrderUpdate();

    // Make "Order Now" button more interactive
    const orderBtn = document.querySelector('.btn-order');
    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            // You can prevent default if you want to add custom behavior
            console.log('User clicked Order Now');
        });
    }

    // Bottom Navigation Active State (Optional)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

});