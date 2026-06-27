import { useState, useMemo } from 'react';
import { Search, Plus, ChevronUp, ChevronDown, MoreHorizontal } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useDebounce } from '@/hooks/useDebounce';
import { StatusBadge } from './StatusDot';
import { cn } from '@/lib/utils';

type SortField = 'name' | 'room' | 'age' | 'lastReading';
type SortDir = 'asc' | 'desc' | null;

export function PatientTable() {
  const { patients, navigateToPatient } = useApp();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    let result = [...patients];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.room.toLowerCase().includes(q) ||
          p.nhsNumber.includes(q)
      );
    }
    if (sortField && sortDir) {
      result.sort((a, b) => {
        let cmp = 0;
        switch (sortField) {
          case 'name':
            cmp = a.name.localeCompare(b.name);
            break;
          case 'room':
            cmp = a.room.localeCompare(b.room);
            break;
          case 'age':
            cmp = a.age - b.age;
            break;
          case 'lastReading':
            cmp = a.lastReading.timestamp.localeCompare(b.lastReading.timestamp);
            break;
        }
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [patients, debouncedSearch, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field || !sortDir) return <ChevronUp size={14} className="text-neutral-300" />;
    return sortDir === 'asc' ? <ChevronUp size={14} className="text-neutral-600" /> : <ChevronDown size={14} className="text-neutral-600" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-alert-red';
      case 'warning': return 'text-alert-yellow';
      default: return 'text-success';
    }
  };

  return (
    <div className="bg-white border border-neutral-300 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-h3">Patient Directory</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-9 pr-4 py-2 border border-neutral-300 rounded text-[1.3rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded text-[1.2rem] font-body hover:bg-primary-hover transition-colors">
            <Plus size={16} /> <span className="hidden sm:inline">Add Patient</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-100">
              {[
                { field: 'name' as SortField, label: 'Patient Name' },
                { field: 'room' as SortField, label: 'Room' },
                { field: 'age' as SortField, label: 'Age' },
                { field: null, label: 'Primary Device' },
                { field: 'lastReading' as SortField, label: 'Last Reading' },
                { field: null, label: 'Status' },
                { field: null, label: '' },
              ].map((col, i) => (
                <th
                  key={i}
                  onClick={() => col.field && handleSort(col.field)}
                  className={cn(
                    'text-table-header text-left px-4 py-3',
                    col.field && 'cursor-pointer hover:bg-neutral-200 transition-colors'
                  )}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.field && <SortIcon field={col.field} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((patient) => (
              <tr
                key={patient.id}
                className="border-b border-neutral-100 hover:bg-neutral-100 transition-colors cursor-pointer"
                onClick={() => navigateToPatient(patient.id)}
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="font-body text-[1.4rem] font-medium text-neutral-900">{patient.name}</p>
                    <p className="text-[1.1rem] text-neutral-500">NHS: {patient.nhsNumber}</p>
                  </div>
                </td>
                <td className="px-4 py-3 font-body text-[1.4rem] text-neutral-900">{patient.room}</td>
                <td className="px-4 py-3 font-body text-[1.4rem] text-neutral-900">{patient.age}</td>
                <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-600">{patient.primaryDevice}</td>
                <td className={cn('px-4 py-3 font-body text-[1.3rem]', getSeverityColor(patient.lastReading.severity))}>
                  {patient.lastReading.value} — {patient.lastReading.timestamp}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={patient.status} />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigateToPatient(patient.id); }}
                    className="p-1.5 rounded hover:bg-neutral-200 transition-colors"
                  >
                    <MoreHorizontal size={16} className="text-neutral-500" />
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-neutral-500 font-body text-[1.4rem]">
                  No patients match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
          <span className="text-[1.2rem] text-neutral-500">
            Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-[1.2rem] rounded border border-neutral-300 disabled:opacity-50 hover:bg-neutral-100 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'w-8 h-8 text-[1.2rem] rounded transition-colors',
                  currentPage === page ? 'bg-primary text-white' : 'hover:bg-neutral-100'
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-[1.2rem] rounded border border-neutral-300 disabled:opacity-50 hover:bg-neutral-100 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
