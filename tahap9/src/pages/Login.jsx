import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../context/useAuth'

function basicValidate(values) {
  const errors = {}
  if (!values.email) errors.email = 'Email wajib diisi'
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Format email tidak valid'
  if (!values.password) errors.password = 'Password wajib diisi'
  else if (values.password.length < 6) errors.password = 'Password minimal 6 karakter'
  return errors
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [basicMode, setBasicMode] = useState(true)

  const [basicForm, setBasicForm] = useState({ email: '', password: '' })
  const [basicErrors, setBasicErrors] = useState({})
  const [touched, setTouched] = useState({})

  const { control, handleSubmit, formState: { errors: hookErrors, isSubmitting }, setError } = useForm({
    defaultValues: { email: '', password: '' }
  })

  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  if (basicMode) {
    function handleChange(e) {
      const { name, value } = e.target
      setBasicForm(prev => ({ ...prev, [name]: value }))
      if (touched[name]) {
        const errs = basicValidate({ ...basicForm, [name]: value })
        setBasicErrors(prev => errs[name] ? { ...prev, [name]: errs[name] } : (delete prev[name], { ...prev }))
      }
    }

    function handleBlur(e) {
      const { name } = e.target
      setTouched(prev => ({ ...prev, [name]: true }))
      const errs = basicValidate(basicForm)
      setBasicErrors(prev => errs[name] ? { ...prev, [name]: errs[name] } : prev)
    }

    async function onSubmit(e) {
      e.preventDefault()
      setServerError('')
      const errs = basicValidate(basicForm)
      setBasicErrors(errs)
      setTouched({ email: true, password: true })
      if (Object.keys(errs).length > 0) return
      setLoading(true)
      try {
        await login(basicForm.email, basicForm.password)
        navigate('/', { replace: true })
      } catch (err) { setServerError(err.message) }
      finally { setLoading(false) }
    }

    return (
      <div className="login-page">
        <form className="login-form" onSubmit={onSubmit} noValidate>
          <h1>Masuk <span className="mode-badge">basic</span></h1>
          <button type="button" className="mode-toggle" onClick={() => setBasicMode(false)}>
            Pakai react-hook-form
          </button>
          {serverError && <div className="error-banner">{serverError}</div>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="user@example.com"
              value={basicForm.email} onChange={handleChange} onBlur={handleBlur}
              className={basicErrors.email && touched.email ? 'input-error' : ''} />
            {basicErrors.email && touched.email && <span className="field-error">{basicErrors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="password123"
              value={basicForm.password} onChange={handleChange} onBlur={handleBlur}
              className={basicErrors.password && touched.password ? 'input-error' : ''} />
            {basicErrors.password && touched.password && <span className="field-error">{basicErrors.password}</span>}
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    )
  }

  async function onHookSubmit(data) {
    setServerError('')
    try {
      await login(data.email, data.password)
      navigate('/', { replace: true })
    } catch (err) {
      setServerError(err.message)
      setError('root', { message: err.message })
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit(onHookSubmit)} noValidate>
        <h1>Masuk <span className="mode-badge">react-hook-form</span></h1>
        <button type="button" className="mode-toggle" onClick={() => setBasicMode(true)}>
          Pakai basic validation
        </button>
        {serverError && <div className="error-banner">{serverError}</div>}

        <div className="form-group">
          <label htmlFor="hook-email">Email</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email wajib diisi',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Format email tidak valid' }
            }}
            render={({ field }) => (
              <input id="hook-email" type="email" placeholder="user@example.com"
                {...field}
                className={hookErrors.email ? 'input-error' : ''} />
            )}
          />
          {hookErrors.email && <span className="field-error">{hookErrors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="hook-password">Password</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password wajib diisi',
              minLength: { value: 6, message: 'Password minimal 6 karakter' }
            }}
            render={({ field }) => (
              <input id="hook-password" type="password" placeholder="password123"
                {...field}
                className={hookErrors.password ? 'input-error' : ''} />
            )}
          />
          {hookErrors.password && <span className="field-error">{hookErrors.password.message}</span>}
        </div>

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </div>
  )
}
