const allowedPages = [
    "dashboard",
    "users",
    "students",
    "auth"
];

const path = window.location.pathname.toLowerCase();

const isValid = allowedPages.some(page => path.includes(page));

if(!isValid){
    window.location.href = "/src/pages/404/index.html";
}