"use client";
import React, { useState } from "react";
import "./style.scss";
import TabelCard from "../TabelCard/page";

interface Product {
  name: string;
  price: number;
}

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

const products: Product[] = [
  { name: "کباب", price: 120000 },
  { name: "نوشابه", price: 15000 },
  { name: "برنج", price: 40000 },
  { name: "سالاد", price: 25000 },
  { name: "دوغ", price: 18000 },
];

const OrderAdmin: React.FC = () => {
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Map<number, OrderData>>(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [count, setCount] = useState<number>(1);

  const tables: TableInfo[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    status: ["empty", "occupied", "reserved"][i % 3] as TableStatus,
  }));

  const filteredProducts = products.filter((p) =>
    p.name.includes(searchTerm.trim())
  );

  const selectedOrder = selectedTableId ? orders.get(selectedTableId) || null : null;

  const handleAddItemToOrder = () => {
    if (!selectedTableId || !selectedProduct || count < 1) return;

    const currentOrder = orders.get(selectedTableId) || {
      tableId: selectedTableId,
      items: [],
    };

    const newItem: OrderItem = {
      name: selectedProduct.name,
      count,
      price: selectedProduct.price,
    };

    const updatedOrder: OrderData = {
      ...currentOrder,
      items: [...currentOrder.items, newItem],
    };

    const updatedOrders = new Map(orders);
    updatedOrders.set(selectedTableId, updatedOrder);
    setOrders(updatedOrders);

    // Reset form
    setSelectedProduct(null);
    setCount(1);
    setSearchTerm("");
  };

  return (
    <div className="admin-container">
      <div className="table-list">
        {tables.map((table) => (
          <TabelCard
            key={table.id}
            tableId={table.id}
            status={table.status}
            onSelect={() => setSelectedTableId(table.id)}
            isSelected={selectedTableId === table.id}
          />
        ))}
      </div>

      <div className="order-panel">
        <h3>سفارش میز</h3>

        {selectedTableId ? (
          <>
            <p>میز انتخاب‌شده: {selectedTableId}</p>

            <div className="product-form">
              <input
                type="text"
                placeholder="جستجوی محصول..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {filteredProducts.length > 0 && (
                <ul className="product-list">
                  {filteredProducts.map((p, idx) => (
                    <li
                      key={idx}
                      onClick={() => setSelectedProduct(p)}
                      style={{
                        cursor: "pointer",
                        fontWeight: selectedProduct?.name === p.name ? "bold" : "normal",
                      }}
                    >
                      {p.name} - {p.price.toLocaleString()} تومان
                    </li>
                  ))}
                </ul>
              )}

              {selectedProduct && (
                <div className="product-entry">
                  <p>محصول انتخاب‌شده: {selectedProduct.name}</p>
                  <input
                    type="number"
                    min={1}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    placeholder="تعداد"
                  />
                  <button onClick={handleAddItemToOrder} className="btn green">
                    افزودن به سفارش
                  </button>
                </div>
              )}
            </div>

            {selectedOrder && selectedOrder.items.length > 0 && (
              <div className="receipt-preview" style={{ fontFamily: "Tahoma", fontSize: "12px", lineHeight: 1.3 }}>
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
              </div>
            )}
          </>
        ) : (
          <p>لطفاً یک میز انتخاب کنید.</p>
        )}
      </div>
    </div>
  );
};

export default OrderAdmin;
