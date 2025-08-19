import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

interface LoginForm {
  username: string;
  password: string;
}

interface AdminLoginProps {
  onLogin: (admin: { username: string; role: string }) => void;
}

const schema = yup.object({
  username: yup.string().required('اسم المستخدم مطلوب'),
  password: yup.string().required('كلمة المرور مطلوبة').min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    
    // Simulate API call - In real app, this would be an actual authentication
    setTimeout(() => {
      if (data.username === 'admin' && data.password === 'libero123') {
        onLogin({ username: data.username, role: 'admin' });
        toast.success('تم تسجيل الدخول بنجاح');
      } else {
        toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-3xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-[var(--accent-color)] rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Lock size={32} className="text-black" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">لوحة التحكم</h2>
          <p className="text-[var(--text-light)]">تسجيل دخول المدير</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-light)]" size={20} />
              <input
                {...register('username')}
                type="text"
                placeholder="اسم المستخدم"
                className="w-full pr-12 pl-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--text-light)] focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300"
              />
            </div>
            {errors.username && (
              <p className="text-red-400 text-sm mt-2 text-right">{errors.username.message}</p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-light)]" size={20} />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="كلمة المرور"
                className="w-full pr-12 pl-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--text-light)] focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-light)] hover:text-white transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-2 text-right">{errors.password.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full btn-enhanced bg-[var(--accent-color)] text-black py-4 rounded-xl font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                جاري تسجيل الدخول...
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-[var(--text-light)]">
            للاختبار: admin / libero123
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;