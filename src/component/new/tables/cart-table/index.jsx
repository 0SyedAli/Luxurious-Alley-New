"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import "./style.css";

function formatCurrency(n) {
  return `$${n.toFixed(2)}`;
}

export default function CartTable({
  items,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  // Local state fallback for demo/reuse when callbacks not provided
  const [localItems, setLocalItems] = useState(items);

  const data = onIncrement || onDecrement || onRemove ? items : localItems;

  const increment = (id) => {
    if (onIncrement) return onIncrement(id);
    setLocalItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: it.quantity + 1 } : it
      )
    );
  };

  const decrement = (id) => {
    if (onDecrement) return onDecrement(id);
    setLocalItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(0, it.quantity - 1) } : it
      )
    );
  };

  const remove = (id) => {
    if (onRemove) return onRemove(id);
    setLocalItems((prev) => prev.filter((it) => it.id !== id));
  };

  const rows = useMemo(
    () =>
      data.map((it) => ({
        ...it,
        subtotal: it.price * it.quantity,
      })),
    [data]
  );

  return (
    <div className="table-responsive cart-table">
      <table className="table table-borderless align-middle mb-0 w-100">
        <thead>
          <tr>
            <th className="cart-th text-muted fw-medium">Product</th>
            <th className="cart-th text-muted fw-medium text-end d-none d-md-table-cell">
              Price
            </th>
            <th className="cart-th text-muted fw-medium text-center">
              Quantity
            </th>
            <th className="cart-th text-muted fw-medium text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((it) => (
            <tr className="cart-row" key={it.id}>
              {/* First cell: close icon + image + name are combined visually as "Product",
                  but we separate into two cells to keep header alignment like the mock */}
              <td className="cart-td cart-product">
                <button
                  aria-label="Remove item"
                  className="cart-remove"
                  onClick={() => remove(it.id)}
                >
                  {"×"}
                </button>

                <div className="cart-product-wrap">
                  <Image
                    src={it.imageSrc || "/placeholder.svg"}
                    alt={`${it.name} image`}
                    width={100}
                    height={100}
                    className="cart-product-image"
                  />
                  <div className="cart-product-name">{it.name}</div>
                </div>
              </td>

              {/* Price */}
              <td className="cart-td text-end d-none d-md-table-cell">
                <span className="cart-price">{formatCurrency(it.price)}</span>
              </td>

              {/* Quantity */}
              <td className="cart-td">
                <div className="cart-qty">
                  <button
                    className="inc-dec-btn rounded-circle"
                    onClick={() => decrement(it.id)}
                  >
                    -
                  </button>
                  <span className="inc-dec-count"> {it.quantity}</span>
                  <button
                    className="inc-dec-btn rounded-circle"
                    onClick={() => increment(it.id)}
                  >
                    +
                  </button>
                </div>
              </td>

              {/* Subtotal */}
              <td className="cart-td text-end">
                <span className="cart-subtotal">
                  {formatCurrency(it.subtotal)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
