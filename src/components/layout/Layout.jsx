import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* O main ocupa o espaço restante e adiciona um padding-top para compensar a Navbar fixa */}
      <main className="flex-grow pt-16">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}