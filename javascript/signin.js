document.getElementById("signinForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("mail").value.trim();
    const password = document.getElementById("pass").value;

    fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => {
        if (!res.ok) throw new Error("Invalid email or password");
        return res.json();
    })
    .then(data => {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("category_id", data.category_id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("level", "level1");

        redirectByCategory(Number(data.category_id));
    })
    .catch(err => {
        document.getElementById("message").innerText = err.message;
    });
});

function redirectByCategory(categoryId) {
    if (categoryId === 1) {
        window.location.href = "../html/home.html";
    } 
    else if (categoryId === 2) {
        window.location.href = "../html/normal/normal_home.html";
    } 
    else if (categoryId === 3) {
        window.location.href = "../html/overweight/overweight.html";
    } 
    else {
        alert("Category not found");
    }
}
