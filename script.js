// Toggle between login and signup forms
function toggleForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
}

// Handle Signup
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    fname: document.getElementById("fname").value,
    lname: document.getElementById("lname").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    email: document.getElementById("signupEmail").value,
    password: document.getElementById("signupPassword").value,
  };

  try {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    document.getElementById("signupMessage").textContent =
      data.message || data.error;

    if (data.message === "Signup successful!") {
      toggleForms();
    }
  } catch (err) {
    console.error("Signup error:", err);
  }
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginData = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value,
  };

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();
    document.getElementById("loginMessage").textContent =
      data.message || data.error;

    if (data.message === "Login successful!") {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "start.html"; // redirect to your main page
    }
  } catch (err) {
    console.error("Login error:", err);
  }
});
