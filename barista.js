import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, where, orderBy, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
    const orderQueueContainer = document.getElementById('order-queue-container');
    const connectionStatus = document.getElementById('connection-status');
    const clearAllBtn = document.getElementById('clear-all-btn');

    let activeOrders = [];
    let activeHeldOrders = [];

    const renderAllOrders = () => {
        orderQueueContainer.innerHTML = '';
        const allItems = [...activeOrders, ...activeHeldOrders].sort((a, b) => {
            const timeA = a.data.createdAt ? a.data.createdAt.toMillis() : (a.data.heldAt ? a.data.heldAt.toMillis() : 0);
            const timeB = b.data.createdAt ? b.data.createdAt.toMillis() : (b.data.heldAt ? b.data.heldAt.toMillis() : 0);
            return timeA - timeB;
        });

        if (clearAllBtn) clearAllBtn.style.display = allItems.length > 0 ? 'flex' : 'none';

        if (allItems.length === 0) {
            orderQueueContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: #aaa; margin-top: 50px;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 10px;"></i>
                    <h2>เคลียร์! ไม่มีออเดอร์ค้าง</h2>
                </div>
            `;
            return;
        }

        allItems.forEach(item => {
            const card = createOrderCard(item.data, item.id, item.type);
            orderQueueContainer.appendChild(card);
        });
    };

    const qOrders = query(collection(db, "orders"), where("status", "==", "pending"));
    onSnapshot(qOrders, (snapshot) => {
        connectionStatus.textContent = "ออนไลน์ (พร้อมรับออเดอร์)";
        connectionStatus.className = "status-online";
        activeOrders = [];
        snapshot.forEach(doc => activeOrders.push({ id: doc.id, data: doc.data(), type: 'paid' }));
        renderAllOrders();
    }, (error) => {
        connectionStatus.textContent = "หลุดการเชื่อมต่อ";
        connectionStatus.className = "status-offline";
        console.error(error);
    });

    const qHeld = query(collection(db, "held_orders"), where("status", "==", "held"));
    onSnapshot(qHeld, (snapshot) => {
        activeHeldOrders = [];
        snapshot.forEach(doc => activeHeldOrders.push({ id: doc.id, data: doc.data(), type: 'held' }));
        renderAllOrders();
    });

    // --- 🛠️ ฟังก์ชันจัดรูปแบบเมนู (ฉบับ Smart Parsing) ---
    const formatItemDetails = (fullItemName) => {
        let name = fullItemName;
        let tempBadge = '';
        let sweetBadge = '';
        let optionsHtml = '';

        // 1. ดึงข้อมูลในวงเล็บออกมาวิเคราะห์ (เช่น "Latte (Hot) (หวาน 50%, เพิ่มวิป)")
        // Regex นี้จะจับข้อความที่อยู่ในวงเล็บ (...) ทั้งหมด
        const matches = fullItemName.match(/\(([^)]+)\)/g);
        
        if (matches) {
            matches.forEach(match => {
                // ลบวงเล็บออกจากชื่อหลัก เพื่อให้เหลือแค่ชื่อเพียวๆ
                name = name.replace(match, '').trim();
                
                // เอาเนื้อหาในวงเล็บมาลอกคราบ (ลบวงเล็บออก)
                let content = match.replace(/[()]/g, '');
                
                // แยกด้วยเครื่องหมายจุลภาค (กรณีมีหลาย option ในวงเล็บเดียว)
                let parts = content.split(',').map(s => s.trim());

                parts.forEach(part => {
                    // วิเคราะห์ทีละส่วน
                    if (['Hot', 'ร้อน'].some(k => part.includes(k))) {
                        tempBadge = `<span class="badge badge-hot">🔥 ร้อน</span>`;
                    } else if (['Iced', 'เย็น'].some(k => part.includes(k))) {
                        tempBadge = `<span class="badge badge-iced">❄️ เย็น</span>`;
                    } else if (['Frappe', 'ปั่น'].some(k => part.includes(k))) {
                        tempBadge = `<span class="badge badge-frappe">🌪️ ปั่น</span>`;
                    } 
                    // เช็คความหวาน (รวมถึงคำว่า "ปกติ" ที่อยู่ในบริบทความหวาน)
                    else if (part.includes('หวาน') || part.includes('%') || part.includes('0%') || part === 'ปกติ') {
                        // ถ้าเป็น "ปกติ" ให้ขยายความว่าหวาน 100%
                        let sweetText = part === 'ปกติ' ? 'หวาน 100% (ปกติ)' : part;
                        sweetBadge += `<div class="badge-sweetness"><i class="fas fa-cubes"></i> ${sweetText}</div>`;
                    } 
                    // Option อื่นๆ
                    else {
                        optionsHtml += `<div class="option-row"><i class="fas fa-plus-circle"></i> ${part}</div>`;
                    }
                });
            });
        }

        return { name, tempBadge, sweetBadge, optionsHtml };
    };

    const createOrderCard = (order, orderId, type) => {
        const card = document.createElement('div');
        card.className = `order-card ${type === 'held' ? 'card-held' : 'card-paid'}`;
        
        let timestamp = order.createdAt || order.heldAt;
        const timeStr = timestamp ? timestamp.toDate().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : 'N/A';

        let headerHtml = type === 'paid' 
            ? `<div class="order-card-header header-paid"><h2><span class="queue-badge">คิวที่ ${order.queueNumber || '-'}</span></h2><span class="order-time">${timeStr}</span></div>`
            : `<div class="order-card-header header-held"><h2><span class="table-badge">${order.customerName}</span></h2><span class="order-time" style="color:#d35400">${timeStr} (รอ)</span></div>`;

        let itemsHtml = '<ul class="item-list">';
        for (const itemId in order.items) {
            const item = order.items[itemId];
            
            // เรียกใช้ฟังก์ชันใหม่
            const { name, tempBadge, sweetBadge, optionsHtml } = formatItemDetails(item.name);

            itemsHtml += `
                <li class="order-item">
                    <div class="item-qty-box">
                        <span class="item-qty">${item.quantity}</span>
                    </div>
                    <div class="item-content">
                        <div class="row-main">
                            <span class="item-name">${name}</span>
                            ${tempBadge}
                        </div>
                        ${sweetBadge ? `<div class="row-sweet">${sweetBadge}</div>` : ''}
                        ${optionsHtml ? `<div class="row-options">${optionsHtml}</div>` : ''}
                    </div>
                </li>
            `;
        }
        itemsHtml += '</ul>';

        card.innerHTML = `
            ${headerHtml}
            <div class="order-card-body">${itemsHtml}</div>
            <div class="order-card-footer">
                <button class="complete-btn" onclick="completeOrder('${orderId}', '${type}')">
                    <i class="fas fa-check"></i> ทำเสร็จแล้ว
                </button>
            </div>
        `;

        const btn = card.querySelector('.complete-btn');
        btn.addEventListener('click', () => handleComplete(orderId, type, order));
        return card;
    };

    const handleComplete = async (docId, type, orderData) => {
        const confirmMsg = type === 'paid' ? `ปิดออเดอร์ คิวที่ ${orderData.queueNumber} เรียบร้อย?` : `ปิดออเดอร์โต๊ะ ${orderData.customerName} เรียบร้อย?`;
        if (confirm(confirmMsg)) {
            try {
                const collectionName = type === 'paid' ? "orders" : "held_orders";
                const newStatus = type === 'paid' ? "completed" : "completed_held";
                await updateDoc(doc(db, collectionName, docId), { status: newStatus });
            } catch (error) { console.error(error); alert("เกิดข้อผิดพลาด"); }
        }
    };

    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', async () => {
            const allItems = [...activeOrders, ...activeHeldOrders];
            if (allItems.length === 0) return;
            if (confirm(`⚠️ ลบรายการทั้งหมด ${allItems.length} รายการ?`)) {
                try {
                    const updatePromises = allItems.map(item => {
                        const collectionName = item.type === 'paid' ? "orders" : "held_orders";
                        const newStatus = item.type === 'paid' ? "completed" : "completed_held";
                        return updateDoc(doc(db, collectionName, item.id), { status: newStatus });
                    });
                    await Promise.all(updatePromises);
                } catch (error) { console.error(error); alert("เกิดข้อผิดพลาด"); }
            }
        });
    }
});