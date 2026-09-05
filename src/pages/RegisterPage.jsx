import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { inputClass, labelClass } from '../components/auth/authStyles';
import SocialButtons from '../components/auth/SocialButtons';
import { registerUser } from '../services/authApi';

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/8345/8345328.png"

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    avatar: null,
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if(type === 'file'){
      const file =  files[0]
      // 1024 * 1024 = 1.048.576  = 1 MB
      // 5 * 1024 * 1024 = 1.048.576  = 5.242.880 = 5MB
      if (!file) {
          setForm((prev) => ({...prev, avatar: null}))
          setAvatarPreview(null)
          return
      }

      if(!file.type.startsWith('image/')){
        setError("Please upload a vaild image file (PNG, JPG, WEBP).")
        return
      }

      if(file.size > 5 * 1024 * 1024){
        setError("image size must be less than 5MB.")
        return
      }
      setForm((prev) => ({...prev, avatar: file}))
      setAvatarPreview(URL.createObjectURL(file))
      if(error) setError('')
      return
    }
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms) {
      setError("You must agree to the Terms of Service and Privacy Policy.")
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    setError('')
    try {
      const formData = new FormData()
      formData.append('email', form.email)
      formData.append('phone_number', form.number)
      formData.append('password', form.password)
      if(form.name){
        formData.append('username', form.email)
      }
      if(form.avatar){
        formData.append('avatar', form.avatar)
      }
      await registerUser(form)
      navigate('/signin')
    }
    catch (err) {
      setError(err.message || "An unexpected error occurred during registration.")
    } finally {
      setLoading(false)
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start posting and helping your community today.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-lost-light border border-red-200 text-sm text-lost font-medium">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="avatar" className={labelClass}>Profile picture</label>
          <div className='flex items-center gap-4 mt-1'>
            <div className='w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0'>
              <img src={avatarPreview || DEFAULT_AVATAR} onError={(e) => {e.target.onerror = null; e. target.src = DEFAULT_AVATAR}} className='w-full h-full object-cover' alt="" />
            </div>
            <input type="file" id='avatar' name='avatar' accept='image/*' onChange={handleChange} className='text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-600 hover:file:bg-brand-100 cursor-pointer'/>
          </div>
        </div>

        <div>
          <label htmlFor="name" className={labelClass}>Full name <span className="text-lost">*</span></label>
          <input
            id="name"
            type="text"
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>Email address <span className="text-lost">*</span></label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Phone number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+374 00 000 000"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>Password <span className="text-lost">*</span></label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className={labelClass}>Confirm password <span className="text-lost">*</span></label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            className={inputClass}
          />
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer pt-1">
          <input
            type="checkbox"
            name="terms"
            required
            checked={form.terms}
            onChange={handleChange}
            className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-slate-600 leading-relaxed">
            I agree to the <a href="#" className="text-brand-600 font-medium hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-brand-600 font-medium hover:underline">Privacy Policy</a>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/25 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <SocialButtons />

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/signin" className="font-semibold text-brand-600 hover:text-brand-700">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
