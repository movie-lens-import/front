"use server";

export default async function fetchTasks() {
  const response = await fetch(`${process.env.FLASK_API_URL}/tasks`, {
    next: { tags: ["tasks"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetchtasks");
  }

  const tasks = await response.json();
  return tasks;
}
