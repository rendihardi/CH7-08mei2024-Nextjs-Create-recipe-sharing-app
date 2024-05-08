import sql from "better-sqlite3";
const db = sql("meals.db");
import fs from "fs";

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug =?").get(slug);
}

export function saveMeal(meal) {
  const extention = meal.image.name.split(".").pop();
  const fileName = `${meal.title}.${extention}`;
  const stream = fs.createeWriteStream(`public/images/${fileName}`);

  const buffredImage = meal.image.arrayBuffer();
  stream.write(Buffer.from(buffredImage));
  db.prepare(
    `INSERT INTO meals (title, summary, instructions,creator,creator_email,image,slug) VALUES (@title, @summary, @instructions, @creator, @creator_email, @image,@slug)`
  ).run(meal);
}
