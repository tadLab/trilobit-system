import { Header } from './components/Header';
import { CalendarView } from './components/calendar/CalendarView';
import { QuickContact } from './components/QuickContact';
import { Footer } from './components/Footer';

export function CalendarPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <CalendarView />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}

export default CalendarPage;
