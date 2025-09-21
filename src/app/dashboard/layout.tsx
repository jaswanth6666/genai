import Chatbot from '@/components/chatbot/Chatbot';
import Header from '@/components/common/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Chatbot />
    </div>
  );
}
