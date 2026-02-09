
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  HomeIcon, 
  MicrophoneIcon, 
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  Squares2X2Icon,
  ArrowLeftOnRectangleIcon,
  ChartPieIcon,
  ArchiveBoxIcon,
  SparklesIcon,
  CalendarIcon,
  LightBulbIcon,
  ArrowPathIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import Dashboard from './pages/Dashboard';
import AiMentor from './pages/AiMentor';
import ProjectBuilder from './pages/ProjectBuilder';
import PodcastGuide from './pages/PodcastGuide';
import Glossary from './pages/Glossary';
import Reports from './pages/Reports';
import Login from './pages/Login';
import CulturalAssets from './pages/CulturalAssets';
import CreativeStudio from './pages/CreativeStudio';
import DesignThinking from './pages/DesignThinking';
import SprintPlanner from './pages/SprintPlanner';
import KPIsDashboard from './pages/KPIsDashboard';
import SWOTAnalysis from './pages/SWOTAnalysis';
import Academy from './pages/Academy';
import { UserRole } from './types';
import { authApi } from './services/supabaseClient';

const Sidebar = ({ role, onLogout }: { role: UserRole, onLogout: () => void }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'لوحة التحكم', path: '/', icon: HomeIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'] },
    { name: 'الأكاديمية', path: '/academy', icon: AcademicCapIcon, roles: ['YOUTH', 'LAB_MANAGER', 'PROJECT_MANAGER'] },
    { name: 'مؤشرات الأداء (KPIs)', path: '/kpis', icon: ChartBarIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER'] },
    { name: 'تحليل SWOT', path: '/swot', icon: PresentationChartLineIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER'] },
    { name: 'مكتبة الأصول', path: '/assets', icon: ArchiveBoxIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'] },
    { name: 'مخطط التصميم', path: '/design', icon: LightBulbIcon, roles: ['YOUTH', 'LAB_MANAGER'] },
    { name: 'برنامج Sprint', path: '/sprint', icon: CalendarIcon, roles: ['YOUTH', 'LAB_MANAGER'] },
    { name: 'دليل البودكاست', path: '/podcast', icon: MicrophoneIcon, roles: ['YOUTH', 'LAB_MANAGER'] },
    { name: 'استوديو الإبداع', path: '/studio', icon: SparklesIcon, roles: ['YOUTH', 'LAB_MANAGER'] },
    { name: 'الموجه الذكي', path: '/mentor', icon: ChatBubbleLeftRightIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'] },
    { name: 'منشئ المشاريع', path: '/builder', icon: Squares2X2Icon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'] },
    { name: 'التقارير الإحصائية', path: '/reports', icon: ChartPieIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER'] },
    { name: 'قاموس المصطلحات', path: '/glossary', icon: BookOpenIcon, roles: ['YOUTH', 'LAB_MANAGER', 'PROJECT_MANAGER'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role as string));

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col sticky top-0 h-screen z-50 shadow-2xl border-l border-slate-800">
      <div className="p-8 border-b border-slate-800 flex items-center gap-4">
        <div className="bg-yellow-400 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/20 rotate-3 transition-transform hover:rotate-0">
          <span className="text-slate-900 font-black text-2xl">م</span>
        </div>
        <div>
          <h1 className="font-black text-xl leading-tight tracking-tight text-right text-white">مختبرات</h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest text-right">الإدارة الرقمية</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar mt-4">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 relative group ${
                isActive 
                ? 'bg-yellow-400 text-slate-900 font-black shadow-xl shadow-yellow-400/10' 
                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
              <span className="text-sm font-bold tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all font-black text-sm text-right">
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span>خروج آمن</span>
        </button>
      </div>
    </aside>
  );
};

const MainContent = ({ userRole, handleLogout }: { userRole: UserRole, handleLogout: () => void }) => {
  const location = useLocation();
  const isAcademy = location.pathname.startsWith('/academy');

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-['Cairo'] selection:bg-yellow-100 selection:text-yellow-900">
      {/* Hide Sidebar if in Academy */}
      {!isAcademy && <Sidebar role={userRole} onLogout={handleLogout} />}
      
      <main className={`flex-1 flex flex-col min-w-0 ${isAcademy ? 'w-full' : ''}`}>
        {/* Hide Platform Header if in Academy */}
        {!isAcademy && (
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 py-5 sticky top-0 z-40 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-6">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">المنصة الموحدة</span>
                <span className="text-sm font-black text-slate-900">المختبرات الوطنية للإدارة</span>
              </div>
            </div>
            <div className={`text-xs font-black px-4 py-2 rounded-xl uppercase tracking-tighter shadow-lg ${
              userRole === 'PROJECT_MANAGER' ? 'bg-slate-900 text-white' : 
              userRole === 'LAB_MANAGER' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
            }`}>
              {userRole === 'PROJECT_MANAGER' ? 'المدير العام (وضع التجريب)' : 
               userRole === 'LAB_MANAGER' ? 'مدير المختبر (وضع التجريب)' : 
               'شاب مبدع (وضع التجريب)'}
            </div>
          </header>
        )}
        
        <div className={`${isAcademy ? 'p-0' : 'p-10'} max-w-[1400px] mx-auto w-full`}>
          <Routes>
            <Route path="/" element={<Dashboard role={userRole} />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/kpis" element={<KPIsDashboard />} />
            <Route path="/swot" element={<SWOTAnalysis />} />
            <Route path="/assets" element={<CulturalAssets />} />
            <Route path="/design" element={<DesignThinking />} />
            <Route path="/sprint" element={<SprintPlanner />} />
            <Route path="/studio" element={<CreativeStudio />} />
            <Route path="/mentor" element={<AiMentor />} />
            <Route path="/builder" element={<ProjectBuilder />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/podcast" element={<PodcastGuide />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const mockRole = localStorage.getItem('creative_lab_mock_role') as UserRole;
      if (mockRole) {
        setUserRole(mockRole);
        setLoading(false);
        return;
      }

      const { data: { subscription } } = authApi.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const metadataRole = session.user.user_metadata?.role;
          if (metadataRole) {
            setUserRole(metadataRole);
          } else {
            const profile = await authApi.getProfile(session.user.id);
            setUserRole(profile?.role || 'YOUTH');
          }
        } else {
          setUserRole(null);
        }
        setLoading(false);
      });
      return () => subscription.unsubscribe();
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('creative_lab_mock_role');
    await authApi.signOut();
    setUserRole(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <ArrowPathIcon className="w-12 h-12 text-yellow-400 animate-spin mb-4" />
        <p className="font-black animate-pulse">جاري تحميل المنصة...</p>
      </div>
    );
  }

  if (!userRole) return <Login onLogin={(role) => setUserRole(role)} />;

  return (
    <Router>
      <MainContent userRole={userRole} handleLogout={handleLogout} />
    </Router>
  );
};

export default App;
