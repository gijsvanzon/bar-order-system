"use client";

import type React from "react";

import { useState } from "react";
import {
  Beer,
  Coffee,
  Wine,
  GlassWater,
  Martini as Cocktail,
  Beaker as Shot,
} from "lucide-react";
import DrinkSelector from "./drink-selector";
import OrderSummary from "./order-summary";
import HouseNumberPicker from "./house-number-picker";
import { sendOrderToMakeWebhook } from "@/lib/make-webhook";

export type DrinkCategory =
  | "soda"
  | "beer"
  | "whiteWine"
  | "redWine"
  | "cocktailA"
  | "cocktailB"
  | "cocktailC"
  | "shot";

export interface Drink {
  id: DrinkCategory;
  name: string;
  price: number;
  icon: React.ReactNode;
}

export interface OrderItem {
  drink: Drink;
  quantity: number;
}

const DRINKS: Drink[] = [
  {
    id: "soda",
    name: "Soda",
    price: 0,
    icon: <GlassWater className="h-5 w-5" />,
  },
  { id: "beer", name: "Beer", price: 1, icon: <Beer className="h-5 w-5" /> },
  {
    id: "whiteWine",
    name: "Witte Wijn",
    price: 1,
    icon: <Wine className="h-5 w-5" />,
  },
  {
    id: "redWine",
    name: "Rode Wijn",
    price: 1,
    icon: <Wine className="h-5 w-5" />,
  },
  {
    id: "cocktailA",
    name: "Gin tonic",
    price: 2,
    icon: <Cocktail className="h-5 w-5" />,
  },
  {
    id: "cocktailB",
    name: "43 sprite",
    price: 2,
    icon: <Cocktail className="h-5 w-5" />,
  },
  {
    id: "cocktailC",
    name: "Mojito",
    price: 2,
    icon: <Cocktail className="h-5 w-5" />,
  },
  {
    id: "shot",
    name: "Shotje",
    price: 1,
    icon: <Shot className="h-5 w-5" />,
  },
];

export default function OrderSystem() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleDrinkSelect = (drink: Drink) => {
    // Add drink directly to the order
    const existingItemIndex = orderItems.findIndex(
      (item) => item.drink.id === drink.id,
    );

    if (existingItemIndex >= 0) {
      // If drink already exists in order, increment quantity
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex].quantity += 1;
      setOrderItems(updatedItems);
    } else {
      // Otherwise add new item with quantity 1
      setOrderItems([...orderItems, { drink, quantity: 1 }]);
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = [...orderItems];
    updatedItems.splice(index, 1);
    setOrderItems(updatedItems);
  };

  const incrementItem = (index: number) => {
    const updatedItems = [...orderItems];
    updatedItems[index].quantity += 1;
    setOrderItems(updatedItems);
  };

  const decrementItem = (index: number) => {
    const updatedItems = [...orderItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setOrderItems(updatedItems);
    } else {
      // Remove the item if quantity would be 0
      removeItem(index);
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (sum, item) => sum + item.drink.price * item.quantity,
      0,
    );
  };

  const handleSubmitOrder = async () => {
    if (orderItems.length === 0) return;
    if (selectedHouse === null) {
      alert("Please select a house number before completing the order");
      return;
    }

    setIsSubmitting(true);

    try {
      // Format order data for Make.com webhook
      const orderData = {
        timestamp: new Date().toISOString(),
        houseNumber: selectedHouse,
        items: orderItems.map((item) => ({
          drinkName: item.drink.name,
          quantity: item.quantity,
          unitPrice: item.drink.price,
          subtotal: item.drink.price * item.quantity,
        })),
        total: calculateTotal(),
      };

      // Send to Make.com webhook
      await sendOrderToMakeWebhook(orderData);

      // Reset order
      setOrderItems([]);
      setOrderComplete(true);

      // Reset house number after order is complete
      setSelectedHouse(null);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setOrderComplete(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit order:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">House Number</h2>
          <HouseNumberPicker
            selectedHouse={selectedHouse}
            onSelectHouse={setSelectedHouse}
          />
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Select Drinks</h2>
          <p className="text-zinc-400 mb-4">
            Click a drink to add it to the order
          </p>
          <DrinkSelector
            drinks={DRINKS}
            orderItems={orderItems}
            onSelectDrink={handleDrinkSelect}
          />
        </div>
      </div>

      <div className="bg-zinc-800 p-4 rounded-lg">
        <OrderSummary
          items={orderItems}
          onRemoveItem={removeItem}
          onIncrementItem={incrementItem}
          onDecrementItem={decrementItem}
          total={calculateTotal()}
          onSubmitOrder={handleSubmitOrder}
          isSubmitting={isSubmitting}
          houseNumber={selectedHouse}
        />

        {orderComplete && (
          <div className="mt-4 p-3 bg-emerald-900/50 border border-emerald-700 rounded-md text-emerald-300">
            Order successfully sent to Make.com webhook!
          </div>
        )}
      </div>
    </div>
  );
}
