import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Appointment, AppointmentType } from '../../types';
import {
  CalendarDays,
  Plus,
  Clock,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  Building2,
  Calendar as CalendarIcon,
  X,
  CheckCircle2
} from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { appointments, addAppointment, deleteAppointment, showToast } = useCrm();

  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [selectedDate, setSelectedDate] = useState('2026-11-12');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    customer: 'Ammar ibn Yasir',
    property: 'Luxury Mountain Residence (#5001)',
    assignedAgent: 'Nayeem Azraf',
    date: '2026-11-14',
    startTime: '11:00',
    endTime: '12:00',
    type: 'Property Visit' as AppointmentType,
    location: 'Hussain Chowk, Skardu',
    notes: 'Bring property deed copies.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    addAppointment(formData);
    setIsAddOpen(false);
    setFormData({
      title: '',
      customer: 'Ammar ibn Yasir',
      property: 'Luxury Mountain Residence (#5001)',
      assignedAgent: 'Nayeem Azraf',
      date: '2026-11-14',
      startTime: '11:00',
      endTime: '12:00',
      type: 'Property Visit',
      location: 'Hussain Chowk, Skardu',
      notes: ''
    });
  };

  const getTypeStyle = (type: AppointmentType) => {
    switch (type) {
      case 'Property Visit':
        return 'bg-blue-50 text-[#2E66F6] border-blue-200';
      case 'Customer Meeting':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Agent Appointment':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Booking Check-in':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Booking Check-out':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Follow-up Call':
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  // Month days generator for demo November 2026
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-11-${String(day).padStart(2, '0')}`;
    const dayEvents = appointments.filter(a => a.date === dateStr);
    return { day, dateStr, events: dayEvents };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Calendar & Schedules</h1>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium border border-slate-200">
              Google Calendar Ready
            </span>
          </div>
          <p className="text-sm text-[#78889B] mt-0.5">
            Coordinate buyer property inspections, lease signing sessions, and agent appointments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
            {(['month', 'week', 'day', 'agenda'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  viewMode === mode
                    ? 'bg-white text-[#2E66F6] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2E66F6] hover:bg-[#2555D4] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#2E66F6]/25 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Schedule Event</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Calendar on Left, Upcoming on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Calendar Body */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-slate-900">November 2026</h3>
              <span className="text-xs text-slate-400">Skardu, PK (PKT / UTC+5)</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Month Days Grid */}
          {viewMode === 'month' && (
            <div>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 pb-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Days cells */}
              <div className="grid grid-cols-7 gap-2">
                {daysInMonth.map(d => {
                  const isToday = d.dateStr === '2026-11-12';
                  const isSelected = d.dateStr === selectedDate;

                  return (
                    <div
                      key={d.day}
                      onClick={() => setSelectedDate(d.dateStr)}
                      className={`min-h-[82px] p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#2E66F6] bg-blue-50/30'
                          : isToday
                          ? 'border-blue-200 bg-white'
                          : 'border-slate-100 bg-slate-50/40 hover:bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                            isToday
                              ? 'bg-[#2E66F6] text-white'
                              : isSelected
                              ? 'text-[#2E66F6]'
                              : 'text-slate-700'
                          }`}
                        >
                          {d.day}
                        </span>
                      </div>

                      <div className="space-y-1 mt-1">
                        {d.events.slice(0, 2).map(ev => (
                          <div
                            key={ev.id}
                            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded truncate border ${getTypeStyle(
                              ev.type
                            )}`}
                            title={ev.title}
                          >
                            {ev.startTime} {ev.title}
                          </div>
                        ))}
                        {d.events.length > 2 && (
                          <span className="text-[9px] text-slate-400 block text-right font-medium">
                            +{d.events.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Agenda / List Mode */}
          {viewMode !== 'month' && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Scheduled Appointments ({appointments.length})
              </h4>
              <div className="divide-y divide-slate-100">
                {appointments.map(ev => (
                  <div key={ev.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E66F6] flex items-center justify-center shrink-0">
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {ev.date} at {ev.startTime} - {ev.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" /> {ev.customer}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{ev.location}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getTypeStyle(
                        ev.type
                      )}`}
                    >
                      {ev.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Upcoming Appointments & Integration Note */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Upcoming Appointments</h3>
            <div className="space-y-3">
              {appointments.map(app => (
                <div
                  key={app.id}
                  className="p-3 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 transition-all space-y-1.5"
                >
                  <div className="flex items-start justify-between">
                    <h5 className="text-xs font-bold text-slate-900">{app.title}</h5>
                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${getTypeStyle(
                        app.type
                      )}`}
                    >
                      {app.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{app.date} · {app.startTime}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2E66F6]" />
                    <span className="truncate">{app.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Note */}
          <div className="bg-blue-50/60 rounded-3xl p-5 border border-blue-100 space-y-2">
            <span className="text-xs font-bold text-[#2E66F6] uppercase tracking-wider block">
              Google Calendar Ready
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Appointment data structures are synced and formatted for Google Calendar API integration in production.
            </p>
          </div>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Schedule New Appointment</h3>
              <button onClick={() => setIsAddOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Appointment Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. VIP Site Inspection: Alpine Villa"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={formData.customer}
                    onChange={e => setFormData({ ...formData, customer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Property
                  </label>
                  <input
                    type="text"
                    value={formData.property}
                    onChange={e => setFormData({ ...formData, property: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="Property Visit">Property Visit</option>
                    <option value="Customer Meeting">Customer Meeting</option>
                    <option value="Agent Appointment">Agent Appointment</option>
                    <option value="Booking Check-in">Booking Check-in</option>
                    <option value="Booking Check-out">Booking Check-out</option>
                    <option value="Follow-up Call">Follow-up Call</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#2E66F6] hover:bg-[#2555D4] rounded-xl shadow-sm shadow-[#2E66F6]/20"
                >
                  Confirm Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
