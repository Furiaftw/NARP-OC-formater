const GOOGLE_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwoLRirNbyp59R5UpnKrtahXaV35j2vpFOC8sQi9Aphp3OeaCsf1bmbEasbnILMXjDPQg/exec";

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.text();

    const response = await fetch(GOOGLE_WEB_APP_URL, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      redirect: "follow",
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};
