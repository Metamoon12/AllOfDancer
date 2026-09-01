export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return new Response("API is working!", {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
