"use server";

export async function fetchTask(jobId: string): Promise<any> {
  try {
    console.log(jobId);
    const response = await fetch(
      `${process.env.FLASK_API_URL}/tasks/${jobId}`,
      { next: { tags: [`${jobId}`] } }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
