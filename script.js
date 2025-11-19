document.addEventListener('DOMContentLoaded', () => {
    // --- LOGIN SYSTEM ---
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

    // --- 1. DATA AND CONFIGURATION ---
    const stdCoffeeModifiers = [
        { groupName: "ระดับความหวาน", options: [
            { name: 'หวาน 100% (ปกติ)', price: 0 }, 
            { name: 'หวาน 50%', price: 0 }, 
            { name: 'ไม่หวาน 0%', price: 0 }
        ]},
        { groupName: "ประเภทนม", options: [
            { name: 'นมสด (ปกติ)', price: 0 }, { name: 'นมโอ๊ต', price: 10 }, { name: 'นมอัลมอนด์', price: 20 }
        ]},
        { groupName: "เพิ่มเติม", options: [
            { name: 'ปกติ', price: 0 }, { name: 'เพิ่ม 1 ช็อต', price: 20 }, { name: 'เพิ่มวิปครีม', price: 20 }
        ]}
    ];

    const simpleModifiers = [ 
        { groupName: "ระดับความหวาน", options: [
            { name: 'หวาน 100% (ปกติ)', price: 0 }, 
            { name: 'หวาน 50%', price: 0 }, 
            { name: 'ไม่หวาน 0%', price: 0 }
        ]}
    ];

    const menuData = [
        // --- COFFEE ---
        { id: 'c-espresso-h', name: 'Espresso (Hot)', nameThai: 'เอสเพรสโซ่ (ร้อน)', price: 55, cost: 22.53, category: 'coffee', modifiers: [] }, 
        { id: 'c-americano-h', name: 'Americano (Hot)', nameThai: 'อเมริกาโน่ (ร้อน)', price: 60, cost: 23.13, category: 'coffee', modifiers: simpleModifiers },
        { id: 'c-americano-i', name: 'Americano (Iced)', nameThai: 'อเมริกาโน่ (เย็น)', price: 60, cost: 23.61, category: 'coffee', modifiers: simpleModifiers },
        { id: 'c-latte-h', name: 'Latte (Hot)', nameThai: 'ลาเต้ (ร้อน)', price: 60, cost: 26, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-latte-i', name: 'Latte (Iced)', nameThai: 'ลาเต้ (เย็น)', price: 70, cost: 24.74, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-cappu-h', name: 'Cappuccino (Hot)', nameThai: 'คาปูชิโน่ (ร้อน)', price: 60, cost: 26, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-cappu-i', name: 'Cappuccino (Iced)', nameThai: 'คาปูชิโน่ (เย็น)', price: 70, cost: 24.74, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-esyen', name: 'Es Yen Thai Style (Iced)', nameThai: 'เอสเย็น (เย็น)', price: 70, cost: 26.38, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-mocca-h', name: 'Mocca (Hot)', nameThai: 'มอคค่า (ร้อน)', price: 60, cost: 27, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-mocca-i', name: 'Mocca (Iced)', nameThai: 'มอคค่า (เย็น)', price: 70, cost: 26.63, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-caramel-mac', name: 'Caramel Macchiato (Iced)', nameThai: 'คาราเมล มัคคิอาโต้ (เย็น)', price: 70, cost: 25.49, category: 'coffee', modifiers: stdCoffeeModifiers },
        { id: 'c-orange-cof', name: 'Orange Coffee (Iced)', nameThai: 'ออเรนจ์ คอฟฟี่ (เย็น)', price: 70, cost: 28.31, category: 'coffee', modifiers: simpleModifiers },
        { id: 'c-coconut-cof', name: 'Coconut Coffee (Iced)', nameThai: 'โคโคนัท คอฟฟี่ (เย็น)', price: 70, cost: 28.31, category: 'coffee', modifiers: simpleModifiers },
        { id: 'c-affogato', name: 'Affogato Coffee', nameThai: 'อัฟโฟกาโต้ คอฟฟี่', price: 85, cost: 34.5, category: 'coffee', modifiers: [] },

        // --- MATCHA ---
        { id: 'm-clear-uji-h', name: 'Clear Matcha Uji (Hot)', nameThai: 'เคลียร์ มัทฉะ อูจิ (ร้อน)', price: 70, cost: 29.26, category: 'matcha', modifiers: simpleModifiers },
        { id: 'm-clear-uji-i', name: 'Clear Matcha Uji (Iced)', nameThai: 'เคลียร์ มัทฉะ อูจิ (เย็น)', price: 75, cost: 29.26, category: 'matcha', modifiers: simpleModifiers },
        { id: 'm-clear-nishio-h', name: 'Clear Matcha Nishio (Hot)', nameThai: 'เคลียร์ มัทฉะ นิชิโอะ (ร้อน)', price: 135, cost: 74.38, category: 'matcha', modifiers: simpleModifiers },
        { id: 'm-clear-nishio-i', name: 'Clear Matcha Nishio (Iced)', nameThai: 'เคลียร์ มัทฉะ นิชิโอะ (เย็น)', price: 140, cost: 74.38, category: 'matcha', modifiers: simpleModifiers },
        { id: 'm-latte-uji-h', name: 'Matcha Latte Uji (Hot)', nameThai: 'มัทฉะ ลาเต้ อูจิ (ร้อน)', price: 80, cost: 35.07, category: 'matcha', modifiers: stdCoffeeModifiers },
        { id: 'm-latte-uji-i', name: 'Matcha Latte Uji (Iced)', nameThai: 'มัทฉะ ลาเต้ อูจิ (เย็น)', price: 85, cost: 35.07, category: 'matcha', modifiers: stdCoffeeModifiers },
        { id: 'm-latte-nishio-h', name: 'Matcha Latte Nishio (Hot)', nameThai: 'มัทฉะ ลาเต้ นิชิโอะ (ร้อน)', price: 155, cost: 80.19, category: 'matcha', modifiers: stdCoffeeModifiers },
        { id: 'm-latte-nishio-i', name: 'Matcha Latte Nishio (Iced)', nameThai: 'มัทฉะ ลาเต้ นิชิโอะ (เย็น)', price: 160, cost: 80.19, category: 'matcha', modifiers: stdCoffeeModifiers },
        { id: 'm-coco-uji', name: 'Coconut Matcha Uji (Iced)', nameThai: 'โคโคนัท มัทฉะ อูจิ (เย็น)', price: 85, cost: 35, category: 'matcha', modifiers: simpleModifiers },
        { id: 'm-coco-nishio', name: 'Coconut Matcha Nishio (Iced)', nameThai: 'โคโคนัท มัทฉะ นิชิโอะ (เย็น)', price: 160, cost: 80, category: 'matcha', modifiers: simpleModifiers },
        { id: 'm-orange-uji', name: 'Orange Matcha Uji (Iced)', nameThai: 'ออเรนจ์ มัทฉะ อูจิ (เย็น)', price: 85, cost: 35, category: 'matcha', modifiers: simpleModifiers },
        { id: 'm-orange-nishio', name: 'Orange Matcha Nishio (Iced)', nameThai: 'ออเรนจ์ มัทฉะ นิชิโอะ (เย็น)', price: 160, cost: 80, category: 'matcha', modifiers: simpleModifiers },
        { id: 'm-hojicha', name: 'Hojicha Latte (Iced)', nameThai: 'โฮจิฉะ ลาเต้ (เย็น)', price: 70, cost: 28.10, category: 'matcha', modifiers: stdCoffeeModifiers },

        // --- NON COFFEE ---
        { id: 'n-thaitea', name: 'Thai Tea (Iced)', nameThai: 'ชาไทย (เย็น)', price: 55, cost: 11.54, category: 'non-coffee', modifiers: stdCoffeeModifiers },
        { id: 'n-greentea', name: 'Green Tea (Iced)', nameThai: 'ชาเขียว (เย็น)', price: 55, cost: 14.22, category: 'non-coffee', modifiers: stdCoffeeModifiers },
        { id: 'n-cocoa-h', name: 'Cocoa Latte (Hot)', nameThai: 'โกโก้ ลาเต้ (ร้อน)', price: 50, cost: 18.68, category: 'non-coffee', modifiers: stdCoffeeModifiers },
        { id: 'n-cocoa-i', name: 'Cocoa Latte (Iced)', nameThai: 'โกโก้ ลาเต้ (เย็น)', price: 55, cost: 18.97, category: 'non-coffee', modifiers: stdCoffeeModifiers },
        { id: 'n-milk-h', name: 'Fresh Milk (Hot)', nameThai: 'นมสด (ร้อน)', price: 40, cost: 13.33, category: 'non-coffee', modifiers: stdCoffeeModifiers },
        { id: 'n-milk-i', name: 'Fresh Milk (Iced)', nameThai: 'นมสด (เย็น)', price: 45, cost: 13.61, category: 'non-coffee', modifiers: stdCoffeeModifiers },
        { id: 'n-lemontea', name: 'Lemon Tea (Iced)', nameThai: 'ชามะนาว (เย็น)', price: 40, cost: 8, category: 'non-coffee', modifiers: simpleModifiers },
        { id: 'n-honeylemon', name: 'Honey Lemon (Iced)', nameThai: 'น้ำผึ้งมะนาว (เย็น)', price: 40, cost: 7, category: 'non-coffee', modifiers: simpleModifiers },
        { id: 'n-caramel-h', name: 'Caramel Milk (Hot)', nameThai: 'คาราเมล มิลค์ (ร้อน)', price: 40, cost: 15.11, category: 'non-coffee', modifiers: stdCoffeeModifiers },
        { id: 'n-caramel-i', name: 'Caramel Milk (Iced)', nameThai: 'คาราเมล มิลค์ (เย็น)', price: 40, cost: 15.11, category: 'non-coffee', modifiers: stdCoffeeModifiers },
        { id: 'n-orange', name: 'Orange Juice', nameThai: 'น้ำส้ม', price: 40, cost: 10, category: 'non-coffee', modifiers: [] },
        { id: 'n-coconut', name: 'Coconut Juice', nameThai: 'น้ำมะพร้าว', price: 40, cost: 10, category: 'non-coffee', modifiers: [] },

        // --- FOOD ---
        { id: 'f-kaprao-beef', name: 'Beef Basil + Egg', nameThai: 'กะเพราเนื้อ ไข่ดาว', price: 65, cost: 35, category: 'food', modifiers: [] },
        { id: 'f-kaprao-pork', name: 'Pork Basil + Egg', nameThai: 'กะเพราหมู ไข่ดาว', price: 65, cost: 30, category: 'food', modifiers: [] },

        // --- BAKERY (แก้ไขแล้ว) ---
        { id: 'b-croissant', name: 'Croissant', nameThai: 'ครัวซองต์', price: 39, cost: 24, category: 'bakery', modifiers: [] },
        { id: 'b-toast', name: 'Toasted bread/Steamed', nameThai: 'ขนมปังปิ้ง/นึ่ง', price: 20, cost: 10, category: 'bakery', modifiers: [] },
    ];

    // --- 2. UI ELEMENTS ---
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
    const printQrcodeContainer = document.getElementById('print-qrcode-container');
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
    const customItemBtn = document.getElementById('custom-item-btn');
    const modifiersModal = document.getElementById('modifiers-modal');
    const modifiersItemName = document.getElementById('modifiers-item-name');
    const modifierOptionsContainer = document.getElementById('modifier-options-container');
    const addModifiedItemToOrderBtn = document.getElementById('add-modified-item-to-order-btn');
    const customItemModal = document.getElementById('custom-item-modal');
    const customItemNameInput = document.getElementById('custom-item-name-input');
    const customItemPriceInput = document.getElementById('custom-item-price-input');
    const addCustomItemBtn = document.getElementById('add-custom-item-btn');

    // --- 3. APP STATE ---
    let order = {};
    let selectedItem = null;
    let selectedSweetness = '';

    // --- 4. FUNCTIONS ---
    const renderMenuItems = (category) => {
        menuItemsContainer.innerHTML = '';
        menuData.filter(item => item.category === category).forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-item-card';
            card.dataset.id = item.id;
            card.innerHTML = `
                <h4>${item.name}</h4>
                <p class="thai-name">(${item.nameThai})</p>
                <p class="price">${item.price.toFixed(0)}</p>
            `;
            menuItemsContainer.appendChild(card);
        });
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
            
            let mainName = item.name;
            let details = '';
            const detailsMatch = item.name.match(/\(([^)]+)\)/);
            if (detailsMatch) {
                mainName = item.name.replace(detailsMatch[0], '').trim();
                details = detailsMatch[1];
            }

            const displayNameWithQuantity = `${item.name} (x${item.quantity})`;
            
            li.innerHTML = `
                <div class="item-info">
                    <h4>${displayNameWithQuantity}</h4>
                </div>
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
                const optionNameSpan = document.createElement('span');
                optionNameSpan.textContent = option.name;
                const priceAdjustSpan = document.createElement('span');
                priceAdjustSpan.className = 'price-adjust';
                if (option.price > 0) {
                    priceAdjustSpan.textContent = `(+${option.price})`;
                }
                label.appendChild(optionNameSpan);
                label.appendChild(priceAdjustSpan);
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
                const querySnapshot = await db.collection("orders")
                    .where("createdAt", ">=", today)
                    .get();
                newQueueNumber = querySnapshot.size + 1;
            } catch (error) {
                console.error("Error getting queue number: ", error);
                alert("เกิดข้อผิดพลาดในการดึงเลขคิว!");
                return;
            }
        }
        const orderData = {
            items: order,
            subTotal: parseFloat(subTotalSpan.textContent),
            grandTotal: parseFloat(grandTotalSpan.textContent),
            discount: parseFloat(discountInput.value) || 0,
            discountType: discountType.value,
            paymentMethod: paymentMethod, 
            createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
            status: newStatus,
            queueNumber: newQueueNumber 
        };
        try {
            const docRef = await db.collection("orders").add(orderData);
            if (newStatus === 'pending') {
                console.log(`Order written to Firestore with ID: ${docRef.id} and Queue: ${newQueueNumber}`);
            } else {
                console.log("Order was cancelled. Saved to history.", docRef.id);
            }
            order = {};
            discountInput.value = '';
            renderOrderList();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("เกิดข้อผิดพลาดในการบันทึกออเดอร์! กรุณาลองอีกครั้ง");
        }
    };

    const generatePromptPayQR = (amount, containerElement) => {
        // ใส่เบอร์ PromptPay ของคุณตรงนี้ (ไม่ต้องมีขีด)
        const promptPayConfig = { 
            id: '06361055597',       // เบอร์ PromptPay ของคุณ
            shopName: 'THE CONNECT'  // ชื่อร้าน (ภาษาอังกฤษ)
        }; 
        
        const generatePayload = (promptPayId, amount) => {
            const formatField = (id, value) => id + String(value.length).padStart(2, '0') + value;
            
            // 1. จัดการเบอร์โทรศัพท์ให้เป็นรูปแบบ 0066...
            let target = promptPayId.replace(/[^0-9]/g, ''); // ลบขีดออก
            if (target.length === 10 && target.startsWith('0')) {
                 target = '0066' + target.substring(1); // เปลี่ยน 08x... เป็น 00668x...
            }
            
            // 2. สร้าง Payload ตามมาตรฐาน EMVCo (PromptPay)
            // 000201 = Payload Format Indicator
            // 010212 = Point of Initiation Method (Dynamic QR)
            // 2937... = Merchant Account Information (PromptPay)
            let promptpayData = `00020101021229370016A000000677010111${formatField('01', target)}5802TH`;
            
            // 3. ใส่จำนวนเงิน (ถ้ามี)
            if (amount) {
                promptpayData += formatField('54', amount.toFixed(2));
            }
            
            // 4. ใส่สกุลเงิน (5303764 = THB) และชื่อร้าน
            promptpayData += `5303764`; 
            // (หมายเหตุ: ชื่อร้านมักจะใส่ที่ ID 59 แต่บางแอปอาจไม่แสดง)
            // promptpayData += formatField('59', promptPayConfig.shopName); 
            
            // 5. คำนวณ CRC (Checksum)
            const crc16 = (data) => {
                let crc = 0xFFFF;
                for (let i = 0; i < data.length; i++) {
                    crc ^= data.charCodeAt(i) << 8;
                    for (let j = 0; j < 8; j++) crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
                }
                return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
            };
            
            // เพิ่ม ID 63 (CRC) และความยาว 04 ไว้ท้ายสุดก่อนคำนวณ
            const checksum = crc16(promptpayData + '6304');
            return `${promptpayData}6304${checksum}`;
        };

        const payload = generatePayload(promptPayConfig.id, amount);
        containerElement.innerHTML = ''; 
        new QRCode(containerElement, {
            text: payload,
            width: 200,
            height: 200,
            correctLevel: QRCode.CorrectLevel.L // เปลี่ยนเป็น L เพื่อให้อ่านง่ายขึ้นสำหรับ QR ข้อมูลเยอะ
        });
    };

    const showSalesReport = async () => {
        salesReportDetails.innerHTML = '<h3><i class="fas fa-spinner fa-spin"></i> กำลังโหลดรายงาน...</h3>';
        salesReportModal.style.display = 'flex';
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const querySnapshot = await db.collection("orders")
                .where("createdAt", ">=", today)
                .where("createdAt", "<", tomorrow)
                .get();
            let allOrders = [];
            querySnapshot.forEach(doc => {
                allOrders.push(doc.data());
            });
            allOrders.sort((a, b) => {
                if (a.createdAt && b.createdAt) {
                    return a.createdAt.toMillis() - b.createdAt.toMillis();
                }
                return 0; 
            });
            let totalSalesAmount = 0;
            let totalCashSales = 0;
            let totalQRSales = 0;
            let totalCost = 0;
            let ordersHtml = ''; 
            allOrders.forEach(orderData => {
                if (orderData.paymentMethod === 'Cancelled') return; 
                totalSalesAmount += orderData.grandTotal;
                if (orderData.paymentMethod === 'Cash') {
                    totalCashSales += orderData.grandTotal;
                } else if (orderData.paymentMethod === 'QR') {
                    totalQRSales += orderData.grandTotal;
                }
                const time = orderData.createdAt.toDate().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
                const paymentText = orderData.paymentMethod === 'Cash' ? '(เงินสด)' : '(QR Code)';
                const queueNum = orderData.queueNumber || 'N/A'; 
                ordersHtml += `<details class="report-order-item">`;
                ordersHtml += `
                    <summary>
                        <strong>คิวที่ ${queueNum} ${paymentText}</strong>
                        <span>(${time})</span>
                        <strong>${orderData.grandTotal.toFixed(2)} บาท</strong>
                    </summary>
                `;
                let itemsHtml = '<div class="order-item-details">';
                let orderCost = 0;
                for (const itemId in orderData.items) {
                    const item = orderData.items[itemId];
                    const itemCost = item.cost || 0;
                    const profit = (item.price * item.quantity) - (itemCost * item.quantity);
                    orderCost += (itemCost * item.quantity);
                    itemsHtml += `<p>• ${item.name} (x${item.quantity}) (กำไร: ${profit.toFixed(2)} บาท)</p>`;
                }
                itemsHtml += '</div>';
                ordersHtml += itemsHtml + '</details>';
                totalCost += orderCost; 
            });
            const totalProfit = totalSalesAmount - totalCost;
            let reportHTML = `<h3>ยอดขายรวม: ${totalSalesAmount.toFixed(2)} บาท</h3>`;
            reportHTML += `<h4 class="sales-subtotal"> - ยอดเงินสด: ${totalCashSales.toFixed(2)} บาท</h4>`;
            reportHTML += `<h4 class="sales-subtotal"> - ยอด QR Code: ${totalQRSales.toFixed(2)} บาท</h4>`;
            reportHTML += `<h3>ยอดต้นทุนรวม: ${totalCost.toFixed(2)} บาท</h3>`;
            reportHTML += `<h3>กำไรสุทธิ: ${totalProfit.toFixed(2)} บาท</h3>`;
            reportHTML += '<hr><h4>รายการออเดอร์ตามคิว:</h4>';
            reportHTML += `<div class="order-list-container">${ordersHtml}</div>`; 
            salesReportDetails.innerHTML = allOrders.length === 0 ? '<h3>ยังไม่มีรายการขายในวันนี้</h3>' : reportHTML;
        } catch (error) {
            console.error("Error getting sales report: ", error);
            salesReportDetails.innerHTML = '<h3>เกิดข้อผิดพลาดในการโหลดรายงาน</h3>';
        }
    };

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
        const itemId = itemCard.dataset.id;
        selectedItem = menuData.find(item => item.id === itemId);
        if (!selectedItem) return;

        if (selectedItem.modifiers && selectedItem.modifiers.length > 0) {
            populateModifiersModal(selectedItem);
        } 
        else if (selectedItem.hasSweetness) {
            sweetnessModal.style.display = 'flex';
            selectedSweetness = ''; 
            sweetnessButtons.forEach(btn => btn.classList.remove('selected'));
        } 
        else {
            const orderId = selectedItem.id;
            if (order[orderId]) {
                order[orderId].quantity++;
            } else {
                order[orderId] = { ...selectedItem, quantity: 1 };
            }
            renderOrderList();
        }
    });
    
    addToOrderButton.addEventListener('click', () => {
        if (!selectedItem || selectedSweetness === '') {
            alert('กรุณาเลือกระดับความหวาน');
            return;
        }
        const sweetnessText = document.querySelector('.sweetness-btn.selected')?.textContent || '';
        const displayName = `${selectedItem.name} (${sweetnessText})`;
        const itemIdWithSweetness = `${selectedItem.id}-${selectedSweetness}`;
        if (order[itemIdWithSweetness]) {
            order[itemIdWithSweetness].quantity++;
        } else {
            order[itemIdWithSweetness] = {
                id: itemIdWithSweetness,
                name: displayName,
                price: selectedItem.price,
                cost: selectedItem.cost,
                quantity: 1
            };
        }
        renderOrderList();
        sweetnessModal.style.display = 'none';
    });

    addModifiedItemToOrderBtn.addEventListener('click', () => {
        let finalPrice = selectedItem.price;
        const selectedOptionsNames = [];
        const selectedOptionsIds = [];
        const checkedRadios = modifierOptionsContainer.querySelectorAll('input[type="radio"]:checked');
        
        checkedRadios.forEach(radio => {
            const optionPrice = parseFloat(radio.value);
            const optionName = radio.dataset.name;
            finalPrice += optionPrice;
            if (!optionName.includes('(ปกติ)')) { 
                selectedOptionsNames.push(optionName);
            }
            selectedOptionsIds.push(optionName.replace(/[\s%]+/g, '-'));
        });

        const finalDetails = selectedOptionsNames.join(', ');
        const displayName = finalDetails ? `${selectedItem.name} (${finalDetails})` : selectedItem.name;
        const finalId = `${selectedItem.id}-${selectedOptionsIds.join('-')}`;

        if (order[finalId]) {
            order[finalId].quantity++;
        } else {
            order[finalId] = {
                id: finalId,
                name: displayName,
                price: finalPrice,
                cost: selectedItem.cost,
                quantity: 1
            };
        }
        renderOrderList();
        modifiersModal.style.display = 'none';
    });

    customItemBtn.addEventListener('click', () => {
        customItemNameInput.value = '';
        customItemPriceInput.value = '';
        customItemModal.style.display = 'flex';
        customItemNameInput.focus();
    });
    
    customItemModal.addEventListener('click', (event) => {
        if (event.target !== customItemNameInput && event.target !== customItemPriceInput) {
            customItemNameInput.blur();
            customItemPriceInput.blur();
        }
    });

    addCustomItemBtn.addEventListener('click', () => {
        customItemNameInput.blur();
        customItemPriceInput.blur();

        const name = customItemNameInput.value.trim();
        const price = parseFloat(customItemPriceInput.value);
        if (!name || isNaN(price) || price < 0) {
            alert('กรุณาใส่ชื่อและราคาให้ถูกต้อง');
            return;
        }
        const customId = `custom-${Date.now()}`;
        order[customId] = {
            id: customId,
            name: name,
            price: price,
            cost: 0,
            quantity: 1
        };
        renderOrderList();
        customItemModal.style.display = 'none';
    });
    
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
        } else if (target.classList.contains('delete-item-btn')) {
            delete order[itemId];
        }
        renderOrderList();
    });

    sweetnessButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedSweetness = button.getAttribute('data-level');
            sweetnessButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    clearOrderBtn.addEventListener('click', () => {
        if (confirm('คุณต้องการล้างรายการในตะกร้าทั้งหมดใช่หรือไม่? (จะไม่ถูกบันทึก)')) {
            order = {};
            discountInput.value = '';
            renderOrderList();
        }
    });

    payAndPrintButton.addEventListener('click', () => {
        const grandTotal = parseFloat(grandTotalSpan.textContent);
        if (grandTotal >= 0 && Object.keys(order).length > 0) {
            const qrContainer = document.getElementById('modal-qr-code');
            generatePromptPayQR(grandTotal, qrContainer);
            const summaryContainer = document.getElementById('modal-order-summary');
            summaryContainer.innerHTML = '';
            for (const itemId in order) {
                summaryContainer.innerHTML += `<p>${order[itemId].name} (x${order[itemId].quantity})</p>`;
            }
            document.getElementById('modal-total-payment').textContent = `ยอดชำระ: ${grandTotal.toFixed(2)} บาท`;
            document.getElementById('payment-qr-modal').style.display = 'flex';
        } else {
            alert('โปรดเลือกรายการสินค้าก่อนชำระเงิน');
        }
    });

    document.getElementById('confirm-payment-btn').addEventListener('click', () => {
        finalizeOrder('QR'); 
        document.getElementById('payment-qr-modal').style.display = 'none';
        alert('บันทึกออเดอร์ (QR) เรียบร้อย!');
    });

    cashPaymentBtn.addEventListener('click', () => {
        const grandTotal = parseFloat(grandTotalSpan.textContent);
        if (grandTotal >= 0 && Object.keys(order).length > 0) {
            modalTotalDueSpan.textContent = grandTotal.toFixed(2);
            cashReceivedInput.value = '';
            changeDueSpan.textContent = '0.00';
            cashModal.style.display = 'flex';
            cashReceivedInput.focus();
        } else {
            alert('โปรดเลือกรายการสินค้าก่อนชำระเงิน');
        }
    });
    
    cashReceivedInput.addEventListener('input', () => {
        const totalDue = parseFloat(modalTotalDueSpan.textContent);
        const cashReceived = parseFloat(cashReceivedInput.value) || 0;
        const change = cashReceived - totalDue;
        changeDueSpan.textContent = change >= 0 ? change.toFixed(2) : '0.00';
    });

    // แตะที่ว่างใน Modal เพื่อเก็บแป้นพิมพ์ (ช่องเงินสด)
    cashModal.addEventListener('click', (event) => {
        if (event.target !== cashReceivedInput) {
            cashReceivedInput.blur();
        }
    });

    confirmCashPaymentBtn.addEventListener('click', () => {
        cashReceivedInput.blur(); // เก็บแป้นพิมพ์ก่อน
        
        const totalDue = parseFloat(modalTotalDueSpan.textContent);
        const cashReceived = parseFloat(cashReceivedInput.value) || 0;
        if (cashReceived >= totalDue) {
            finalizeOrder('Cash'); 
            cashModal.style.display = 'none';
            alert('บันทึกออเดอร์ (เงินสด) เรียบร้อย!');
        } else {
            alert('จำนวนเงินที่รับมาไม่เพียงพอ');
        }
    });

    closeOrderButton.addEventListener('click', () => {
        if (Object.keys(order).length > 0) {
            if (confirm('คุณต้องการ "ยกเลิก" ออเดอร์นี้ใช่หรือไม่? (จะไม่ถูกส่งไปครัว)')) {
                finalizeOrder('Cancelled'); 
                alert('ออเดอร์ถูกยกเลิกเรียบร้อย (ไม่ส่งไปครัว)');
            }
        } else {
            alert('ไม่มีรายการในออเดอร์');
        }
    });

    discountInput.addEventListener('input', updateSummary);
    discountType.addEventListener('change', updateSummary);
    salesReportButton.addEventListener('click', showSalesReport);
    
    deleteLastSaleButton.addEventListener('click', () => {
        alert('ฟังก์ชันนี้ถูกปิดใช้งานชั่วคราวในเวอร์ชันฐานข้อมูลออนไลน์ครับ');
    });
    resetSalesButton.addEventListener('click', () => {
        alert('ฟังก์ชันนี้ถูกปิดใช้งานชั่วคราวในเวอร์ชันฐานข้อมูลออนไลน์ครับ');
    });

    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            // event.target.style.display = 'none';
        }
    });

    // เพิ่มโค้ดเก็บแป้นพิมพ์ช่องส่วนลด (รองรับ iPad ดีขึ้น)
    const dismissDiscountKeyboard = (event) => {
        if (document.activeElement === discountInput && event.target !== discountInput) {
            discountInput.blur(); 
        }
    };

    // ใช้ทั้ง click และ touchstart
    window.addEventListener('click', dismissDiscountKeyboard);
    window.addEventListener('touchstart', dismissDiscountKeyboard);

    // Initial Render
    renderMenuItems('coffee');
});