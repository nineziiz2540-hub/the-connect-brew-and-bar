document.addEventListener('DOMContentLoaded', () => {
    const orderQueueContainer = document.getElementById('order-queue-container');
    const connectionStatus = document.getElementById('connection-status');

    // 1. ตรวจสอบสถานะการเชื่อมต่อ
    db.collection("orders").onSnapshot((snapshot) => {
        // เมื่อเชื่อมต่อสำเร็จ
        connectionStatus.textContent = "เชื่อมต่อแล้ว";
        connectionStatus.className = "status-online";
    }, (error) => {
        // เมื่อเชื่อมต่อล้มเหลว
        connectionStatus.textContent = "การเชื่อมต่อล้มเหลว";
        connectionStatus.className = "status-offline";
        console.error("Connection failed: ", error);
    });

    // 2. ดักฟังออเดอร์ใหม่ (สถานะ "pending")
    // ‼️ --- โค้ดที่แก้ไข --- ‼️
    // (เราเอา // ออกจาก .orderBy แล้ว เพราะเราสร้าง Index ใน Firebase แล้ว)
    db.collection("orders")
      .where("status", "==", "pending") // ดึงเฉพาะออเดอร์ที่ยังไม่เสร็จ
      .orderBy("createdAt", "asc")     // เรียงจากเก่าไปใหม่ (เปิดใช้งานแล้ว)
      .onSnapshot((querySnapshot) => {
        
        // ล้างหน้าจอทุกครั้งที่มีการเปลี่ยนแปลง (เพื่อป้องกันออเดอร์ค้าง)
        orderQueueContainer.innerHTML = ''; 

        querySnapshot.forEach((doc) => {
            const order = doc.data();
            const orderId = doc.id;
            
            // สร้างการ์ดออเดอร์
            const card = createOrderCard(order, orderId);
            orderQueueContainer.appendChild(card);
            
            // เพิ่ม class "new-order" เพื่อให้มี animation
            setTimeout(() => card.classList.add('new-order'), 10);
        });
      }, (error) => {
          console.error("Error listening to orders: ", error);
      });
    // ‼️ --- จบส่วนที่แก้ไข --- ‼️


    // 3. ฟังก์ชันสร้างการ์ดออเดอร์
    const createOrderCard = (order, orderId) => {
        const card = document.createElement('div');
        card.className = 'order-card';
        card.dataset.id = orderId;

        // ดึงเวลาจาก server timestamp
        const time = order.createdAt.toDate().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
        
        let itemsHtml = '<ul>';
        for (const itemId in order.items) {
            const item = order.items[itemId];
            
            // แยกชื่อหลักและรายละเอียด
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

        card.innerHTML = `
            <div class="order-card-header">
                <h2>ออเดอร์ #${orderId.substring(0, 5)}</h2>
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

        // 4. เพิ่ม Event Listener ให้ปุ่ม "ทำเสร็จแล้ว"
        const completeButton = card.querySelector('.complete-btn');
        completeButton.addEventListener('click', async () => {
            if (confirm(`คุณต้องการปิดออเดอร์ #${orderId.substring(0, 5)} นี้ใช่หรือไม่?`)) {
                try {
                    // อัปเดตสถานะใน Firebase เป็น 'completed'
                    await db.collection("orders").doc(orderId).update({
                        status: "completed"
                    });
                    // เมื่ออัปเดตสำเร็จ onSnapshot จะทำงานอัตโนมัติ
                    // และการ์ดนี้จะหายไปจากหน้าจอ (เพราะเราดึงเฉพาะ status == 'pending')
                    console.log("Order completed: ", orderId);
                } catch (error) {
                    console.error("Error completing order: ", error);
                }
            }
        });

        return card;
    };
});