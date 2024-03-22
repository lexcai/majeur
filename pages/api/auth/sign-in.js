// pages/api/auth/sign-in.js
const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  try {
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.success) {
      const data = await response.json();
      login(data.userData, data.token);
      router.push("/");
    } else {
      console.error("Failed to sign in");
    }
  } catch (error) {
    console.error("Error signing in:", error);
  }
};
export default async function handler(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  // Ici votre logique d'authentification
  res.status(200).json({ success: true });
}
