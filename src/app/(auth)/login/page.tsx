'use client';

import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch('/api/v1/auth/login', {
        body: JSON.stringify({ email, password }),
        credentials: 'include', // ✅ 쿠키 방식이면 넣어두는게 안전
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.message ?? '로그인 실패');
        return;
      }

      setMsg('로그인 성공!');
    } catch {
      setMsg('네트워크 오류');
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    setLoading(true);
    setMsg(null);

    try {
      // ✅ 보통 서버가 세션 만료 + Set-Cookie로 쿠키 제거 처리
      const res = await fetch('/api/v1/auth/logout', {
        credentials: 'include',
        method: 'POST',
      });

      // 로그아웃은 바디가 없을 수도 있어서 안전 처리
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.message ?? '로그아웃 실패');
        return;
      }

      setMsg('로그아웃 성공!');
      // UI 초기화(선택)
      setPassword('');
    } catch {
      setMsg('네트워크 오류');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '40px auto', maxWidth: 360 }}>
      <h1>Login</h1>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input
          placeholder="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? '처리 중...' : '로그인'}
        </button>

        {/* ✅ 로그아웃 버튼 추가 */}
        <button type="button" onClick={onLogout} disabled={loading}>
          {loading ? '처리 중...' : '로그아웃'}
        </button>

        {msg && <p style={{ margin: 0 }}>{msg}</p>}
      </form>
    </div>
  );
};

export default Login;
