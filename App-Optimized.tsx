import React, { useState, useEffect, lazy, Suspense } from 'react';
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
import { UserRole } from './types';
import { authApi } from './services/supabaseClient';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load all page components for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AiMentor = lazy(() => import('./pages/AiMentor'));
const ProjectBuilder = lazy(() => import('./pages/ProjectBuilder'));
const PodcastGuide = lazy(() => import('./pages/PodcastGuide'));
const Glossary = lazy(() => import('./pages/Glossary'));
const Reports = lazy(() => import('./pages/Reports'));
const Login = lazy(() => import('./pages/Login'));
const CulturalAssets = lazy(() => import('./pages/CulturalAssets'));
const CreativeStudio = lazy(() => import('./pages/CreativeStudio'));
const DesignThinking = lazy(() => import('./pages/DesignThinking'));
const SprintPlanner = lazy(() => import('./pages/SprintPlanner'));
const KPIsDashboard = lazy(() => import('./pages/KPIsDashboard'));
const SWOTAnalysis = lazy(() => import('./pages/SWOTAnalysis'));
const Academy = lazy(() => import('./pages/Academy'));

// Memoized Sidebar component to prevent unnecessary re-renders
const Sidebar = React.memo(({ role, onLogout }: { role: UserRole, onLogout: () => void }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'لوحة التحكم', path: '/', icon: HomeIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'], ariaLabel: 'انتقل إلى لوحة التحكم' },
    { name: 'الأكاديمية', path: '/academy', icon: AcademicCapIcon, roles: ['YOUTH', 'LAB_MANAGER', 'PROJECT_MANAGER'], ariaLabel: 'انتقل إلى الأكاديمية' },
    { name: 'مؤشرات الأداء (KPIs)', path: '/kpis', icon: ChartBarIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER'], ariaLabel: 'انتقل إلى مؤشرات الأداء' },
    { name: 'تحليل SWOT', path: '/swot', icon: PresentationChartLineIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER'], ariaLabel: 'انتقل إلى تحليل SWOT' },
    { name: 'مكتبة الأصول', path: '/assets', icon: ArchiveBoxIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'], ariaLabel: 'انتقل إلى مكتبة الأصول الثقافية' },
    { name: 'مخطط التصميم', path: '/design', icon: LightBulbIcon, roles: ['YOUTH', 'LAB_MANAGER'], ariaLabel: 'انتقل إلى مخطط التفكير التصميمي' },
    { name: 'برنامج Sprint', path: '/sprint', icon: CalendarIcon, roles: ['YOUTH', 'LAB_MANAGER'], ariaLabel: 'انتقل إلى مخطط السبرينت' },
    { name: 'دليل البودكاست', path: '/podcast', icon: MicrophoneIcon, roles: ['YOUTH', 'LAB_MANAGER'], ariaLabel: 'انتقل إلى دليل البودكاست' },
    { name: 'استوديو الإبداع', path: '/studio', icon: SparklesIcon, roles: ['YOUTH', 'LAB_MANAGER'], ariaLabel: 'انتقل إلى استوديو الإبداع' },
    { name: 'الموجه الذكي', path: '/mentor', icon: ChatBubbleLeftRightIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'], ariaLabel: 'انتقل إلى الموجه الذكي' },
    { name: 'منشئ المشاريع', path: '/builder', icon: Squares2X2Icon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'], ariaLabel: 'انتقل إلى منشئ المشاريع' },
    { name: 'التقارير الإحصائية', path: '/reports', icon: ChartPieIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER'], ariaLabel: 'انتقل إلى التقارير الإحصائية' },
    { name: 'قاموس المصطلحات', path: '/glossary', icon: BookOpenIcon, roles: ['YOUTH', 'LAB_MANAGER', 'PROJECT_MANAGER'], ariaLabel: 'انتقل إلى قاموس المصطلحات' },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role as string));

  return (
    <aside 
      className="w-64 bg-slate-900 text-white min-h-screen flex flex-col sticky top-0 h-screen z-50 shadow-2xl border-l border-slate-800 hidden lg:flex"
      role="navigation"
      aria-label="القائمة الرئيسية"
    >
      <div className="p-8 border-b border-slate-800 flex items-center gap-4">
        <div className="bg-yellow-400 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/20 rotate-3 transition-transform hover:rotate-0">
          <span className="text-slate-900 font-black text-2xl" aria-hidden="true">م</span>
        </div>
        <div>
          <h1 className="font-black text-xl leading-tight tracking-tight text-right text-white">مختبرات</h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest text-right">الإدارة الرقمية</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar mt-4" role="menu">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              role="menuitem"
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 relative group ${
                isActive 
                ? 'bg-yellow-400 text-slate-900 font-black shadow-xl shadow-yellow-400/10' 
                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} aria-hidden="true" />
              <span className="text-sm font-bold tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button 
          onClick={onLogout} 
          aria-label="تسجيل الخروج من المنصة"
          className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all font-black text-sm text-right focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" aria-hidden="true" />
          <span>خروج آمن</span>
        </button>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

// Mobile Bottom Navigation Component
const MobileBottomNav = React.memo(({ role, currentPath }: { role: UserRole, currentPath: string }) => {
  const quickAccessItems = [
    { name: 'الرئيسية', path: '/', icon: HomeIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'] },
    { name: 'الأكاديمية', path: '/academy', icon: AcademicCapIcon, roles: ['YOUTH', 'LAB_MANAGER', 'PROJECT_MANAGER'] },
    { name: 'المشاريع', path: '/builder', icon: Squares2X2Icon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'] },
    { name: 'الموجه', path: '/mentor', icon: ChatBubbleLeftRightIcon, roles: ['PROJECT_MANAGER', 'LAB_MANAGER', 'YOUTH'] },
  ].filter(item => item.roles.includes(role as string));

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 safe-area-pb"
      role="navigation"
      aria-label="التنقل السريع"
    >
      <div className="flex justify-around items-center px-2 py-2">
        {quickAccessItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              aria-label={item.name}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[60px] touch-manipulation ${
                isActive 
                  ? 'bg-yellow-400 text-slate-900' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-6 h-6" aria-hidden="true" />
              <span className="text-xs font-bold">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
});

MobileBottomNav.displayName = 'MobileBottomNav';

const MainContent = ({ userRole, handleLogout }: { userRole: UserRole, handleLogout: () => void }) => {
  const location = useLocation();
  const isAcademy = location.pathname.startsWith('/academy');

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-['Cairo'] selection:bg-yellow-100 selection:text-yellow-900">
      {/* Desktop Sidebar */}
      {!isAcademy && <Sidebar role={userRole} onLogout={handleLogout} />}
      
      <main className={`flex-1 flex flex-col min-w-0 ${isAcademy ? 'w-full' : ''} pb-20 lg:pb-0`} role="main">
        {/* Platform Header - Hidden in Academy */}
        {!isAcademy && (
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 lg:px-10 py-5 sticky top-0 z-40 flex justify-between items-center shadow-sm">
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
        
        <div className={`${isAcademy ? 'p-0' : 'p-4 lg:p-10'} max-w-[1400px] mx-auto w-full`}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
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
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {!isAcademy && <MobileBottomNav role={userRole} currentPath={location.pathname} />}
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
    return <LoadingSpinner fullScreen />;
  }

  if (!userRole) {
    return (
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Login onLogin={(role) => setUserRole(role)} />
      </Suspense>
    );
  }

  return (
    <Router>
      <MainContent userRole={userRole} handleLogout={handleLogout} />
    </Router>
  );
};

export default App;
