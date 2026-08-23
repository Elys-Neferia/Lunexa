import { useState } from 'react'
import './SignIn.css'

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [message, setMessage] = useState('')

  const updateField = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.type === 'checkbox' ? target.checked : target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Chức năng đăng nhập sẽ hoạt động sau khi backend có API login.')
  }

  return (
    <main className="signin-page">
      <div className="signin-glow signin-glow-center" aria-hidden="true" />
      <div className="signin-glow signin-glow-top" aria-hidden="true" />
      <div className="signin-glow signin-glow-bottom" aria-hidden="true" />
      <section className="signin-card" aria-labelledby="signin-heading">
        <header className="signin-header"><p className="brand">Lunexa</p><h1 id="signin-heading">Welcome Back</h1><p>Enter your details to access the archive.</p></header>
        <form className="signin-form" onSubmit={handleSubmit}>
          <label><span>Email</span><input name="email" type="email" value={form.email} onChange={updateField} placeholder="archivist@lunexa.io" required /></label>
          <label><span>Password</span><input name="password" type="password" value={form.password} onChange={updateField} placeholder="••••••••" required /></label>
          <div className="signin-options"><label className="remember"><input name="remember" type="checkbox" checked={form.remember} onChange={updateField} /><span>Remember me</span></label><a href="#forgot-password">Forgot password?</a></div>
          {message && <p className="signin-message" role="status">{message}</p>}
          <button className="signin-submit" type="submit">Login</button>
        </form>
        <div className="signin-divider"><span>OR</span></div>
        <div className="signin-socials"><button type="button">Continue with Google</button><button type="button">Continue with Discord</button></div>
        <p className="signin-signup">Don't have an account? <a href="#signup">Sign up</a></p>
      </section>
    </main>
  )
}
