const API_URL = "http://127.0.0.1:8000"

export async function analyzeMeeting(
  meeting?: File | null,
  crm?: File | null,
  email?: File | null
) {
  const formData = new FormData()

  if (meeting) {
    formData.append("meeting", meeting)
  }

  if (crm) {
    formData.append("crm", crm)
  }

  if (email) {
    formData.append("email", email)
  }

  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to analyze meeting.")
  }

  return await response.json()
}