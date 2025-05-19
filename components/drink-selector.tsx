"use client";

import type { Drink, OrderItem } from "./order-system";

interface DrinkSelectorProps {
  drinks: Drink[];
  orderItems: OrderItem[];
  onSelectDrink: (drink: Drink) => void;
}

export default function DrinkSelector({
  drinks,
  orderItems,
  onSelectDrink,
}: DrinkSelectorProps) {
  const getDrinkQuantity = (drinkId: string): number => {
    const item = orderItems.find((item) => item.drink.id === drinkId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {drinks.map((drink) => {
        const quantity = getDrinkQuantity(drink.id);

        return (
          <button
            key={drink.id}
            onClick={() => onSelectDrink(drink)}
            className="flex flex-col items-center justify-center p-4 rounded-md transition-colors bg-zinc-700 hover:bg-emerald-700 text-zinc-100 relative"
          >
            <div className="mb-2">{drink.icon}</div>
            <span className="font-medium">{drink.name}</span>
            <span className="text-sm opacity-80">
              € {drink.price.toFixed(2)}
            </span>

            {quantity > 0 && (
              <div className="absolute top-1 right-1 bg-emerald-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {quantity}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
