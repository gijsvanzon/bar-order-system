export async function POST(req: Request) {
  const orderContent = await req.json();

  const webhookUrl = `https://hook.eu2.make.com/${process.env.MAKE_ID}`;

  try {
    // Simulate API call
    console.log(`Sending data to webhook: ${webhookUrl}`);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderContent),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Error sending order to Make.com" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ message: "Accepted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error sending order to Make.com" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
