import React, { useState } from 'react';
import { FileText, MessageSquare, CheckCircle2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import DocumentsView from '@/components/DocumentsView';
import EditorView from '@/components/EditorView';
import TeamView from '@/components/TeamView';
import { Activity, Document, TeamMember, TeamActivity } from '@/types';

interface MainLayoutProps {
  children?: React.ReactNode;
  recentDocuments: Document[];
  recentActivities: Activity[];
  teamMembers: TeamMember[];
  teamActivities: TeamActivity[];
}

const MainLayout: React.FC<MainLayoutProps> = ({
  recentDocuments,
  recentActivities,
  teamMembers,
  teamActivities,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard recentDocuments={recentDocuments} recentActivities={recentActivities} />;
      case 'documents':
        return <DocumentsView documents={recentDocuments} onDocumentClick={() => {}} />;
      case 'editor':
        return <EditorView onSave={() => {}} onPublish={() => {}} onPreview={() => {}} />;
      case 'team':
        return <TeamView members={teamMembers} activities={teamActivities} />;
      default:
        return <Dashboard recentDocuments={recentDocuments} recentActivities={recentActivities} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        expandedFolders={expandedFolders}
        setExpandedFolders={setExpandedFolders}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex-1 flex flex-col">
        <Header
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
          recentActivities={recentActivities}
        />
        <main className="flex-1 min-h-0 h-full flex flex-col px-4 md:px-8 py-4 md:py-8 w-full max-w-7xl mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

 