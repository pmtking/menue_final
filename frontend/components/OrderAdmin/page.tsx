"use client";
import React, { useState } from "react";
import "./style.scss";
import TabelCard from "../TabelCard/page";

interface OrderItem {
  name: string;
  count: number;
  price: number;
}

interface OrderData {
  tableId: number;
  items: OrderItem[];
}

type TableStatus = "empty" | "occupied" | "reserved";

interface TableInfo {
  id: number;
  status: TableStatus;
}

const OrderAdmin: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  const tables: TableInfo[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    status: ["empty", "occupied", "reserved"][i % 3] as TableStatus,
  }));

  const handleCreateOrder = () => {
    if (!selectedTableId) return;

    const sampleOrder: OrderData = {
      tableId: selectedTableId,
      items: [
        { name: "کباب", count: 2, price: 120000 },
        { name: "نوشابه", count: 3, price: 15000 },
        { name: "برنج", count: 1, price: 40000 },
      ],
    };

    setSelectedOrder(sampleOrder);
  };

  const handlePrint = () => {
    if (!selectedOrder) return;

    const content = `
شماره میز: ${selectedOrder.tableId}
${selectedOrder.items
      .map((item) => `${item.name} - ${item.count}×${item.price.toLocaleString()} تومان`)
      .join("\n")}
--------------------
مجموع: ${selectedOrder.items.reduce((sum, item) => sum + item.price * item.count, 0).toLocaleString()} تومان
`;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: "Tahoma", sans-serif;
                font-size: 10px;
                line-height: 1.1;
                width: 200px;
              }
              pre {
                margin: 0;
                white-space: pre-wrap;
              }
              hr {
                border: none;
                border-top: 1px dashed #000;
                margin: 2px 0;
              }
            </style>
          </head>
          <body>
            <pre>${content}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="admin-container">
      <div className="table-list">
        {tables.map((table) => (
          <TabelCard
            key={table.id}
            tableId={table.id}
            status={table.status}
            onSelect={() => {
              setSelectedTableId(table.id);
              setSelectedOrder(null);
            }}
            isSelected={selectedTableId === table.id}
          />
        ))}
      </div>

      <div className="order-panel">
        <h3>فیش سفارش</h3>

        {selectedOrder ? (
          <div className="receipt-preview" style={{ fontFamily: "Tahoma", fontSize: "12px", lineHeight: 1.3 }}>
            <p>شماره میز: {selectedOrder.tableId}</p>
            <hr />
            {selectedOrder.items.map((item, idx) => (
              <p key={idx}>
                {item.name} - {item.count} × {item.price.toLocaleString()} تومان
              </p>
            ))}
            <hr />
            <p>
              مجموع:{" "}
              {selectedOrder.items
                .reduce((sum, i) => sum + i.price * i.count, 0)
                .toLocaleString()}{" "}
              تومان
            </p>
            <button onClick={handlePrint} className="btn green" style={{ marginTop: "10px" }}>
              چاپ فیش
            </button>
          </div>
        ) : selectedTableId ? (
          <>
            <p>برای میز {selectedTableId} هنوز سفارشی ثبت نشده است.</p>
            <button onClick={handleCreateOrder} className="btn blue">
              ایجاد سفارش تستی
            </button>
          </>
        ) : (
          <p>هیچ میز انتخاب نشده است.</p>
        )}
      </div>
    </div>
  );
};

export default OrderAdmin;
