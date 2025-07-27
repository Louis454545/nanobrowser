import { useState, useEffect } from 'react';
import '@src/Options.css';
import { Tabs, TabsList, TabsTrigger, TabsContent, Card } from '@extension/ui';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { GeneralSettings } from './components/GeneralSettings';
import { ModelSettings } from './components/ModelSettings';
import { FirewallSettings } from './components/FirewallSettings';

type TabTypes = 'general' | 'models' | 'firewall' | 'help';

const TABS: { id: TabTypes; icon: string; label: string }[] = [
  { id: 'general', icon: '⚙️', label: 'General' },
  { id: 'models', icon: '📊', label: 'Models' },
  { id: 'firewall', icon: '🔒', label: 'Firewall' },
  { id: 'help', icon: '📚', label: 'Help' },
];

const Options = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>('models');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleTabClick = (tabId: TabTypes) => {
    if (tabId === 'help') {
      window.open('https://nanobrowser.ai/docs', '_blank');
    } else {
      setActiveTab(tabId);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings isDarkMode={isDarkMode} />;
      case 'models':
        return <ModelSettings isDarkMode={isDarkMode} />;
      case 'firewall':
        return <FirewallSettings isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex min-h-screen min-w-[768px] bg-background text-foreground">
        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-screen-lg space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Manage your extension configuration and preferences</p>
            </div>

            <Card className="w-full">
              <Tabs value={activeTab} onValueChange={value => setActiveTab(value as TabTypes)}>
                <TabsList className="grid w-full grid-cols-4">
                  {TABS.map(item => (
                    <TabsTrigger
                      key={item.id}
                      value={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className="flex items-center space-x-2">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="general" className="mt-6">
                  <GeneralSettings isDarkMode={isDarkMode} />
                </TabsContent>

                <TabsContent value="models" className="mt-6">
                  <ModelSettings isDarkMode={isDarkMode} />
                </TabsContent>

                <TabsContent value="firewall" className="mt-6">
                  <FirewallSettings isDarkMode={isDarkMode} />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div>Loading...</div>), <div>Error Occurred</div>);
