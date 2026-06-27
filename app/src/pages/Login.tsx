import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { KayzBrandmark } from '@/components/KayzLogo';

export function Login() {
  const { setUserProfile, setSetupComplete } = useApp();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: queryError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (queryError || !data) {
        setError('Account not found. Please try a demo email.');
        setLoading(false);
        return;
      }

      // Map snake_case from DB to camelCase UserProfile
      setUserProfile({
        name: data.name,
        role: data.role,
        organisation: data.organisation,
        email: data.email,
        practiceName: data.practice_name,
        address: data.address,
        postcode: data.postcode,
        beds: data.beds,
        careSetting: data.care_setting,
      });

      // User exists, so skip setup
      setSetupComplete();
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
      >
        <div className="bg-primary p-8 text-center">
          <KayzBrandmark className="w-16 h-16 mx-auto mb-4" color="#FFFFFF" />
          <h1 className="text-white font-heading text-[2.4rem]">KAYZ CareLink</h1>
          <p className="text-white/80 font-body text-[1.4rem] mt-2">Sign in to your dashboard</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-body text-[1.4rem] text-neutral-900 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-[1.4rem]"
                required
              />
            </div>
            
            {error && (
              <div className="p-3 bg-alert-red/10 border border-alert-red/20 rounded text-alert-red text-[1.3rem]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded font-body text-[1.4rem] hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-200">
            <h3 className="text-[1.2rem] font-medium text-neutral-500 mb-3 uppercase tracking-wider">Demo Accounts</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setEmail('jane.smith@demo.com')}
                className="block w-full text-left p-3 rounded border border-neutral-200 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                <div className="font-medium text-neutral-900 text-[1.3rem]">Dr. Jane Smith</div>
                <div className="text-neutral-500 text-[1.2rem]">jane.smith@demo.com</div>
              </button>
              <button 
                onClick={() => setEmail('robert.chen@demo.com')}
                className="block w-full text-left p-3 rounded border border-neutral-200 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                <div className="font-medium text-neutral-900 text-[1.3rem]">Dr. Robert Chen</div>
                <div className="text-neutral-500 text-[1.2rem]">robert.chen@demo.com</div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
