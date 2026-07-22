export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Build target URL
    const target = new URL(url.pathname + url.search, "https://w3b-labs.com");

    const response = await fetch(target, {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: "follow"
    });

    return new Response(response.body, response);
  }
}