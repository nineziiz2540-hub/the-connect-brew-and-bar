document.addEventListener('DOMContentLoaded', () => {
    // เมูกาแฟ
    const menuData = [
        { id: 'americano-ice', name: 'Americano Ice', price: 65, img: 'https://as2.ftcdn.net/v2/jpg/06/09/41/09/1000_F_609410904_L1MJUlP4gAmsVzHfAqwh8dB6s3Rguwn5.jpg',hasSweetness: true, category: 'drinks'},
        { id: 'latte-ice', name: 'Latte Ice', price: 70, img: 'https://yalamarketplace.com/upload/1675666033436.jpg',hasSweetness: true, category: 'drinks'},
        { id: 'cappuccino-ice', name: 'Cappuccino Ice', price: 70, img: 'https://yalamarketplace.com/upload/1675665497236.jpg',hasSweetness: true, category: 'drinks'},
        { id: 'mocha-ice', name: 'Mocha Ice', price: 75, img: 'https://yalamarketplace.com/upload/1623747365788.jpg',hasSweetness: true, category: 'drinks'},
        { id: 'dirty', name: 'Dirty', price: 80, img: 'https://www.debic.com/sites/default/files/styles/recipe_detail/public/2025-01/dirty-coffee-thai-tea.jpg.webp?itok=TZF0mMVi', category: 'drinks'},

    // เมนูน้ำสกัดเย็นผลไม้
        { id: 'orange-juice', name: 'น้ำส้มสกัดเย็น', price: 60, img: 'https://img.wongnai.com/p/1920x0/2023/03/31/9a822aee8a9c40c4b23716be4a317b43.jpg', category: 'fruit-drinks' },
        { id: 'lemon-juice', name: 'น้ำมะนาวสกัดเย็น', price: 60, img: 'https://www.top10.in.th/wp-content/uploads/2022/05/7-%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A1%E0%B8%B0%E0%B8%99%E0%B8%B2%E0%B8%A7%E0%B8%82%E0%B8%A7%E0%B8%94-%E0%B8%A2%E0%B8%B5%E0%B9%88%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AB%E0%B8%99-%E0%B8%AD%E0%B8%A3%E0%B9%88%E0%B8%AD%E0%B8%A2-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B8%A3%E0%B8%AA.jpg', category: 'fruit-drinks' },
        { id: 'apple-juice', name: 'น้ำแอปเปิ้ลสกัดเย็น', price: 60, img: 'https://th.tnnchemical.com/uploads/202133857/tnn-apple-juice-concentrate58000609698.png', category: 'fruit-drinks' },

    // เมนูอาหาร
        { id: 'kapaokaidao', name: 'กะเพราเนื้อ ไข่ดาว', price: 65, img: 'https://s359.thaicdn.net/pagebuilder/420d19a1-f33b-408d-8bee-f94c0b691fc3.jpg', category: 'food' },
        { id: 'kapaokaidao', name: 'กะเพราหมู ไข่ดาว', price: 65, img: 'https://s359.thaicdn.net/pagebuilder/3132fac8-2481-477d-8f83-54af38ccb434.jpg', category: 'food' },

    // เมนูขนมปัง
        { id: 'croissant-chochorat', name: 'ครัวซองต์-ช็อคโกแลต', price: 45, img: 'https://mooyoo.co.th/wp-content/uploads/2022/07/new-product-croffle-5.png', category: 'bakery' },
        { id: 'croissant-starberry', name: 'ครัวซองต์-สตอเบอรี่', price: 45, img: 'https://cdn.pixabay.com/photo/2021/09/27/16/10/croissant-6661477_1280.png', category: 'bakery' },

    // เครื่องดื่มอื่นๆ
        { id: 'water', name: 'น้ำเปล่า', price: 15, img: 'https://img.th.my-best.com/product_images/d68638208391099f2dc353bffc6ab717.jpeg?ixlib=rails-4.3.1&q=45&lossless=0&w=160&h=160&fit=clip&s=95a5363c0adb8ee1f760b4c67a7257a8', category: 'other-drinks' },
        { id: 'coke', name: 'โค้ก', price: 25, img: 'https://gda.thai-tba.or.th/wp-content/uploads/2018/07/coke-rgb-422-ml.png', category: 'other-drinks' },
        { id: 'pepsi', name: 'เป๊ปซี่', price: 25, img: 'https://gourmetmarketthailand.com/_next/image?url=https%3A%2F%2Fmedia-stark.gourmetmarketthailand.com%2Fproducts%2Fcover%2F8858998581054-1.webp&w=640&q=75', category: 'other-drinks' },
        { id: 'sprite', name: 'สไปรท์', price: 25, img: 'https://gda.thai-tba.or.th/wp-content/uploads/2018/07/sprite-rgb-1-l-dry.png', category: 'other-drinks' },
        { id: 'sponsor', name: 'สปอนเซอร์', price: 20, img: 'https://www.halal.co.th/storages/products/499894.jpg', category: 'other-drinks' },
    ];

    // ตัวแปร UI
    const menuItemsContainer = document.getElementById('menu-items');
    const orderList = document.getElementById('order-list');
    const subTotalSpan = document.getElementById('sub-total');
    const taxAmountSpan = document.getElementById('tax-amount');
    const grandTotalSpan = document.getElementById('grand-total');
    const sweetnessModal = document.getElementById('sweetness-modal');
    const closeButton = document.querySelector('.close-button');
    const sweetnessButtons = document.querySelectorAll('.sweetness-btn');
    const addToOrderButton = document.getElementById('add-to-order-btn');
    const menuTabs = document.querySelectorAll('.menu-tab');
    
    // QR Code Modal
    const qrModal = document.getElementById('qr-modal');
    const qrTotalAmountSpan = document.getElementById('qr-total-amount');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const payButton = document.getElementById('pay-button');
    const printButton = document.getElementById('print-button');

    // Timestamp
    const orderTimestampElement = document.getElementById('order-timestamp');

    // ตัวแปรสำหรับสถานะ
    let order = {};
    let selectedItem = null;
    let selectedSweetness = '';

    // ฟังก์ชันสำหรับคำนวณยอดรวมใหม่
    const updateSummary = () => {
        let subTotal = 0;
        for (const itemId in order) {
            const item = order[itemId];
            subTotal += item.price * item.quantity;
        }

        const tax = subTotal * 0.07;
        const grandTotal = subTotal + tax;

        subTotalSpan.textContent = subTotal.toFixed(2);
        taxAmountSpan.textContent = tax.toFixed(2);
        grandTotalSpan.textContent = grandTotal.toFixed(2);
    };

    // ฟังก์ชันสำหรับแสดงรายการในตะกร้า
    const renderOrderList = () => {
        // เพิ่มโค้ดนี้
    const now = new Date();
    const formattedDate = now.toLocaleDateString('th-TH', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const formattedTime = now.toLocaleTimeString('th-TH', {
        hour: '2-digit', 
        minute: '2-digit'
    });
    orderTimestampElement.textContent = `วันที่: ${formattedDate} เวลา: ${formattedTime}`;
        // จบโค้ดที่เพิ่ม
        orderList.innerHTML = '';
        for (const itemId in order) {
            const item = order[itemId];
            const li = document.createElement('li');
            
            const [itemName, sweetnessDetail] = item.name.includes('(')
                ? item.name.split('(').map(s => s.replace(')', ''))
                : [item.name, null];

            const sweetnessInfo = sweetnessDetail ? `<br>- ${sweetnessDetail}` : '';

            li.innerHTML = `
                <div class="item-info">
                    <h4>${itemName}</h4>
                    <p>${sweetnessInfo}</p>
                    <p>${item.price.toFixed(2)} THB</p>
                </div>
                <div class="item-quantity">
                    <button class="remove-item" data-id="${itemId}"><i class="fas fa-minus-circle"></i></button>
                    <span>${item.quantity}</span>
                    <button class="add-item" data-id="${itemId}"><i class="fas fa-plus-circle"></i></button>
                </div>
            `;
            orderList.appendChild(li);
        }
        updateSummary();
    };
    
    // ฟังก์ชันสำหรับสร้าง PromptPay QR Code
    const generatePromptPayQR = (amount) => {
        const promptpayData = `00020101021229370016A0000006770101030304015293005828453400030005404${amount.toFixed(2)}5802TH5907ACME Coffee6007BANGKOK6105101206304FE28`;
        qrcodeContainer.innerHTML = '';
        const qrcode = new QRCode(qrcodeContainer, {
            text: promptpayData,
            width: 250,
            height: 250,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    };

    // ฟังก์ชันสำหรับแสดงเมนูตามหมวดหมู่
    const renderMenuItems = (category) => {
        menuItemsContainer.innerHTML = '';
        const filteredMenu = menuData.filter(item => item.category === category);
        filteredMenu.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-item-card';
            card.setAttribute('data-id', item.id);
            card.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} THB</p>
            `;
            menuItemsContainer.appendChild(card);
        });
    };

    // Event listeners
    // จัดการการคลิกที่ปุ่มหมวดหมู่
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.getAttribute('data-category');
            renderMenuItems(category);
        });
    });

    // การคลิกที่เมนู
    menuItemsContainer.addEventListener('click', (event) => {
        const itemCard = event.target.closest('.menu-item-card');
        if (!itemCard) return;
        const itemId = itemCard.getAttribute('data-id');
        selectedItem = menuData.find(item => item.id === itemId);

        if (selectedItem.hasSweetness) {
            sweetnessModal.style.display = 'block';
        } else {
            if (order[itemId]) {
                order[itemId].quantity++;
            } else {
                order[itemId] = { ...selectedItem, quantity: 1 };
            }
            renderOrderList();
        }
    });

    // การเพิ่ม/ลดรายการในตะกร้า
    orderList.addEventListener('click', (event) => {
        const target = event.target.closest('button');
        if (!target) return;
        const itemId = target.getAttribute('data-id');
        if (target.classList.contains('remove-item')) {
            if (order[itemId] && order[itemId].quantity > 1) {
                order[itemId].quantity--;
            } else {
                delete order[itemId];
            }
        } else if (target.classList.contains('add-item')) {
            if (order[itemId]) {
                order[itemId].quantity++;
            }
        }
        renderOrderList();
    });

    // Event listener สำหรับปุ่ม "ชำระเงิน"
payButton.addEventListener('click', () => {
    const grandTotal = parseFloat(grandTotalSpan.textContent);
    if (grandTotal > 0) {
        qrTotalAmountSpan.textContent = grandTotal.toFixed(2);
        generatePromptPayQR(grandTotal);
        qrModal.style.display = 'block';
        // เพิ่มโค้ดนี้ เพื่อให้หน้าต่างพิมพ์แสดงขึ้นมาทันที
            window.print();
    } else {
        alert('โปรดเลือกรายการสินค้าก่อนชำระเงิน');
    }
});
    
    // Event listener สำหรับปุ่ม "พิมพ์"
printButton.addEventListener('click', () => {
    // ให้หน้าต่าง Print Preview แสดงขึ้นมา
    window.print();
    order = {};
    renderOrderList();
    orderTimestampElement.textContent = '';
});
    // การปิด Modal
    closeButton.addEventListener('click', () => {
        sweetnessModal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === sweetnessModal) {
            sweetnessModal.style.display = 'none';
        }
    });
    const qrCloseButton = qrModal.querySelector('.close-button');
    qrCloseButton.addEventListener('click', () => {
        qrModal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === qrModal) {
            qrModal.style.display = 'none';
        }
    });

    // การเลือกความหวาน
    sweetnessButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedSweetness = button.getAttribute('data-level');
            sweetnessButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    // การเพิ่มเมนูที่มีความหวานลงออเดอร์
    addToOrderButton.addEventListener('click', () => {
        if (selectedItem && selectedSweetness !== '') {
            const selectedSweetnessButton = document.querySelector('.sweetness-btn.selected');
            const sweetnessText = selectedSweetnessButton ? selectedSweetnessButton.textContent : '';

            const itemDisplayName = `${selectedItem.name} (${sweetnessText})`;
            const itemIdWithSweetness = selectedItem.id + '-' + selectedSweetness;

            if (order[itemIdWithSweetness]) {
                order[itemIdWithSweetness].quantity++;
            } else {
                order[itemIdWithSweetness] = {
                    id: itemIdWithSweetness,
                    name: itemDisplayName,
                    price: selectedItem.price,
                    quantity: 1
                };
            }
            renderOrderList();
            sweetnessModal.style.display = 'none';
            selectedSweetness = '';
            sweetnessButtons.forEach(btn => btn.classList.remove('selected'));
        }
    });

    // แสดงเมนูเริ่มต้นเมื่อโหลดหน้าเว็บ
    renderMenuItems('drinks');
    document.querySelector('[data-category="drinks"]').classList.add('active');
});