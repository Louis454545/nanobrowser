import { useState, useEffect, useCallback } from 'react';
import { firewallStore } from '@extension/storage';
import { Button, Input, Switch, Card, CardHeader, CardTitle, CardContent, Label } from '@extension/ui';

interface FirewallSettingsProps {
  isDarkMode: boolean;
}

export const FirewallSettings = ({ isDarkMode }: FirewallSettingsProps) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [allowList, setAllowList] = useState<string[]>([]);
  const [denyList, setDenyList] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [activeList, setActiveList] = useState<'allow' | 'deny'>('allow');

  const loadFirewallSettings = useCallback(async () => {
    const settings = await firewallStore.getFirewall();
    setIsEnabled(settings.enabled);
    setAllowList(settings.allowList);
    setDenyList(settings.denyList);
  }, []);

  useEffect(() => {
    loadFirewallSettings();
  }, [loadFirewallSettings]);

  const handleToggleFirewall = async () => {
    await firewallStore.updateFirewall({ enabled: !isEnabled });
    await loadFirewallSettings();
  };

  const handleAddUrl = async () => {
    // Remove http:// or https:// prefixes
    const cleanUrl = newUrl.trim().replace(/^https?:\/\//, '');
    if (!cleanUrl) return;

    if (activeList === 'allow') {
      await firewallStore.addToAllowList(cleanUrl);
    } else {
      await firewallStore.addToDenyList(cleanUrl);
    }
    await loadFirewallSettings();
    setNewUrl('');
  };

  const handleRemoveUrl = async (url: string, listType: 'allow' | 'deny') => {
    if (listType === 'allow') {
      await firewallStore.removeFromAllowList(url);
    } else {
      await firewallStore.removeFromDenyList(url);
    }
    await loadFirewallSettings();
  };

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Firewall</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="toggle-firewall" className="text-base font-medium">
              Enable Firewall
            </Label>
            <Switch
              id="toggle-firewall"
              checked={isEnabled}
              onCheckedChange={async checked => {
                await firewallStore.updateFirewall({ enabled: checked });
                await loadFirewallSettings();
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant={activeList === 'allow' ? 'default' : 'outline'} onClick={() => setActiveList('allow')}>
                Allow List
              </Button>
              <Button variant={activeList === 'deny' ? 'default' : 'outline'} onClick={() => setActiveList('deny')}>
                Deny List
              </Button>
            </div>
          </div>

          <div className="flex space-x-2">
            <Input
              id="url-input"
              type="text"
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleAddUrl();
                }
              }}
              placeholder="Enter domain or URL (e.g. example.com, localhost, 127.0.0.1)"
              className="flex-1"
            />
            <Button onClick={handleAddUrl} size="sm">
              Add
            </Button>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {activeList === 'allow' ? (
              allowList.length > 0 ? (
                <ul className="space-y-2">
                  {allowList.map(url => (
                    <li key={url} className="flex items-center justify-between rounded-md border p-2">
                      <span className="text-sm">{url}</span>
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveUrl(url, 'allow')}>
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  No domains in allow list. Empty allow list means all non-denied domains are allowed.
                </p>
              )
            ) : denyList.length > 0 ? (
              <ul className="space-y-2">
                {denyList.map(url => (
                  <li key={url} className="flex items-center justify-between rounded-md border p-2">
                    <span className="text-sm">{url}</span>
                    <Button variant="destructive" size="sm" onClick={() => handleRemoveUrl(url, 'deny')}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-sm text-muted-foreground">No domains in deny list</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How the Firewall Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>The firewall contains a deny list and an allow list.</li>
            <li>If both lists are empty, all URLs are allowed</li>
            <li>Deny list takes priority - if a URL matches any deny list entry, it&apos;s blocked</li>
            <li>When allow list is empty, all non-denied URLs are allowed</li>
            <li className="font-bold">When allow list is not empty, only matching URLs are allowed</li>
            <li>Wildcards are NOT supported yet</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};
