"use client"

import { Trash2 } from "lucide-react"
import type { OrderItem } from "./order-system"

interface OrderSummaryProps {
  items: OrderItem[]
  onRemoveItem: (index: number) => void
  onIncrementItem: (index: number) => void
  onDecrementItem: (index: number) => void
  total: number
  onSubmitOrder: () => void
  isSubmitting: boolean
  houseNumber: number | null
}

export default function OrderSummary({
  items,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
  total,
  onSubmitOrder,
  isSubmitting,
  houseNumber,
}: OrderSummaryProps) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-zinc-400 italic">No items in order</div>
      ) : (
        <div className="flex-1 overflow-y-auto max-h-[400px]">
          <table className="w-full">
            <thead className="text-left text-zinc-400 border-b border-zinc-700">
              <tr>
                <th className="pb-2">Item</th>
                <th className="pb-2 text-center" colSpan={3}>
                  Quantity
                </th>
                <th className="pb-2 text-right">Price</th>
                <th className="pb-2 text-right">Subtotal</th>
                <th className="pb-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-zinc-700/50">
                  <td className="py-3">{item.drink.name}</td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => onDecrementItem(index)}
                      className="inline-flex items-center justify-center h-6 w-6 bg-zinc-700 hover:bg-zinc-600 rounded-md mr-2"
                    >
                      -
                    </button>
                  </td>
                  <td className="py-3 text-center font-medium w-8">{item.quantity}</td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => onIncrementItem(index)}
                      className="inline-flex items-center justify-center h-6 w-6 bg-zinc-700 hover:bg-zinc-600 rounded-md ml-2"
                    >
                      +
                    </button>
                  </td>
                  <td className="py-3 text-right">€ {item.drink.price.toFixed(2)}</td>
                  <td className="py-3 text-right">€ {(item.drink.price * item.quantity).toFixed(2)}</td>
                  <td className="py-3">
                    <button onClick={() => onRemoveItem(index)} className="text-red-400 hover:text-red-300 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-zinc-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold">€ {total.toFixed(2)}</span>
        </div>

        <button
          onClick={onSubmitOrder}
          disabled={items.length === 0 || isSubmitting || houseNumber === null}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white py-3 rounded-md font-medium transition-colors"
        >
          {isSubmitting
            ? "Submitting..."
            : houseNumber === null
              ? "Select House Number"
              : "Complete Order & Send to Make.com"}
        </button>
      </div>
    </div>
  )
}
