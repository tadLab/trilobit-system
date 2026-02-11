import { Header } from './components/Header';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import { useNavigation } from './App';

export function AdminPage() {
  const { navigateTo } = useNavigation();

  useEffect(() => {
    // Check if user is authenticated
    const isAdmin = localStorage.getItem('trilobit_admin');
    if (!isAdmin) {
      navigateTo('login');
    }
  }, [navigateTo]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
}

export default AdminPage;
