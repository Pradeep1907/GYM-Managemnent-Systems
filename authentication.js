// Firebase Authentication Logic

// Login Logic
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in as: ", user.email);
                // Redirect based on user role
                window.location.href = user.email === "admin@example.com" ? "admin.html" : "index.html";
            })
            .catch((error) => {
                alert("Error logging in: " + error.message);
                console.error("Error logging in: ", error.message);
            });
    });
}

// Registration Logic
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Registered as: ", user.email);
                
                // Optional: Update profile with name
                return user.updateProfile({
                    displayName: name
                });
            })
            .then(() => {
                alert("Account created successfully!");
                window.location.href = "Login.html";
            })
            .catch((error) => {
                alert("Error registering: " + error.message);
                console.error("Error registering: ", error.message);
            });
    });
}
