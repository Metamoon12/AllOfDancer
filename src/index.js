export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/dancers") {
      try {
        const { results } = await env.DB
          .prepare("SELECT * FROM dancers ORDER BY id DESC")
          .all();

        return Response.json(results);
      } catch (error) {
        return Response.json(
          {
            success: false,
            error: error.message
          },
          { status: 500 }
        );
      }
    }

    return new Response("AllOfDancer API Worker is running!", {
      headers: {
        "Content-Type": "text/plain; charset=UTF-8"
      }
    });
  }
};
