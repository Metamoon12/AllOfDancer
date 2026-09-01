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
        (name, dancer_name, age, available_area, current_area, main_genre, sub_genre, sns, career, introduction, photo, reference)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        data.name,
        data.dancer_name,
        data.age,
        data.available_area,
        data.current_area,
        data.main_genre,
        data.sub_genre,
        data.sns,
        data.career,
        data.introduction,
        data.photo,
        data.reference
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
