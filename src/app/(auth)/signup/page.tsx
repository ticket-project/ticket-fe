'use client';

import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''; // 같은 도메인이면 빈 문자열로 OK
      const res = await fetch(`/api/v1/auth/sign-up`, {
        body: JSON.stringify({ email, name, password }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.message ?? '회원가입 실패');
        return;
      }

      setMsg('회원가입 성공!');
      // 필요하면 여기서 /login 이동 등 처리
      // router.push("/login");
    } catch (err) {
      setMsg('네트워크 오류');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '40px auto', maxWidth: 360 }}>
      <h1>Signup</h1>

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
        <input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? '가입 중...' : '회원가입'}
        </button>

        {msg && <p style={{ margin: 0 }}>{msg}</p>}
      </form>
    </div>
  );
};

export default Signup;
