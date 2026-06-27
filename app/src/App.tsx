import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from '@/context/AppContext';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { HeaderBar } from '@/components/HeaderBar';
import { LoadingScreen } from '@/components/LoadingScreen';
import { GlobalAlertBanner } from '@/components/GlobalAlertBanner';
import { Dashboard } from '@/pages/Dashboard';
import { PatientsDirectory } from '@/pages/PatientsDirectory';
import { PatientDetail } from '@/pages/PatientDetail';
import { Hubs } from '@/pages/Hubs';
import { Wearables } from '@/pages/Wearables';
import { AlertHistory } from '@/pages/AlertHistory';
import { Login } from '@/pages/Login';

function AppContent() {
  const { isSetupComplete, currentPage, sidebarCollapsed, isLoading, userProfile } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-neutral-500 font-body text-[1.4rem]">Loading system data...</p>
      </div>
    );
  }

  if (!userProfile) {
    return <Login />;
  }

  if (!isSetupComplete) {
    return <LoadingScreen />;
  }

  const sidebarWidth = sidebarCollapsed ? 'md:ml-sidebar-collapsed' : 'md:ml-sidebar';

  return (
    <div className="min-h-screen bg-neutral-100">
      <GlobalAlertBanner />
      <Sidebar />
      <MobileNav />
      <div className={`${sidebarWidth} transition-all duration-300 pb-mobile-nav md:pb-0`}>
        <HeaderBar />
        <main className="p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currentPage === 'dashboard' && <Dashboard />}
              {currentPage === 'patients' && <PatientsDirectory />}
              {currentPage === 'patient' && <PatientDetail />}
              {currentPage === 'alert-history' && <AlertHistory />}
              {currentPage === 'hubs' && <Hubs />}
              {currentPage === 'wearables' && <Wearables />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
