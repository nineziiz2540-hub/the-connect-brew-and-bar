document.addEventListener('DOMContentLoaded', () => {
    const orderQueueContainer = document.getElementById('order-queue-container');
    const connectionStatus = document.getElementById('connection-status');

    // (ส่วน Connection Status เหมือนเดิม)
    db.collection("orders").onSnapshot((snapshot) => {
        connectionStatus.textContent = "เชื่อมต่อแล้ว";
        connectionStatus.className = "status-online";
    }, (error) => {
        connectionStatus.textContent = "การเชื่อมต่อล้มเหลว";
        connectionStatus.className = "status-offline";
        console.error("Connection failed: ", error);
    });

    // ‼️ --- START: โค้ดที่แก้ไข --- ‼️
    db.collection("orders")
      .where("status", "==", "pending") 
      .orderBy("createdAt", "asc")     // (เรียงลำดับตามเวลา - ถูกต้องแล้ว)
      .onSnapshot((querySnapshot) => {
        
        orderQueueContainer.innerHTML = ''; 
        
        let queueNumber = 1; // 1. สร้างตัวนับเลขคิว

        querySnapshot.forEach((doc) => {
            const order = doc.data();
            const orderId = doc.id;
            
            // 2. ส่ง "เลขคิว" เข้าไปในฟังก์ชันสร้างการ์ด
            const card = createOrderCard(order, orderId, queueNumber); 
            orderQueueContainer.appendChild(card);
            
            setTimeout(() => card.classList.add('new-order'), 10);

            queueNumber++; // 3. เพิ่มค่าตัวนับ
        });
      }, (error) => {
          console.error("Error listening to orders: ", error);
      });
    // ‼️ --- END: โค้ดที่แก้ไข --- ‼️


    // ‼️ --- START: โค้ดที่แก้ไข --- ‼️
    // 4. รับตัวแปร queueNumber เข้ามาในฟังก์ชัน
    const createOrderCard = (order, orderId, queueNumber) => {
        const card = document.createElement('div');
        card.className = 'order-card';
        card.dataset.id = orderId;

        const time = order.createdAt.toDate().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
        
        let itemsHtml = '<ul>';
        for (const itemId in order.items) {
            const item = order.items[itemId];
            let mainName = item.name;
            let details = '';
            const detailsMatch = item.name.match(/\(([^)]+)\)/);
            if (detailsMatch) {
                mainName = item.name.replace(detailsMatch[0], '').trim();
                details = detailsMatch[1];
            }
            itemsHtml += `
                <li>
                    <strong>${mainName} (x${item.quantity})</strong>
                    ${details ? `<span class="item-details">- ${details}</span>` : ''}
                </li>
            `;
        }
        itemsHtml += '</ul>';

        // 5. นำ queueNumber มาแสดงผลใน h2
        card.innerHTML = `
            <div class="order-card-header">
                <h2><span class="queue-number">คิวที่ ${queueNumber}</span></h2>
                <span class="order-time">${time}</span>
            </div>
            <div class="order-card-body">
                ${itemsHtml}
            </div>
            <div class="order-card-footer">
                <button class="complete-btn" data-id="${orderId}">
                    <i class="fas fa-check-circle"></i> ทำเสร็จแล้ว
                </button>
            </div>
        `;
        // ‼️ --- END: โค้ดที่แก้ไข --- ‼️

        // (ส่วนปุ่ม "ทำเสร็จแล้ว" เหมือนเดิม)
        const completeButton = card.querySelector('.complete-btn');
        completeButton.addEventListener('click', async () => {
            if (confirm(`คุณต้องการปิดออเดอร์คิวที่ ${queueNumber} นี้ใช่หรือไม่?`)) {
                try {
                    await db.collection("orders").doc(orderId).update({
                        status: "completed"
                    });
                    console.log("Order completed: ", orderId);
                } catch (error) {
                    console.error("Error completing order: ", error);
                }
            }
        });

        return card;
    };
});