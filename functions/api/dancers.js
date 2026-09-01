export async function onRequestGet(context) {
  const db = context.env.DB;

  const { results } = await db
    .prepare("SELECT * FROM dancers ORDER BY id DESC")
    .all();

  return Response.json(results);
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    const result = await context.env.DB
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

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
