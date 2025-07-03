export async function fetchExplanation(label: unknown, instructions: string) {
  const res = await fetch("/api/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label, instructions }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch explanation");
  }

  const data = await res.json();
  return data.explanation;
}
