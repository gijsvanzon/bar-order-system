"use client";

import { Trash2, Users, Home } from "lucide-react";
import type { OrderItem } from "./order-system";
import type { AttendeesInfo } from "./attendees-section";

interface OrderSummaryProps {
  items: OrderItem[];
  onRemoveItem: (index: number) => void;
  onIncrementItem: (index: number) => void;
  onDecrementItem: (index: number) => void;
  drinksTotal: number;
  attendeesTotal: number;
  total: number;
  onSubmitOrder: () => void;
  isSubmitting: boolean;
  houseNumber: number | null;
  attendees: AttendeesInfo;
  adultPrice: number;
}

export default function OrderSummary({
  items,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
  drinksTotal,
  attendeesTotal,
  total,
  onSubmitOrder,
  isSubmitting,
  houseNumber,
  attendees,
  adultPrice,
}: OrderSummaryProps) {
  const hasItems = items.length > 0;
  const hasAttendees = attendees.adults > 0 || attendees.children > 0;
  const isEmpty = !hasItems && !hasAttendees;

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Order</h2>
      {houseNumber && (
        <div className="mb-4 p-3 bg-zinc-700 rounded-md flex items-center">
          <Home className="h-5 w-5 mr-2 text-emerald-500" />
          <span className="font-medium">Geselecteerd: Huis #{houseNumber}</span>
        </div>
      )}

      {isEmpty ? (
        <div className="flex-1 flex items-center justify-center text-zinc-400 italic">
          Geen drankjes of aanwezigen geselecteerd
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto max-h-[400px]">
          {hasAttendees && (
            <div className="mb-4 p-3 bg-zinc-700 rounded-md">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Aanwezigen</h3>
              </div>

              <div className="space-y-2 pl-7">
                {attendees.adults > 0 && (
                  <div className="flex justify-between">
                    <span>
                      {attendees.adults} × Volwassene
                      {attendees.adults !== 1 ? "n" : ""}
                    </span>
                    <span>€ {(attendees.adults * adultPrice).toFixed(2)}</span>
                  </div>
                )}

                {attendees.children > 0 && (
                  <div className="flex justify-between">
                    <span>
                      {attendees.children} × Kind
                      {attendees.children !== 1 ? "eren" : ""}
                    </span>
                    <span>Gratis</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {hasItems && (
            <table className="w-full">
              <thead className="text-left text-zinc-400 border-b border-zinc-700">
                <tr>
                  <th className="pb-2">Item</th>
                  <th className="pb-2 text-center" colSpan={3}>
                    Aantal
                  </th>
                  <th className="pb-2 text-right">Prijs</th>
                  <th className="pb-2 text-right">Subtotaal</th>
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
                    <td className="py-3 text-center font-medium w-8">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-center">
                      <button
                        onClick={() => onIncrementItem(index)}
                        className="inline-flex items-center justify-center h-6 w-6 bg-zinc-700 hover:bg-zinc-600 rounded-md ml-2"
                      >
                        +
                      </button>
                    </td>
                    <td className="py-3 text-right">
                      € {item.drink.price.toFixed(2)}
                    </td>
                    <td className="py-3 text-right">
                      € {(item.drink.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-zinc-700">
        {hasItems && hasAttendees && (
          <div className="space-y-2 mb-3">
            <div className="flex justify-between items-center text-zinc-300">
              <span>Drankjes subtotaal:</span>
              <span>€ {drinksTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-300">
              <span>Aanwezigen subtotaal:</span>
              <span>€ {attendeesTotal.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Totaal:</span>
          <span className="text-2xl font-bold">€ {total.toFixed(2)}</span>
        </div>

        <button
          onClick={onSubmitOrder}
          disabled={isEmpty || isSubmitting || houseNumber === null}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white py-3 rounded-md font-medium transition-colors"
        >
          {isSubmitting
            ? "Verzenden..."
            : houseNumber === null
              ? "Selecteer een huisnummer"
              : "Order verzenden"}
        </button>
      </div>
    </div>
  );
}
