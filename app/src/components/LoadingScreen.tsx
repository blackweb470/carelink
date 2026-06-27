import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import type { UserProfile } from '@/types';
import { KayzBrandmark } from './KayzLogo';
import { cn } from '@/lib/utils';

export function LoadingScreen() {
  const { setSetupComplete, setUserProfile } = useApp();
  const [phase, setPhase] = useState<'loading' | 'wizard' | 'complete'>('loading');
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: '', role: '', organisation: '', email: '' });
  const [practice, setPractice] = useState({ practiceName: '', address: '', postcode: '', beds: '', careSetting: '' });
  const [hub, setHub] = useState({ serial: '', location: '', nickname: '' });

  useEffect(() => {
    const timer = setTimeout(() => setPhase('wizard'), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    const userProfile: UserProfile = {
      name: profile.name,
      role: profile.role,
      organisation: profile.organisation,
      email: profile.email,
      practiceName: practice.practiceName,
      address: practice.address,
      postcode: practice.postcode,
      beds: Number(practice.beds) || 1,
      careSetting: practice.careSetting,
    };
    setUserProfile(userProfile);
    setPhase('complete');
    setTimeout(() => setSetupComplete(), 1500);
  };

  const canContinueStep0 = profile.name && profile.role && profile.organisation && profile.email;
  const canContinueStep1 = practice.practiceName && practice.address && practice.postcode && practice.beds && practice.careSetting;
  const canCompleteStep2 = hub.serial && hub.location;

  return (
    <AnimatePresence mode="wait">
      {phase === 'loading' && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeIn' }}
          className="fixed inset-0 z-[2000] flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/loading-screen-bg.jpg)', filter: 'blur(8px)' }}
          />
          <div className="absolute inset-0 bg-white/60" />
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <KayzBrandmark className="w-16 h-16" color="#0E61FE" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="font-heading text-[2.4rem] text-primary mt-4"
            >
              CareLink
            </motion.p>
            <div className="flex items-center gap-2 mt-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-primary"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {phase === 'wizard' && (
        <motion.div
          key="wizard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[2000] flex"
        >
          {/* Left Panel */}
          <div className="hidden md:flex md:w-2/5 lg:w-[40%] bg-primary flex-col justify-between p-8 relative">
            <div>
              <KayzBrandmark className="w-20 h-20 mb-4" color="#FFFFFF" />
              <h2 className="font-heading text-[2.4rem] text-white">KAYZ CareLink</h2>
              <p className="text-[1.4rem] text-white/80 mt-2 font-body">
                Remote Patient Monitoring for Modern Care
              </p>
            </div>
            <div className="flex-1 flex items-end justify-center pb-8">
              <img
                src="/assets/setup-illustration.jpg"
                alt="Care illustration"
                className="w-[80%] rounded-lg opacity-90"
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
            {/* Step Indicator */}
            <div className="flex items-center gap-4 mb-8">
              {[0, 1, 2].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-[1.3rem] font-body transition-colors',
                      s < step ? 'bg-primary text-white' : s === step ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-600'
                    )}>
                      {s < step ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        s + 1
                      )}
                    </div>
                  </div>
                  {s < 2 && (
                    <div className={cn('w-16 h-[1px]', s < step ? 'bg-primary' : 'bg-neutral-300')} />
                  )}
                </div>
              ))}
            </div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-md"
                >
                  <h2 className="text-h2 mb-2">Set Up Your Profile</h2>
                  <p className="text-body mb-6">Tell us about yourself to personalize your CareLink experience.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Full Name *</label>
                      <input
                        type="text" value={profile.name}
                        onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                        placeholder="Dr. Jane Smith"
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Role *</label>
                      <select
                        value={profile.role}
                        onChange={(e) => setProfile(p => ({ ...p, role: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
                      >
                        <option value="">Select role...</option>
                        <option>General Practitioner</option>
                        <option>Care Home Nurse</option>
                        <option>Care Home Manager</option>
                        <option>Specialist Consultant</option>
                        <option>Administrative Staff</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Organisation *</label>
                      <input
                        type="text" value={profile.organisation}
                        onChange={(e) => setProfile(p => ({ ...p, organisation: e.target.value }))}
                        placeholder="Riverside Care Home"
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">NHS Email *</label>
                      <input
                        type="email" value={profile.email}
                        onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                        placeholder="j.smith@nhs.net"
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    disabled={!canContinueStep0}
                    className="w-full mt-6 py-3 bg-primary text-white rounded font-body text-[1.4rem] hover:bg-primary-hover transition-colors disabled:opacity-40"
                  >
                    Continue
                  </button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-md"
                >
                  <h2 className="text-h2 mb-2">Your Practice Details</h2>
                  <p className="text-body mb-6">Help us understand your care environment.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Practice/Care Home Name *</label>
                      <input type="text" value={practice.practiceName} onChange={(e) => setPractice(p => ({ ...p, practiceName: e.target.value }))} className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Address Line 1 *</label>
                      <input type="text" value={practice.address} onChange={(e) => setPractice(p => ({ ...p, address: e.target.value }))} className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Postcode *</label>
                      <input type="text" value={practice.postcode} onChange={(e) => setPractice(p => ({ ...p, postcode: e.target.value }))} className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Number of Beds *</label>
                        <input type="number" min="1" value={practice.beds} onChange={(e) => setPractice(p => ({ ...p, beds: e.target.value }))} className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Care Setting *</label>
                        <select value={practice.careSetting} onChange={(e) => setPractice(p => ({ ...p, careSetting: e.target.value }))} className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white">
                          <option value="">Select...</option>
                          <option>Residential Care Home</option>
                          <option>Nursing Home</option>
                          <option>GP Practice</option>
                          <option>Community Care</option>
                          <option>Private Residence</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(0)} className="flex-1 py-3 border border-neutral-300 text-neutral-600 rounded font-body text-[1.4rem] hover:bg-neutral-100 transition-colors">Back</button>
                    <button onClick={() => setStep(2)} disabled={!canContinueStep1} className="flex-1 py-3 bg-primary text-white rounded font-body text-[1.4rem] hover:bg-primary-hover transition-colors disabled:opacity-40">Continue</button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-md"
                >
                  <h2 className="text-h2 mb-2">Connect Your First Hub</h2>
                  <p className="text-body mb-6">Enter the details of your first KAYZ cellular gateway hub.</p>
                  <div className="flex justify-center mb-4">
                    <img src="/assets/gateway-hub.png" alt="Gateway Hub" className="h-32 object-contain" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Hub Serial Number / IMEI *</label>
                      <input type="text" value={hub.serial} onChange={(e) => setHub(h => ({ ...h, serial: e.target.value }))} placeholder="KAYZ-HUB-XXXX-XXXX" className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Physical Location *</label>
                      <input type="text" value={hub.location} onChange={(e) => setHub(h => ({ ...h, location: e.target.value }))} placeholder="e.g., Main Office, Ward A" className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Hub Nickname (Optional)</label>
                      <input type="text" value={hub.nickname} onChange={(e) => setHub(h => ({ ...h, nickname: e.target.value }))} placeholder="e.g., Hub-01-Main" className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-[#EBF2FF] border-l-[3px] border-primary rounded-r">
                    <p className="text-[1.2rem] text-primary">You can always add more hubs later from the Hardware page.</p>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(1)} className="flex-1 py-3 border border-neutral-300 text-neutral-600 rounded font-body text-[1.4rem] hover:bg-neutral-100 transition-colors">Back</button>
                    <button onClick={handleComplete} disabled={!canCompleteStep2} className="flex-1 py-3 bg-primary text-white rounded font-body text-[1.4rem] hover:bg-primary-hover transition-colors disabled:opacity-40">Complete Setup</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {phase === 'complete' && (
        <motion.div
          key="complete"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-white"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#24A148" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
            </motion.div>
            <h2 className="text-h2 mb-2">Setup Complete!</h2>
            <p className="text-body">Your CareLink dashboard is ready.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
