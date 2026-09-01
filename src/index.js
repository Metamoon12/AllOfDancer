export default {
  async fetch(request, env) {

    const url = new URL(request.url);


    /* =========================
       DANCERS API
    ========================= */

    if (
      url.pathname === "/api/dancers"
    ) {

      try {

        if (request.method === "GET") {

          const { results } =
            await env.DB
              .prepare(
                "SELECT * FROM dancers ORDER BY id DESC"
              )
              .all();

          return Response.json(
            results
          );

        }


        if (request.method === "POST") {

          const data =
            await request.json();


          const result =
            await env.DB
              .prepare(`
                INSERT INTO dancers
                (
                  name,
                  stage_name,
                  age,
                  available_region,
                  residence,
                  main_genre,
                  sub_genre,
                  sns,
                  career,
                  introduction,
                  profile_image,
                  reference_video
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `)
              .bind(
                data.name,
                data.stage_name,
                data.age || null,
                data.available_region,
                data.residence,
                data.main_genre,
                data.sub_genre,
                data.sns,
                data.career,
                data.introduction,
                data.profile_image,
                data.reference_video
              )
              .run();


          return Response.json({
            success: true,
            id: result.meta.last_row_id
          });

        }


        return new Response(
          "Method Not Allowed",
          {
            status: 405
          }
        );


      } catch (error) {

        return Response.json(
          {
            success: false,
            error: error.message
          },
          {
            status: 500
          }
        );

      }

    }


    /* =========================
       WEBSITE
    ========================= */

    return env.ASSETS.fetch(
      request
    );

  }
};
