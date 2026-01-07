import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAndhLwumGYso3DYBteCrfCTecPk3NPTfw",
    authDomain: "the-connect-pos-db.firebaseapp.com",
    projectId: "the-connect-pos-db",
    storageBucket: "the-connect-pos-db.firebasestorage.app",
    messagingSenderId: "955501445672",
    appId: "1:955501445672:web:07356e61c24957032cab1d",
    measurementId: "G-7QKZTW0GFF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    
    // VARIABLES
    let dynamicMenuItems = []; 
    let order = {};
    let selectedItem = null;
    let selectedSweetness = '';

    // DOM
    const menuItemsContainer = document.getElementById('menu-items');
    const orderList = document.getElementById('order-list');
    const subTotalSpan = document.getElementById('sub-total');
    const grandTotalSpan = document.getElementById('grand-total');
    const menuTabs = document.querySelectorAll('.menu-tab');
    const orderTimestampElement = document.getElementById('order-timestamp');
    const salesReportModal = document.getElementById('sales-report-modal');
    const salesReportButton = document.getElementById('sales-report-button');
    const salesReportDetails = document.getElementById('sales-report-details');
    const deleteLastSaleButton = document.getElementById('delete-last-sale-btn');
    const resetSalesButton = document.getElementById('reset-sales-btn');
    const payAndPrintButton = document.getElementById('pay-and-print-button');
    const closeOrderButton = document.getElementById('close-order-button');
    const discountInput = document.getElementById('discount-input');
    const discountType = document.getElementById('discount-type');
    const clearOrderBtn = document.getElementById('clear-order-btn');
    const sweetnessModal = document.getElementById('sweetness-modal');
    const sweetnessButtons = document.querySelectorAll('.sweetness-btn');
    const addToOrderButton = document.getElementById('add-to-order-btn');
    const cashModal = document.getElementById('cash-modal');
    const cashPaymentBtn = document.getElementById('cash-payment-btn');
    const modalTotalDueSpan = document.getElementById('modal-total-due');
    const cashReceivedInput = document.getElementById('cash-received-input');
    const changeDueSpan = document.getElementById('change-due');
    const confirmCashPaymentBtn = document.getElementById('confirm-cash-payment-btn');
    
    // Modifiers & Menu Management
    const modifiersModal = document.getElementById('modifiers-modal');
    const modifiersItemName = document.getElementById('modifiers-item-name');
    const modifierOptionsContainer = document.getElementById('modifier-options-container');
    const addModifiedItemToOrderBtn = document.getElementById('add-modified-item-to-order-btn');
    const manageMenuBtn = document.getElementById('manage-menu-btn');
    const manageMenuModal = document.getElementById('manage-menu-modal');
    const saveNewItemBtn = document.getElementById('save-new-item-btn');
    const dynamicMenuList = document.getElementById('dynamic-menu-list');
    
    // Hold Order & Export
    const holdOrderBtn = document.getElementById('hold-order-btn');
    const holdOrderModal = document.getElementById('hold-order-modal');
    const confirmHoldOrderBtn = document.getElementById('confirm-hold-order-btn');
    const holdOrderNameInput = document.getElementById('hold-order-name');
    const viewHeldOrdersBtn = document.getElementById('view-held-orders-btn');
    const heldOrdersListModal = document.getElementById('held-orders-list-modal');
    const heldOrdersContainer = document.getElementById('held-orders-container');
    const exportExcelButton = document.getElementById('export-excel-btn');

    // --- LOGIN ---
    const loginModal = document.getElementById('login-modal');
    const loginInput = document.getElementById('login-pin-input');
    const loginBtn = document.getElementById('login-btn');
    const CORRECT_PIN = "5635"; 

    const checkLogin = () => {
        if (loginInput.value === CORRECT_PIN) {
            loginModal.style.display = 'none';
            loginInput.blur();
        } else {
            alert("รหัสผ่านไม่ถูกต้อง!");
            loginInput.value = '';
            loginInput.focus();
        }
    };

    if (loginBtn) {
        loginBtn.addEventListener('click', checkLogin);
        loginInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkLogin();
        });
    }

    // --- STATIC DATA ---
    const roastOptions = { 
        groupName: "ระดับการคั่ว (Roast)", 
        options: [
            { name: 'คั่วเข้ม (Dark)', price: 0 }, 
            { name: 'คั่วกลาง (Medium)', price: 0 }, 
            { name: 'คั่วอ่อน (Light)', price: 0 }
        ]
    };

    const sweetOptions = { 
        groupName: "ระดับความหวาน", 
        options: [
            { name: 'หวาน 100%', price: 0 }, 
            { name: 'หวาน 50%', price: 0 }, 
            { name: 'ไม่หวาน 0%', price: 0 }
        ]
    };

    const milkOptions = { 
        groupName: "ประเภทนม", 
        options: [
            { name: 'นมสด (ปกติ)', price: 0 }, { name: 'นมโอ๊ต', price: 10 }, { name: 'นมอัลมอนด์', price: 20 }
        ]
    };

    const extraOptions = { 
        groupName: "เพิ่มเติม", 
        options: [
            { name: 'ปกติ', price: 0 }, { name: 'เพิ่ม 1 ช็อต', price: 20 }
        ]
    };

    const stdCoffeeModifiers = [ roastOptions, sweetOptions, milkOptions, extraOptions ];
    const blackCoffeeModifiers = [ roastOptions, sweetOptions, extraOptions ];
    const espressoModifiers = [ roastOptions ];
    const stdNonCoffeeModifiers = [ sweetOptions, milkOptions ];
    const basicModifiers = [ sweetOptions ];

    const staticMenuData = [
        // COFFEE
        { id: 'c-espresso-h', name: 'Espresso (Hot)', nameThai: 'เอสเพรสโซ่ (ร้อน)', price: 55, cost: 22.53, category: 'coffee', modifiers: espressoModifiers }, 
        { id: 'c-americano-h', name: 'Americano (Hot)', nameThai: 'อเมริกาโน่ (ร้อน)', price: 60, cost: 23.13, category: 'coffee', modifiers: blackCoffeeModifiers },
        { id: 'c-americano-i', name: 'Americano (Iced)', nameThai: 'อเมริกาโน่ (เย็น)', price: 60, cost: 23.61, category: 'coffee', modifiers: blackCoffeeModifiers },
        { id: 'c-latte-h', name: 'Latte (Hot)', nameThai: 'ลาเต้ (ร้อน)', price: 60, cost: 26, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-latte-i', name: 'Latte (Iced)', nameThai: 'ลาเต้ (เย็น)', price: 70, cost: 24.74, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-cappu-h', name: 'Cappuccino (Hot)', nameThai: 'คาปูชิโน่ (ร้อน)', price: 60, cost: 26, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-cappu-i', name: 'Cappuccino (Iced)', nameThai: 'คาปูชิโน่ (เย็น)', price: 70, cost: 24.74, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-esyen', name: 'Es Yen Thai Style (Iced)', nameThai: 'เอสเย็น (เย็น)', price: 70, cost: 26.38, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-mocca-h', name: 'Mocca (Hot)', nameThai: 'มอคค่า (ร้อน)', price: 60, cost: 27, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-mocca-i', name: 'Mocca (Iced)', nameThai: 'มอคค่า (เย็น)', price: 70, cost: 26.63, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-caramel-mac', name: 'Caramel Macchiato (Iced)', nameThai: 'คาราเมล มัคคิอาโต้ (เย็น)', price: 70, cost: 25.49, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-orange-cof', name: 'Orange Coffee (Iced)', nameThai: 'ออเรนจ์ คอฟฟี่ (เย็น)', price: 70, cost: 28.31, category: 'coffee', modifiers: blackCoffeeModifiers },
        { id: 'c-coconut-cof', name: 'Coconut Coffee (Iced)', nameThai: 'โคโคนัท คอฟฟี่ (เย็น)', price: 70, cost: 28.31, category: 'coffee', modifiers: blackCoffeeModifiers },
        { id: 'c-affogato', name: 'Affogato Coffee', nameThai: 'อัฟโฟกาโต้ คอฟฟี่', price: 85, cost: 34.5, category: 'coffee', modifiers: [] }, 

        // MATCHA
        { id: 'm-clear-uji-h', name: 'Clear Matcha Uji (Hot)', nameThai: 'เคลียร์ มัทฉะ อูจิ (ร้อน)', price: 70, cost: 29.26, category: 'matcha', modifiers: basicModifiers },
        { id: 'm-clear-uji-i', name: 'Clear Matcha Uji (Iced)', nameThai: 'เคลียร์ มัทฉะ อูจิ (เย็น)', price: 75, cost: 29.26, category: 'matcha', modifiers: basicModifiers },
        { id: 'm-clear-nishio-h', name: 'Clear Matcha Nishio (Hot)', nameThai: 'เคลียร์ มัทฉะ นิชิโอะ (ร้อน)', price: 135, cost: 74.38, category: 'matcha', modifiers: basicModifiers },
        { id: 'm-clear-nishio-i', name: 'Clear Matcha Nishio (Iced)', nameThai: 'เคลียร์ มัทฉะ นิชิโอะ (เย็น)', price: 140, cost: 74.38, category: 'matcha', modifiers: basicModifiers },
        { id: 'm-latte-uji-h', name: 'Matcha Latte Uji (Hot)', nameThai: 'มัทฉะ ลาเต้ อูจิ (ร้อน)', price: 80, cost: 35.07, category: 'matcha', modifiers: stdNonCoffeeModifiers },
        { id: 'm-latte-uji-i', name: 'Matcha Latte Uji (Iced)', nameThai: 'มัทฉะ ลาเต้ อูจิ (เย็น)', price: 85, cost: 35.07, category: 'matcha', modifiers: stdNonCoffeeModifiers },
        { id: 'm-latte-nishio-h', name: 'Matcha Latte Nishio (Hot)', nameThai: 'มัทฉะ ลาเต้ นิชิโอะ (ร้อน)', price: 155, cost: 80.19, category: 'matcha', modifiers: stdNonCoffeeModifiers },
        { id: 'm-latte-nishio-i', name: 'Matcha Latte Nishio (Iced)', nameThai: 'มัทฉะ ลาเต้ นิชิโอะ (เย็น)', price: 160, cost: 80.19, category: 'matcha', modifiers: stdNonCoffeeModifiers },
        { id: 'm-coco-uji', name: 'Coconut Matcha Uji (Iced)', nameThai: 'โคโคนัท มัทฉะ อูจิ (เย็น)', price: 85, cost: 35, category: 'matcha', modifiers: basicModifiers },
        { id: 'm-coco-nishio', name: 'Coconut Matcha Nishio (Iced)', nameThai: 'โคโคนัท มัทฉะ นิชิโอะ (เย็น)', price: 160, cost: 80, category: 'matcha', modifiers: basicModifiers },
        { id: 'm-orange-uji', name: 'Orange Matcha Uji (Iced)', nameThai: 'ออเรนจ์ มัทฉะ อูจิ (เย็น)', price: 85, cost: 35, category: 'matcha', modifiers: basicModifiers },
        { id: 'm-orange-nishio', name: 'Orange Matcha Nishio (Iced)', nameThai: 'ออเรนจ์ มัทฉะ นิชิโอะ (เย็น)', price: 160, cost: 80, category: 'matcha', modifiers: basicModifiers },
        { id: 'm-hojicha', name: 'Hojicha Latte (Iced)', nameThai: 'โฮจิฉะ ลาเต้ (เย็น)', price: 70, cost: 28.10, category: 'matcha', modifiers: stdNonCoffeeModifiers },

        // NON COFFEE
        { id: 'n-thaitea', name: 'Thai Tea (Iced)', nameThai: 'ชาไทย (เย็น)', price: 55, cost: 11.54, category: 'non-coffee', modifiers: stdNonCoffeeModifiers },
        { id: 'n-greentea', name: 'Green Tea (Iced)', nameThai: 'ชาเขียว (เย็น)', price: 55, cost: 14.22, category: 'non-coffee', modifiers: stdNonCoffeeModifiers },
        { id: 'n-cocoa-h', name: 'Cocoa Latte (Hot)', nameThai: 'โกโก้ ลาเต้ (ร้อน)', price: 50, cost: 18.68, category: 'non-coffee', modifiers: stdNonCoffeeModifiers },
        { id: 'n-cocoa-i', name: 'Cocoa Latte (Iced)', nameThai: 'โกโก้ ลาเต้ (เย็น)', price: 55, cost: 18.97, category: 'non-coffee', modifiers: stdNonCoffeeModifiers },
        { id: 'n-milk-h', name: 'Fresh Milk (Hot)', nameThai: 'นมสด (ร้อน)', price: 40, cost: 13.33, category: 'non-coffee', modifiers: stdNonCoffeeModifiers },
        { id: 'n-milk-i', name: 'Fresh Milk (Iced)', nameThai: 'นมสด (เย็น)', price: 45, cost: 13.61, category: 'non-coffee', modifiers: stdNonCoffeeModifiers },
        { id: 'n-lemontea', name: 'Lemon Tea (Iced)', nameThai: 'ชามะนาว (เย็น)', price: 40, cost: 8, category: 'non-coffee', modifiers: basicModifiers },
        { id: 'n-honeylemon', name: 'Honey Lemon (Iced)', nameThai: 'น้ำผึ้งมะนาว (เย็น)', price: 40, cost: 7, category: 'non-coffee', modifiers: basicModifiers },
        { id: 'n-caramel-h', name: 'Caramel Milk (Hot)', nameThai: 'คาราเมล มิลค์ (ร้อน)', price: 40, cost: 15.11, category: 'non-coffee', modifiers: stdNonCoffeeModifiers },
        { id: 'n-caramel-i', name: 'Caramel Milk (Iced)', nameThai: 'คาราเมล มิลค์ (เย็น)', price: 40, cost: 15.11, category: 'non-coffee', modifiers: stdNonCoffeeModifiers },
        { id: 'n-orange', name: 'Orange Juice', nameThai: 'น้ำส้ม', price: 40, cost: 10, category: 'non-coffee', modifiers: [] },
        { id: 'n-coconut', name: 'Coconut Juice', nameThai: 'น้ำมะพร้าว', price: 40, cost: 10, category: 'non-coffee', modifiers: [] },

        // FOOD & BAKERY
        { id: 'f-kaprao-beef', name: 'Beef Basil + Egg', nameThai: 'กะเพราเนื้อ ไข่ดาว', price: 65, cost: 35, category: 'food', modifiers: [] },
        { id: 'f-kaprao-pork', name: 'Pork Basil + Egg', nameThai: 'กะเพราหมู ไข่ดาว', price: 65, cost: 30, category: 'food', modifiers: [] },
        { id: 'b-croissant', name: 'Croissant', nameThai: 'ครัวซองต์', price: 39, cost: 24, category: 'bakery', modifiers: [] },
        { id: 'b-toast', name: 'Toasted bread/Steamed', nameThai: 'ขนมปังปิ้ง/นึ่ง', price: 20, cost: 10, category: 'bakery', modifiers: [] },
    ];

    // --- FUNCTIONS ---
    
    const loadDynamicMenu = () => {
        const q = query(collection(db, "dynamic_menu_items"));
        onSnapshot(q, (snapshot) => {
            dynamicMenuItems = [];
            dynamicMenuList.innerHTML = ''; 
            
            if (snapshot.empty) {
                dynamicMenuList.innerHTML = '<div style="padding:20px; text-align:center; color:#aaa;">ยังไม่มีเมนูพิเศษ</div>';
            }

            snapshot.forEach(doc => {
                const item = doc.data();
                item.docId = doc.id; 
                dynamicMenuItems.push(item);

                const div = document.createElement('div');
                div.className = 'menu-list-item';
                let catBadge = item.category.toUpperCase();
                div.innerHTML = `
                    <div class="menu-item-info">
                        <span class="menu-item-name">${item.name}</span>
                        <span class="menu-item-meta">${item.nameThai ? item.nameThai + ' • ' : ''} ราคา ${item.price}฿ <span style="background:#eee; padding:2px 6px; border-radius:4px; font-size:0.75rem; margin-left:5px;">${catBadge}</span></span>
                    </div>
                    <button class="delete-menu-btn-pro" data-id="${doc.id}"><i class="fas fa-trash-alt"></i> ลบ</button>
                `;
                dynamicMenuList.appendChild(div);
            });

            document.querySelectorAll('.delete-menu-btn-pro').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const btnEl = e.target.closest('button');
                    if(confirm('คุณต้องการลบเมนูนี้ใช่หรือไม่?')) {
                        await deleteDoc(doc(db, "dynamic_menu_items", btnEl.dataset.id));
                    }
                });
            });

            // 🔥 FIX: โหลดเสร็จแล้วค่อยสั่งเรนเดอร์เมนู
            const activeTab = document.querySelector('.menu-tab.active');
            if (activeTab) {
                renderMenuItems(activeTab.dataset.category);
            } else {
                renderMenuItems('coffee');
            }
        });
    };

    const renderMenuItems = (category) => {
        menuItemsContainer.innerHTML = '';
        const allItems = [...staticMenuData, ...dynamicMenuItems];
        const items = allItems.filter(item => item.category === category);

        if (['coffee', 'matcha', 'non-coffee', 'bean'].includes(category)) {
            const hotItems = items.filter(i => i.name.includes('(Hot)') || (i.nameThai && i.nameThai.includes('(ร้อน)')));
            const icedItems = items.filter(i => i.name.includes('(Iced)') || (i.nameThai && i.nameThai.includes('(เย็น)')));
            const otherItems = items.filter(i => !hotItems.includes(i) && !icedItems.includes(i));

            const renderGroup = (title, groupItems, icon, color) => {
                if (groupItems.length === 0) return;
                const header = document.createElement('h3');
                header.innerHTML = `${icon} ${title}`;
                header.style.width = '100%';
                header.style.gridColumn = '1 / -1'; 
                header.style.margin = '15px 0 5px 0';
                header.style.color = color;
                header.style.borderBottom = `2px solid ${color}`;
                header.style.paddingBottom = '5px';
                header.style.fontSize = '1.2rem';
                menuItemsContainer.appendChild(header);
                groupItems.forEach(item => createMenuCard(item, title));
            };

            renderGroup('เมนูร้อน (Hot)', hotItems, '🔥', '#c0392b'); 
            renderGroup('เมนูเย็น (Iced)', icedItems, '❄️', '#2980b9'); 
            renderGroup('อื่นๆ (Other)', otherItems, '✨', '#f39c12'); 
        } else {
            items.forEach(item => createMenuCard(item, 'general'));
        }
    };

    const createMenuCard = (item, type) => {
        const card = document.createElement('div');
        card.className = 'menu-item-card';
        card.dataset.id = item.id;
        let borderColor = '#ddd';
        if (type.includes('ร้อน')) borderColor = '#e74c3c';
        else if (type.includes('เย็น')) borderColor = '#3498db';
        else if (item.category === 'bean') borderColor = '#8e44ad';
        else if (item.category === 'beer') borderColor = '#f1c40f';

        card.style.borderLeft = `5px solid ${borderColor}`;
        const thaiNameHtml = item.nameThai ? `<p class="thai-name">(${item.nameThai})</p>` : '';
        card.innerHTML = `<h4>${item.name}</h4>${thaiNameHtml}<p class="price">${item.price.toFixed(0)}</p>`;
        menuItemsContainer.appendChild(card);
    };
    
    const updateSummary = () => {
        let subTotal = 0;
        for (const itemId in order) {
            subTotal += order[itemId].price * order[itemId].quantity;
        }
        const discountValue = parseFloat(discountInput.value) || 0;
        let discountAmount = discountType.value === 'percent' ? (subTotal * discountValue) / 100 : discountValue;
        const grandTotal = subTotal - discountAmount;
        subTotalSpan.textContent = subTotal.toFixed(2);
        grandTotalSpan.textContent = grandTotal >= 0 ? grandTotal.toFixed(2) : '0.00';
    };

    const renderOrderList = () => {
        orderList.innerHTML = '';
        if (Object.keys(order).length > 0) {
            const now = new Date();
            orderTimestampElement.textContent = `วันที่: ${now.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })} เวลา: ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            orderTimestampElement.textContent = '';
        }
        for (const itemId in order) {
            const item = order[itemId];
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="item-info"><h4>${item.name} (x${item.quantity})</h4></div>
                <div class="item-quantity">
                    <button class="remove-item" data-id="${itemId}"><i class="fas fa-minus-circle"></i></button>
                    <span>${item.quantity}</span>
                    <button class="add-item" data-id="${itemId}"><i class="fas fa-plus-circle"></i></button>
                </div>
                <span class="item-total-price">${(item.price * item.quantity).toFixed(2)}</span>
                <button class="delete-item-btn" data-id="${itemId}"><i class="fas fa-trash-alt"></i></button>
            `;
            orderList.appendChild(li);
        }
        updateSummary();
    };

    const populateModifiersModal = (item) => {
        modifiersItemName.textContent = item.name;
        modifierOptionsContainer.innerHTML = '';
        item.modifiers.forEach((group, groupIndex) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'modifier-group';
            const groupTitle = document.createElement('h3');
            groupTitle.textContent = group.groupName;
            groupDiv.appendChild(groupTitle);
            group.options.forEach((option, optionIndex) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `group-${groupIndex}`;
                radioInput.id = `group-${groupIndex}-option-${optionIndex}`;
                radioInput.value = option.price;
                radioInput.dataset.name = option.name;
                if (optionIndex === 0) radioInput.checked = true;
                const label = document.createElement('label');
                label.htmlFor = `group-${groupIndex}-option-${optionIndex}`;
                label.innerHTML = `<span>${option.name}</span><span class="price-adjust">${option.price > 0 ? '(+' + option.price + ')' : ''}</span>`;
                optionDiv.appendChild(radioInput);
                optionDiv.appendChild(label);
                groupDiv.appendChild(optionDiv);
            });
            modifierOptionsContainer.appendChild(groupDiv);
        });
        modifiersModal.style.display = 'flex';
    };

    const finalizeOrder = async (paymentMethod) => {
        if (Object.keys(order).length === 0) return;
        const newStatus = (paymentMethod === 'Cancelled') ? 'cancelled' : 'pending';
        let newQueueNumber = null; 
        if (newStatus === 'pending') {
            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const q = query(collection(db, "orders"), where("createdAt", ">=", today));
                const querySnapshot = await getDocs(q);
                newQueueNumber = querySnapshot.size + 1;
            } catch (error) { newQueueNumber = 0; }
        }
        const orderData = {
            items: order,
            subTotal: parseFloat(subTotalSpan.textContent),
            grandTotal: parseFloat(grandTotalSpan.textContent),
            discount: parseFloat(discountInput.value) || 0,
            discountType: discountType.value,
            paymentMethod: paymentMethod, 
            createdAt: serverTimestamp(),
            status: newStatus,
            queueNumber: newQueueNumber 
        };
        try {
            await addDoc(collection(db, "orders"), orderData);
            order = {}; discountInput.value = ''; renderOrderList();
        } catch (error) { alert("บันทึกไม่สำเร็จ!"); }
    };

    const saveHeldOrder = async () => {
        const customerName = holdOrderNameInput.value.trim();
        if (!customerName) { alert("กรุณาใส่ชื่อลูกค้า"); return; }
        const orderToHold = {
            items: order,
            subTotal: parseFloat(subTotalSpan.textContent),
            grandTotal: parseFloat(grandTotalSpan.textContent),
            discount: parseFloat(discountInput.value) || 0,
            discountType: discountType.value,
            customerName: customerName,
            heldAt: serverTimestamp(),
            status: 'held'
        };
        try {
            await addDoc(collection(db, "held_orders"), orderToHold);
            alert(`พักบิลเรียบร้อย!`);
            order = {}; discountInput.value = ''; holdOrderNameInput.value = ''; holdOrderModal.style.display = 'none'; renderOrderList();
        } catch (e) { alert("เกิดข้อผิดพลาด"); }
    };

    const fetchHeldOrders = async () => {
        heldOrdersContainer.innerHTML = '<p>กำลังโหลด...</p>';
        heldOrdersListModal.style.display = 'flex';
        try {
            const q = query(collection(db, "held_orders"), orderBy("heldAt", "asc"));
            const querySnapshot = await getDocs(q);
            heldOrdersContainer.innerHTML = '';
            if (querySnapshot.empty) { heldOrdersContainer.innerHTML = '<p style="text-align:center; padding:20px;">ไม่มีบิลที่พักไว้</p>'; return; }
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const card = document.createElement('div');
                card.className = 'menu-item-card'; 
                card.style.display = 'block'; card.style.width = '100%'; card.style.marginBottom = '10px'; card.style.textAlign = 'left';
                let timeStr = data.heldAt ? data.heldAt.toDate().toLocaleTimeString('th-TH', {hour: '2-digit', minute:'2-digit'}) : '';
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div><h3 style="margin:0; color:#d35400;">${data.customerName}</h3><p style="margin:5px 0; color:#7f8c8d;">ยอด: ${data.grandTotal.toFixed(2)} บาท (${timeStr})</p></div>
                        <button class="add-item" style="background:#27ae60; color:white; border:none; padding:8px 15px; border-radius:5px;">ดึงบิล</button>
                    </div>
                `;
                card.querySelector('button').addEventListener('click', async () => {
                    if (Object.keys(order).length > 0 && !confirm("มีรายการค้างอยู่ ต้องการทับหรือไม่?")) return;
                    order = data.items; discountInput.value = data.discount > 0 ? data.discount : ''; discountType.value = data.discountType;
                    renderOrderList(); await deleteDoc(doc.ref); heldOrdersListModal.style.display = 'none';
                });
                heldOrdersContainer.appendChild(card);
            });
        } catch (e) { heldOrdersContainer.innerHTML = '<p>โหลดข้อมูลไม่สำเร็จ</p>'; }
    };

    const generatePromptPayQR = (amount, containerElement) => {
        const promptPayConfig = { id: '0970925445', shopName: 'THE CONNECT' }; 
        const generatePayload = (promptPayId, amount) => {
            const formatField = (id, value) => id + String(value.length).padStart(2, '0') + value;
            let target = promptPayId.replace(/[^0-9]/g, ''); 
            if (target.length === 10 && target.startsWith('0')) target = '0066' + target.substring(1); 
            let promptpayData = `00020101021229370016A000000677010111${formatField('01', target)}5802TH5303764`; 
            if (amount) promptpayData += formatField('54', amount.toFixed(2));
            promptpayData += formatField('59', promptPayConfig.shopName);
            promptpayData += formatField('60', 'Bangkok');
            const crc16 = (data) => {
                let crc = 0xFFFF;
                for (let i = 0; i < data.length; i++) {
                    crc ^= data.charCodeAt(i) << 8;
                    for (let j = 0; j < 8; j++) crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
                }
                return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
            };
            return `${promptpayData}6304${crc16(promptpayData + '6304')}`;
        };
        const payload = generatePayload(promptPayConfig.id, amount);
        containerElement.innerHTML = ''; 
        new QRCode(containerElement, { text: payload, width: 200, height: 200, correctLevel: QRCode.CorrectLevel.L });
    };

    const exportSalesToCSV = async () => {
        const startDateInput = document.getElementById('export-start-date').value;
        const endDateInput = document.getElementById('export-end-date').value;
        if (!startDateInput || !endDateInput) { alert("กรุณาเลือกวัน"); return; }
        if (!confirm(`ยืนยันดาวน์โหลดรายงาน?`)) return;
        try {
            const startDate = new Date(startDateInput); startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(endDateInput); endDate.setHours(23, 59, 59, 999);
            const q = query(collection(db, "orders"), where("createdAt", ">=", startDate), where("createdAt", "<=", endDate), orderBy("createdAt", "asc"));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) { alert("ไม่พบข้อมูล"); return; }
            let csv = "\uFEFFวันที่,เวลา,คิวที่,รายการสินค้า,ยอดขาย (บาท),ต้นทุน (บาท),กำไร (บาท),รับเงินโดย\n";
            querySnapshot.forEach(doc => {
                const o = doc.data(); if(o.paymentMethod === 'Cancelled') return;
                const d = o.createdAt ? o.createdAt.toDate() : new Date();
                let cost = 0; let items = [];
                for(let k in o.items) { items.push(`${o.items[k].name} x${o.items[k].quantity}`); cost += (o.items[k].cost || 0) * o.items[k].quantity; }
                csv += `${d.toLocaleDateString('th-TH')},${d.toLocaleTimeString('th-TH')},${o.queueNumber||'-'},"${items.join(', ')}",${o.grandTotal},${cost.toFixed(2)},${(o.grandTotal-cost).toFixed(2)},${o.paymentMethod}\n`;
            });
            const link = document.createElement("a"); link.href = encodeURI("data:text/csv;charset=utf-8," + csv); link.download = `sales.csv`; document.body.appendChild(link); link.click(); document.body.removeChild(link);
        } catch (e) { alert("Error: " + e.message); }
    };

    const showSalesReport = async () => {
        salesReportDetails.innerHTML = '<h3><i class="fas fa-spinner fa-spin"></i> กำลังโหลด...</h3>';
        salesReportModal.style.display = 'flex';
        try {
            const today = new Date(); today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
            const q = query(collection(db, "orders"), where("createdAt", ">=", today), where("createdAt", "<", tomorrow));
            const querySnapshot = await getDocs(q);
            let allOrders = []; querySnapshot.forEach(doc => allOrders.push(doc.data()));
            allOrders.sort((a, b) => (a.createdAt && b.createdAt) ? a.createdAt.toMillis() - b.createdAt.toMillis() : 0);
            let total = 0, cash = 0, qr = 0, cost = 0, html = '';
            allOrders.forEach(o => {
                if (o.paymentMethod === 'Cancelled') return;
                total += o.grandTotal;
                if (o.paymentMethod === 'Cash') cash += o.grandTotal; else if (o.paymentMethod === 'QR') qr += o.grandTotal;
                let c = 0; for(let k in o.items) c += (o.items[k].cost || 0) * o.items[k].quantity;
                cost += c;
                html += `<div style="border-bottom:1px solid #eee; padding:10px;"><b>คิว ${o.queueNumber}</b>: ${o.grandTotal}บ. (${o.paymentMethod})</div>`;
            });
            salesReportDetails.innerHTML = `<h3>ยอดรวม: ${total.toFixed(2)} บาท</h3><p>เงินสด: ${cash} | QR: ${qr}</p><p>กำไร: ${total - cost}</p><hr><div style="max-height:300px; overflow-y:auto;">${html}</div>`;
        } catch (e) { salesReportDetails.innerHTML = 'Error'; }
    };

    if (exportExcelButton) exportExcelButton.addEventListener('click', exportSalesToCSV);
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMenuItems(tab.getAttribute('data-category'));
        });
    });
    menuItemsContainer.addEventListener('click', (event) => {
        const itemCard = event.target.closest('.menu-item-card');
        if (!itemCard) return;
        let foundItem = staticMenuData.find(item => item.id === itemCard.dataset.id);
        if (!foundItem) foundItem = dynamicMenuItems.find(item => item.id === itemCard.dataset.id);
        selectedItem = foundItem;
        if (!selectedItem) return;
        if (selectedItem.modifiers && selectedItem.modifiers.length > 0) {
            populateModifiersModal(selectedItem);
        } else if (selectedItem.hasSweetness) { 
            sweetnessModal.style.display = 'flex';
            selectedSweetness = ''; sweetnessButtons.forEach(btn => btn.classList.remove('selected'));
        } else {
            const orderId = selectedItem.id;
            if (order[orderId]) order[orderId].quantity++; else order[orderId] = { ...selectedItem, quantity: 1 };
            renderOrderList();
        }
    });
    addToOrderButton.addEventListener('click', () => {
        if (!selectedItem || selectedSweetness === '') { alert('กรุณาเลือกความหวาน'); return; }
        const displayName = `${selectedItem.name} (${document.querySelector('.sweetness-btn.selected')?.textContent})`;
        const id = `${selectedItem.id}-${selectedSweetness}`;
        if (order[id]) order[id].quantity++; else order[id] = { id, name: displayName, price: selectedItem.price, cost: selectedItem.cost, quantity: 1 };
        renderOrderList(); sweetnessModal.style.display = 'none';
    });
    addModifiedItemToOrderBtn.addEventListener('click', () => {
        let finalPrice = selectedItem.price;
        let names = [], ids = [];
        document.querySelectorAll('#modifier-options-container input[type="radio"]:checked').forEach(r => {
            finalPrice += parseFloat(r.value);
            if (!r.dataset.name.includes('ปกติ') && r.dataset.name !== 'ปกติ') names.push(r.dataset.name);
            ids.push(r.dataset.name.replace(/[\s%]+/g, '-'));
        });
        const displayName = names.length > 0 ? `${selectedItem.name} (${names.join(', ')})` : selectedItem.name;
        const id = `${selectedItem.id}-${ids.join('-')}`;
        if (order[id]) order[id].quantity++; else order[id] = { id, name: displayName, price: finalPrice, cost: selectedItem.cost, quantity: 1 };
        renderOrderList(); modifiersModal.style.display = 'none';
    });
    
    orderList.addEventListener('click', (e) => {
        const btn = e.target.closest('button'); if (!btn) return;
        const id = btn.dataset.id;
        if (btn.classList.contains('remove-item')) { if (order[id].quantity > 1) order[id].quantity--; else delete order[id]; }
        else if (btn.classList.contains('add-item')) order[id].quantity++;
        else if (btn.classList.contains('delete-item-btn')) delete order[id];
        renderOrderList();
    });
    sweetnessButtons.forEach(b => b.addEventListener('click', () => { selectedSweetness = b.dataset.level; sweetnessButtons.forEach(btn => btn.classList.remove('selected')); b.classList.add('selected'); }));
    clearOrderBtn.addEventListener('click', () => { if(confirm('ล้างรายการ?')) { order={}; discountInput.value=''; renderOrderList(); } });
    holdOrderBtn.addEventListener('click', () => { if(Object.keys(order).length === 0) return; holdOrderModal.style.display='flex'; holdOrderNameInput.focus(); });
    confirmHoldOrderBtn.addEventListener('click', saveHeldOrder);
    viewHeldOrdersBtn.addEventListener('click', fetchHeldOrders);
    payAndPrintButton.addEventListener('click', () => { if(Object.keys(order).length > 0) { generatePromptPayQR(parseFloat(grandTotalSpan.textContent), document.getElementById('modal-qr-code')); document.getElementById('modal-total-payment').textContent = grandTotalSpan.textContent; document.getElementById('payment-qr-modal').style.display='flex'; } });
    document.getElementById('confirm-payment-btn').addEventListener('click', () => { finalizeOrder('QR'); document.getElementById('payment-qr-modal').style.display='none'; });
    cashPaymentBtn.addEventListener('click', () => { if(Object.keys(order).length > 0) { modalTotalDueSpan.textContent = grandTotalSpan.textContent; cashReceivedInput.value=''; changeDueSpan.textContent='0.00'; cashModal.style.display='flex'; cashReceivedInput.focus(); } });
    cashReceivedInput.addEventListener('input', () => { changeDueSpan.textContent = (parseFloat(cashReceivedInput.value) - parseFloat(modalTotalDueSpan.textContent)).toFixed(2); });
    confirmCashPaymentBtn.addEventListener('click', () => { if(parseFloat(cashReceivedInput.value) >= parseFloat(modalTotalDueSpan.textContent)) { finalizeOrder('Cash'); cashModal.style.display='none'; } else alert('เงินไม่พอ'); });
    closeOrderButton.addEventListener('click', () => { if(Object.keys(order).length > 0 && confirm('ยกเลิก?')) finalizeOrder('Cancelled'); });
    discountInput.addEventListener('input', updateSummary); discountType.addEventListener('change', updateSummary);
    salesReportButton.addEventListener('click', showSalesReport);
    document.querySelectorAll('.close-button').forEach(b => b.addEventListener('click', () => b.closest('.modal').style.display='none'));
    window.onclick = (e) => { if (e.target.classList.contains('modal')) {} }; 

    manageMenuBtn.addEventListener('click', () => manageMenuModal.style.display='flex');
    saveNewItemBtn.addEventListener('click', async () => {
        const name = document.getElementById('new-item-name').value;
        const nameThai = document.getElementById('new-item-thai').value;
        const price = parseFloat(document.getElementById('new-item-price').value);
        const cost = parseFloat(document.getElementById('new-item-cost').value);
        const category = document.getElementById('new-item-category').value;
        if(!name || isNaN(price) || isNaN(cost)) { alert('กรุณากรอกข้อมูล'); return; }
        try {
            await addDoc(collection(db, "dynamic_menu_items"), { id: 'dyn-' + Date.now(), name, nameThai, price, cost, category, modifiers: [] });
            alert('บันทึกสำเร็จ');
            document.getElementById('new-item-name').value = '';
            document.getElementById('new-item-price').value = '';
            document.getElementById('new-item-cost').value = '';
        } catch(e) { console.error(e); alert('Error'); }
    });

    // Start
    loadDynamicMenu(); 
});