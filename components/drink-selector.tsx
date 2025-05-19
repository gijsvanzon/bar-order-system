"use client"

import type { Drink } from "./order-system"

interface DrinkSelectorProps {
  drinks: Drink[]
  onSelectDrink: (drink: Drink) => void
}

export default function DrinkSelector({ drinks, onSelectDrink }: DrinkSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {drinks.map((drink) => (
        <button
          key={drink.id}
          onClick={() => onSelectDrink(drink)}
          className="flex flex-col items-center justify-center p-4 rounded-md transition-colors bg-zinc-700 hover:bg-emerald-700 text-zinc-100"
        >
          <div className="mb-2">{drink.icon}</div>
          <span className="font-medium">{drink.name}</span>
          <span className="text-sm opacity-80">€ {drink.price.toFixed(2)}</span>
        </button>
      ))}
    </div>
  )
}
