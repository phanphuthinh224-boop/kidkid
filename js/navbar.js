import { supabase } from './supabaseClient.js';

export async function renderNavbar() {
  const navContainer = document.getElementById('navbar');
  if (!navContainer) return;

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  let profile = null;
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
    profile = data;
  }

  navContainer.innerHTML = `
    <nav class="nav-bar">
      <a href="index.html" class="logo">QNOJ</a>
      <div class="nav-links">
        <a href="problems.html">Bài tập</a>
        <a href="users.html">Người dùng</a>
        ${profile?.role === 'admin' ? '<a href="admin.html" class="admin-link">Quản trị</a>' : ''}
      </div>
      <div class="nav-user">
        ${user ? `
          <a href="profile.html?id=${user.id}" class="user-info">
            <img src="${profile?.avatar_url || 'https://via.placeholder.com/32'}" class="avatar-sm" />
            <span>${profile?.username || 'User'}</span>
          </a>
          <button id="logoutBtn" class="btn-logout">Đăng xuất</button>
        ` : `
          <a href="login.html">Đăng nhập</a>
          <a href="register.html">Đăng ký</a>
        `}
      </div>
    </nav>
  `;

  document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
  });
}

renderNavbar();
