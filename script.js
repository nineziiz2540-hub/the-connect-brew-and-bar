document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DATA AND CONFIGURATION ---
    const menuData = [
        // --- กาแฟ (ตัวอย่างเมนูที่มี modifiers) ---
        {
            id: 'latte-ice', name: 'Latte Ice', price: 70, cost: 25, img: 'https://yalamarketplace.com/upload/1675666033436.jpg', category: 'drinks',
            modifiers: [
                { groupName: "ระดับความหวาน", options: [
                    { name: 'หวาน 100% (ปกติ)', price: 0 }, { name: 'หวาน 50%', price: 0 }, { name: 'หวาน 30%', price: 0 }, { name: 'ไม่หวาน 0%', price: 0 }
                ]},
                { groupName: "ประเภทนม", options: [
                    { name: 'นมสด (ปกติ)', price: 0 }, { name: 'นมโอ๊ต', price: 15 }, { name: 'นมอัลมอนด์', price: 15 }
                ]},
                { groupName: "พิเศษ", options: [
                    { name: 'ปกติ', price: 0 }, { name: 'เพิ่ม 1 ช็อต', price: 15 }, { name: 'เพิ่มวิปครีม', price: 10 }
                ]}
            ]
        },
        // --- กาแฟ (ตัวอย่างเมนูที่มีแค่ความหวานแบบเดิม) ---
        { id: 'americano-ice', name: 'Americano Ice', price: 65, cost: 20, img: 'https://as2.ftcdn.net/v2/jpg/06/09/41/09/1000_F_609410904_L1MJUlP4gAmsVzHfAqwh8dB6s3Rguwn5.jpg', hasSweetness: true, category: 'drinks'},
        { id: 'cappuccino-ice', name: 'Cappuccino Ice', price: 70, cost: 25, img: 'https://yalamarketplace.com/upload/1675665497236.jpg', hasSweetness: true, category: 'drinks'},
        { id: 'mocha-ice', name: 'Mocha Ice', price: 75, cost: 30, img: 'https://yalamarketplace.com/upload/1623747365788.jpg', hasSweetness: true, category: 'drinks'},
        { id: 'chochcolat', name: 'Chochcolat', price: 60, cost: 20, img: 'https://image.makewebeasy.net/makeweb/m_1920x0/W7OuxZEpB/DefaultData/%E0%B8%8A%E0%B8%B2%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%A7%E0%B8%B1%E0%B8%95%E0%B8%96%E0%B8%B8%E0%B8%94%E0%B8%B4%E0%B8%9A_36.jpg?v=202405291424', hasSweetness: true, category: 'drinks'},
        // --- กาแฟ (ตัวอย่างเมนูที่ไม่มีตัวเลือกเลย) ---
        { id: 'dirty', name: 'Dirty', price: 80, cost: 35, img: 'https://image.bangkokbiznews.com/uploads/images/md/2024/10/QTxhBq33w2ndhtVTvjbw.webp?x-image-process=style/LG-webp', category: 'drinks'},

        // --- เมนูหมวดหมู่อื่นๆ ---
        { id: 'orange-juice', name: 'น้ำส้มสกัดเย็น', price: 60, cost: 30, img: 'https://img.wongnai.com/p/1920x0/2023/03/31/9a822aee8a9c40c4b23716be4a317b43.jpg', category: 'fruit-drinks' },
        { id: 'lemon-juice', name: 'น้ำมะนาวสกัดเย็น', price: 60, cost: 25, img: 'https://www.top10.in.th/wp-content/uploads/2022/05/7-%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A1%E0%B8%B0%E0%B8%99%E0%B8%B2%E0%B8%A7%E0%B8%82%E0%B8%A7%E0%B8%94-%E0%B8%A2%E0%B8%B5%E0%B9%88%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B9%84%E0%B8%AB%E0%B8%99-%E0%B8%AD%E0%B8%A3%E0%B9%88%E0%B8%AD%E0%B8%A2-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B8%A3%E0%B8%AA.jpg', category: 'fruit-drinks' },
        { id: 'apple-juice', name: 'น้ำแอปเปิ้ลสกัดเย็น', price: 60, cost: 25, img: 'https://th.tnnchemical.com/uploads/202133857/tnn-apple-juice-concentrate58000609698.png', category: 'fruit-drinks' },
        { id: 'kapaokaidao', name: 'กะเพราเนื้อ ไข่ดาว', price: 65, cost: 35, img: 'https://s359.thaicdn.net/pagebuilder/420d19a1-f33b-408d-8bee-f94c0b691fc3.jpg', category: 'food' },
        { id: 'kapaomoohkaidao', name: 'กะเพราหมู ไข่ดาว', price: 65, cost: 30, img: 'https://s359.thaicdn.net/pagebuilder/3132fac8-2481-477d-8f83-54af38ccb434.jpg', category: 'food' },
        { id: 'croissant-chochorat', name: 'ครัวซองต์-ช็อคโกแลต', price: 45, cost: 20, img: 'https://mooyoo.co.th/wp-content/uploads/2022/07/new-product-croffle-5.png', category: 'bakery' },
        { id: 'croissant-starberry', name: 'ครัวซองต์-สตอเบอรี่', price: 45, cost: 20, img: 'https://cdn.pixabay.com/photo/2021/09/27/16/10/croissant-6661477_1280.png', category: 'bakery' },
        { id: 'water', name: 'น้ำเปล่า', price: 15, cost: 5, img: 'https://img.th.my-best.com/product_images/d68638208391099f2dc353bffc6ab717.jpeg?ixlib=rails-4.3.1&q=45&lossless=0&w=160&h=160&fit=clip&s=95a5363c0adb8ee1f760b4c67a7257a8', category: 'other-drinks' },
        { id: 'coke', name: 'โค้ก', price: 25, cost: 10, img: 'https://gda.thai-tba.or.th/wp-content/uploads/2018/07/coke-rgb-422-ml.png', category: 'other-drinks' },
        { id: 'pepsi', name: 'เป๊ปซี่', price: 25, cost: 10, img: 'https://gourmetmarketthailand.com/_next/image?url=https%3A%2F%2Fmedia-stark.gourmetmarketthailand.com%2Fproducts%2Fcover%2F8858998581054-1.webp&w=640&q=75', category: 'other-drinks' },
        { id: 'sprite', name: 'สไปรท์', price: 25, cost: 10, img: 'https://gda.thai-tba.or.th/wp-content/uploads/2018/07/sprite-rgb-1-l-dry.png', category: 'other-drinks' },
        { id: 'sponsor', name: 'สปอนเซอร์', price: 20, cost: 12, img: 'https://www.halal.co.th/storages/products/499894.jpg', category: 'other-drinks' },
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
    // Modals
    const sweetnessModal = document.getElementById('sweetness-modal');
    const sweetnessButtons = document.querySelectorAll('.sweetness-btn');
    const addToOrderButton = document.getElementById('add-to-order-btn');
    const cashModal = document.getElementById('cash-modal');
    const cashPaymentBtn = document.getElementById('cash-payment-btn');
    const modalTotalDueSpan = document.getElementById('modal-total-due');
    const cashReceivedInput = document.getElementById('cash-received-input');
    const changeDueSpan = document.getElementById('change-due');
    const confirmCashPaymentBtn = document.getElementById('confirm-cash-payment-btn');
    // New Function UI
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
    const savedSales = localStorage.getItem('dailySales');
    let dailySales = savedSales ? JSON.parse(savedSales) : [];
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
            card.innerHTML = `<img src="${item.img}" alt="${item.name}"><h4>${item.name}</h4><p>${item.price.toFixed(2)} บาท</p>`;
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
            
            // Logic to separate main name from details in parenthesis
            let mainName = item.name;
            let details = '';
            const detailsMatch = item.name.match(/\(([^)]+)\)/);
            if (detailsMatch) {
                mainName = item.name.replace(detailsMatch[0], '').trim();
                details = detailsMatch[1];
            }

            const displayNameWithQuantity = `${mainName} (x${item.quantity})`;
            const detailsInfo = details ? `<p class="sweetness-detail">- ${details}</p>` : '';

            li.innerHTML = `
                <div class="item-info">
                    <h4>${displayNameWithQuantity}</h4>
                    ${detailsInfo}
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
                    priceAdjustSpan.textContent = `(+${option.price} บาท)`;
                }
                label.appendChild(optionNameSpan);
                label.appendChild(priceAdjustSpan);
                optionDiv.appendChild(radioInput);
                optionDiv.appendChild(label);
                groupDiv.appendChild(optionDiv);
            });
            modifierOptionsContainer.appendChild(groupDiv);
        });
        modifiersModal.style.display = 'block';
    };
    
    const finalizeOrder = () => {
        if (Object.keys(order).length > 0) {
            dailySales.push(JSON.parse(JSON.stringify(order)));
            localStorage.setItem('dailySales', JSON.stringify(dailySales));
        }
        order = {};
        discountInput.value = '';
        renderOrderList();
    };

    const generatePromptPayQR = (amount) => {
        const promptPayConfig = { id: '099XXXXXXX', shopName: 'THE CONNECT' };
        const generatePayload = (promptPayId, amount) => {
            const formatField = (id, value) => id + String(value.length).padStart(2, '0') + value;
            const target = promptPayId.replace(/-/g, '');
            let promptpayData = `00020101021229370016A000000677010111${formatField('01', target.padStart(13, '0'))}5802TH`;
            if (amount) promptpayData += formatField('54', amount.toFixed(2));
            promptpayData += formatField('59', promptPayConfig.shopName);
            const crc16 = (data) => {
                let crc = 0xFFFF;
                for (let i = 0; i < data.length; i++) {
                    crc ^= data.charCodeAt(i) << 8;
                    for (let j = 0; j < 8; j++) crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
                }
                return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
            };
            const checksum = crc16(promptpayData + '6304');
            return `${promptpayData}6304${checksum}`;
        };
        const payload = generatePayload(promptPayConfig.id, amount);
        printQrcodeContainer.innerHTML = '';
        new QRCode(printQrcodeContainer, { text: payload, width: 150, height: 150, correctLevel: QRCode.CorrectLevel.H });
    };

    const showSalesReport = () => {
        let totalSalesAmount = 0, totalCost = 0, salesReport = {};
        dailySales.forEach(order => {
            for (const itemId in order) {
                const item = order[itemId];
                const itemName = item.name.split(' (')[0];
                if (!salesReport[itemName]) salesReport[itemName] = { quantity: 0, total: 0, cost: 0 };
                salesReport[itemName].quantity += item.quantity;
                salesReport[itemName].total += item.price * item.quantity;
                const itemCost = item.cost || 0;
                salesReport[itemName].cost += itemCost * item.quantity;
                totalSalesAmount += item.price * item.quantity;
                totalCost += itemCost * item.quantity;
            }
        });
        const totalProfit = totalSalesAmount - totalCost;
        let reportHTML = `<h3>ยอดขายรวม: ${totalSalesAmount.toFixed(2)} บาท</h3><h3>ยอดต้นทุนรวม: ${totalCost.toFixed(2)} บาท</h3><h3>กำไรสุทธิ: ${totalProfit.toFixed(2)} บาท</h3><h4>รายการขายตามเมนู:</h4><ul>`;
        for (const itemName in salesReport) {
            const profitPerItem = salesReport[itemName].total - salesReport[itemName].cost;
            reportHTML += `<li>${itemName}: ${salesReport[itemName].quantity} ชิ้น (กำไร: ${profitPerItem.toFixed(2)} บาท)</li>`;
        }
        reportHTML += '</ul>';
        salesReportDetails.innerHTML = dailySales.length === 0 ? '<h3>ยังไม่มีรายการขายในวันนี้</h3>' : reportHTML;
        salesReportModal.style.display = 'block';
    };

    // --- 5. EVENT LISTENERS & INITIALIZATION ---
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
        } else if (selectedItem.hasSweetness) {
            sweetnessModal.style.display = 'block';
            selectedSweetness = ''; 
            sweetnessButtons.forEach(btn => btn.classList.remove('selected'));
        } else {
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
            if (!optionName.includes('(ปกติ)')) { // Do not add default options to name
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
        customItemModal.style.display = 'block';
        customItemNameInput.focus();
    });

    addCustomItemBtn.addEventListener('click', () => {
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
        const itemId = target.dataset.id;
        if (target.classList.contains('remove-item')) {
            if (order[itemId] && order[itemId].quantity > 1) order[itemId].quantity--;
            else delete order[itemId];
        } else if (target.classList.contains('add-item')) {
            if (order[itemId]) order[itemId].quantity++;
        } else if (target.classList.contains('delete-item-btn')) {
            delete order[itemId];
        }
        renderOrderList();
    });

    sweetnessButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedSweetness = button.dataset.level;
            sweetnessButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    clearOrderBtn.addEventListener('click', () => {
        if (confirm('คุณต้องการล้างรายการในตะกร้าทั้งหมดใช่หรือไม่?')) {
            order = {};
            discountInput.value = '';
            renderOrderList();
        }
    });

    payAndPrintButton.addEventListener('click', () => {
        const grandTotal = parseFloat(grandTotalSpan.textContent);
        if (grandTotal >= 0 && Object.keys(order).length > 0) {
            generatePromptPayQR(grandTotal);
            setTimeout(() => { window.print(); finalizeOrder(); }, 100);
        } else alert('โปรดเลือกรายการสินค้าก่อนชำระเงิน');
    });

    cashPaymentBtn.addEventListener('click', () => {
        const grandTotal = parseFloat(grandTotalSpan.textContent);
        if (grandTotal >= 0 && Object.keys(order).length > 0) {
            modalTotalDueSpan.textContent = grandTotal.toFixed(2);
            cashReceivedInput.value = '';
            changeDueSpan.textContent = '0.00';
            cashModal.style.display = 'block';
            cashReceivedInput.focus();
        } else alert('โปรดเลือกรายการสินค้าก่อนชำระเงิน');
    });
    
    cashReceivedInput.addEventListener('input', () => {
        const totalDue = parseFloat(modalTotalDueSpan.textContent);
        const cashReceived = parseFloat(cashReceivedInput.value) || 0;
        const change = cashReceived - totalDue;
        changeDueSpan.textContent = change >= 0 ? change.toFixed(2) : '0.00';
    });

    confirmCashPaymentBtn.addEventListener('click', () => {
        const totalDue = parseFloat(modalTotalDueSpan.textContent);
        const cashReceived = parseFloat(cashReceivedInput.value) || 0;
        if (cashReceived >= totalDue) {
            finalizeOrder();
            cashModal.style.display = 'none';
            alert('ชำระเงินเรียบร้อย!');
        } else alert('จำนวนเงินที่รับมาไม่เพียงพอ');
    });

    closeOrderButton.addEventListener('click', () => {
        if (Object.keys(order).length > 0) {
            finalizeOrder();
            alert('ออเดอร์ถูกปิดและบันทึกเรียบร้อยแล้ว');
        } else alert('ไม่มีรายการในออเดอร์');
    });

    discountInput.addEventListener('input', updateSummary);
    discountType.addEventListener('change', updateSummary);
    salesReportButton.addEventListener('click', showSalesReport);

    deleteLastSaleButton.addEventListener('click', () => {
        if (confirm('คุณต้องการลบรายการขายล่าสุดใช่หรือไม่?')) {
            dailySales.pop();
            localStorage.setItem('dailySales', JSON.stringify(dailySales));
            showSalesReport();
        }
    });

    resetSalesButton.addEventListener('click', () => {
        if (confirm('คุณต้องการรีเซ็ทยอดขายทั้งหมดใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้!')) {
            dailySales = [];
            localStorage.setItem('dailySales', JSON.stringify(dailySales));
            showSalesReport();
        }
    });

    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => button.closest('.modal').style.display = 'none');
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) event.target.style.display = 'none';
    });

    // Initial Render
    renderMenuItems('drinks');
});