import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { safeStorage } from '../db';

const appLogo = "/gemba_digital_logo.png";

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('Qla@gembapartner.com');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      setErrorMessage('Lütfen e-posta adresinizi giriniz.');
      return;
    }

    if (!cleanEmail.endsWith('@gembapartner.com')) {
      setErrorMessage('E-posta adresiniz yetkili @gembapartner.com uzantılı olmalıdır.');
      return;
    }

    if (cleanPassword !== 'gemba1234') {
      setErrorMessage('Girdiğiniz şifre hatalı. Lütfen kontrol ediniz.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      safeStorage.setItem('gp_auth_user', cleanEmail);
      setIsLoading(false);
      onLoginSuccess(cleanEmail);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Abstract Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 relative z-10 space-y-6 backdrop-blur-xl animate-fade-in">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div>
            <img 
              src={appLogo} 
              alt="Gemba Digital Logo" 
              className="h-12 w-auto object-contain max-w-[220px]"
            />
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-black font-display text-white tracking-tight flex items-center justify-center gap-2">
              Gemba QLA
              <span className="bg-red-600 text-[9px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-wider">PRO</span>
            </h1>
            <p className="text-xs font-extrabold text-slate-300 uppercase tracking-widest">
              Quick Loss Analyzer
            </p>
          </div>
          <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs">
            Endüstriyel Saha Olgunluk ve Hızlı Kayıp Analiz Portalı
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          {errorMessage && (
            <div className="bg-red-950/80 border border-red-500/50 text-red-300 text-xs p-3.5 rounded-2xl flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="font-semibold">{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-1">
              Kurumsal E-posta
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Qla@gembapartner.com"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-1">
              Parola
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-lg hover:shadow-red-600/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>PORTALA GİRİŞ YAP</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center pt-2">
          <p className="text-[10px] text-slate-500 font-semibold">
            &copy; 2026 Gemba Digital. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
