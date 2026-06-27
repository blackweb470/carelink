import { motion } from 'framer-motion';
import { PatientTable } from '@/components/PatientTable';

export function PatientsDirectory() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2 mb-2">
        <h2 className="text-h2">Patient Directory</h2>
        <p className="text-[1.4rem] text-neutral-500">
          Manage all patients, view their primary devices, and monitor their status.
        </p>
      </div>
      
      <PatientTable />
    </motion.div>
  );
}
