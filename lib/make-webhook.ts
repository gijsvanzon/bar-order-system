import "getenv";
// This is a mock implementation of a Make.com webhook integration

interface OrderItem {
  drinkName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface OrderData {
  timestamp: string;
  houseNumber?: number;
  items: OrderItem[];
  total: number;
}

export async function sendOrderToMakeWebhook(
  orderData: OrderData,
): Promise<void> {
  // In a real implementation, you would:
  // 1. Format the data for Make.com
  // 2. Send the data to your Make.com webhook URL

  console.log("Order data to be sent to Make.com webhook:", orderData);

  // Mock webhook URL (in a real app, this would be your actual Make.com webhook URL)
  const webhookUrl = `https://hook.eu2.make.com/${process.env.makeUID}`;

  try {
    // Simulate API call
    console.log(`Sending data to webhook: ${webhookUrl}`);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response}`);
    }
  } catch (error) {
    console.error("Error sending order to Make.com webhook:", error);
    throw error;
  }
}
