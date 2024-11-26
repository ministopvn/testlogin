document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        Dialog("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
        return;
    }
    Dialog("Đang đăng nhập, vui lòng đợi...");
    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify({ action: 'login', username, password })
        });
        const data = await response.json();

        if (data.success) {
            localStorage.setItem('username', username);
            localStorage.setItem('role', data.role);

            window.location.href = '/index.html';
        } else {
            Dialog("Tên đăng nhập hoặc mật khẩu không đúng!<br>Vui lòng thử lại.");
        }
    } catch (error) {
        console.error('Error:', error);
        Dialog("Có lỗi xảy ra khi kết nối. Vui lòng thử lại sau.");
    }
});
