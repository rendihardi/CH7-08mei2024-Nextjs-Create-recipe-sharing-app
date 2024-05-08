"use server";

import { redirect } from "next/dist/server/api-utils";

export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: "/images/burger.jpg",
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    slug: "ini slug",
  };
  await saveMeal(meal);
  redirect("/meals");
}
