import { useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

function App() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', terms: false })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    if (form.password !== form.confirmPassword) return setError('Mật khẩu xác nhận không khớp.')
    if (!form.terms) return setError('Vui lòng đồng ý với Điều khoản và Chính sách bảo mật.')

    setIsSubmitting(true)
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || data.errors?.join(' ') || 'Không thể tạo tài khoản.')
      setMessage('Tạo tài khoản thành công. Bạn có thể đăng nhập ngay bây giờ.')
      setForm({ username: '', email: '', password: '', confirmPassword: '', terms: false })
    } catch (requestError) {
      setError(requestError.message || 'Không thể kết nối đến máy chủ.')
    } finally { setIsSubmitting(false) }
  }

  return <main className="signup-page">
    <div className="orb orb-one" aria-hidden="true" />
    <div className="orb orb-two" aria-hidden="true" />
    <section className="signup-card" aria-labelledby="signup-heading">
      <header className="signup-header">
        <div className="lunexa-logo" aria-label="Lunexa">L</div>
        <h1 id="signup-heading">Join the Archive</h1>
        <p>Enter the Midnight Archive and begin your journey.</p>
      </header>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label><span>Username</span><div className="input-wrap"><i aria-hidden="true">◉</i><input name="username" value={form.username} onChange={updateField} placeholder="Aethelgard" minLength="3" required /></div></label>
        <label><span>Email Address</span><div className="input-wrap"><i aria-hidden="true">✉</i><input name="email" value={form.email} onChange={updateField} placeholder="scholar@lunexa.app" type="email" required /></div></label>
        <label><span>Password</span><div className="input-wrap"><i aria-hidden="true">♢</i><input name="password" value={form.password} onChange={updateField} placeholder="••••••••" type="password" minLength="6" required /></div></label>
        <label><span>Confirm Password</span><div className="input-wrap"><i aria-hidden="true">♢</i><input name="confirmPassword" value={form.confirmPassword} onChange={updateField} placeholder="••••••••" type="password" minLength="6" required /></div></label>
        <label className="terms"><input name="terms" checked={form.terms} onChange={updateField} type="checkbox" /><span>I agree to the <a href="#terms">Terms and Conditions</a> and Privacy Policy.</span></label>
        {error && <p className="form-message error" role="alert">{error}</p>}
        {message && <p className="form-message success" role="status">{message}</p>}
        <button className="signup-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating account…' : 'Sign Up'}</button>
      </form>
      <div className="divider"><span>Or continue with</span></div>
      <div className="social-actions"><button type="button" className="social-button"><b>G</b> Google</button><button type="button" className="social-button"><b>◉</b> Discord</button></div>
      <p className="login-link">Already have an account? <a href="#login">Login</a></p>
    </section>
  </main>
}

export default App
