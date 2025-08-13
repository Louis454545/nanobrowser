import { useState, useEffect } from 'react';
import { type GeneralSettingsConfig, generalSettingsStore, DEFAULT_GENERAL_SETTINGS } from '@extension/storage';
import { Input, Label, Switch, Card, CardHeader, CardTitle, CardContent } from '@extension/ui';

interface GeneralSettingsProps {
  isDarkMode?: boolean;
}

export const GeneralSettings = ({ isDarkMode = false }: GeneralSettingsProps) => {
  const [settings, setSettings] = useState<GeneralSettingsConfig>(DEFAULT_GENERAL_SETTINGS);

  useEffect(() => {
    // Load initial settings
    generalSettingsStore.getSettings().then(setSettings);
  }, []);

  const updateSetting = async <K extends keyof GeneralSettingsConfig>(key: K, value: GeneralSettingsConfig[K]) => {
    // Optimistically update the local state for responsiveness
    setSettings(prevSettings => ({ ...prevSettings, [key]: value }));

    // Call the store to update the setting
    await generalSettingsStore.updateSettings({ [key]: value } as Partial<GeneralSettingsConfig>);

    // After the store update (which might have side effects, e.g., useVision affecting displayHighlights),
    // fetch the latest settings from the store and update the local state again to ensure UI consistency.
    const latestSettings = await generalSettingsStore.getSettings();
    setSettings(latestSettings);
  };

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maxSteps" className="text-base font-medium">
                Max Steps per Task
              </Label>
              <p className="text-sm text-muted-foreground">Step limit per task</p>
            </div>
            <Input
              id="maxSteps"
              type="number"
              min={1}
              max={50}
              value={settings.maxSteps}
              onChange={e => updateSetting('maxSteps', Number.parseInt(e.target.value, 10))}
              className="w-20"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maxActionsPerStep" className="text-base font-medium">
                Max Actions per Step
              </Label>
              <p className="text-sm text-muted-foreground">Action limit per step</p>
            </div>
            <Input
              id="maxActionsPerStep"
              type="number"
              min={1}
              max={50}
              value={settings.maxActionsPerStep}
              onChange={e => updateSetting('maxActionsPerStep', Number.parseInt(e.target.value, 10))}
              className="w-20"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maxFailures" className="text-base font-medium">
                Failure Tolerance
              </Label>
              <p className="text-sm text-muted-foreground">How many consecutive failures before stopping</p>
            </div>
            <Input
              id="maxFailures"
              type="number"
              min={1}
              max={10}
              value={settings.maxFailures}
              onChange={e => updateSetting('maxFailures', Number.parseInt(e.target.value, 10))}
              className="w-20"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="useVision" className="text-base font-medium">
                Enable Vision
              </Label>
              <p className="text-sm text-muted-foreground">
                Use vision capability of LLMs (consumes more tokens for better results)
              </p>
            </div>
            <Switch
              id="useVision"
              checked={settings.useVision}
              onCheckedChange={value => updateSetting('useVision', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="displayHighlights" className="text-base font-medium">
                Display Highlights
              </Label>
              <p className="text-sm text-muted-foreground">
                Show visual highlights on interactive elements (e.g. buttons, links, etc.)
              </p>
            </div>
            <Switch
              id="displayHighlights"
              checked={settings.displayHighlights}
              onCheckedChange={value => updateSetting('displayHighlights', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="planningInterval" className="text-base font-medium">
                Replanning Frequency
              </Label>
              <p className="text-sm text-muted-foreground">Reconsider and update the plan every [Number] steps</p>
            </div>
            <Input
              id="planningInterval"
              type="number"
              min={1}
              max={20}
              value={settings.planningInterval}
              onChange={e => updateSetting('planningInterval', Number.parseInt(e.target.value, 10))}
              className="w-20"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="minWaitPageLoad" className="text-base font-medium">
                Page Load Wait Time
              </Label>
              <p className="text-sm text-muted-foreground">Minimum wait time after page loads (250-5000ms)</p>
            </div>
            <Input
              id="minWaitPageLoad"
              type="number"
              min={250}
              max={5000}
              step={50}
              value={settings.minWaitPageLoad}
              onChange={e => updateSetting('minWaitPageLoad', Number.parseInt(e.target.value, 10))}
              className="w-20"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="replayHistoricalTasks" className="text-base font-medium">
                Replay Historical Tasks( experimental )
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable storing and replaying of agent step history (experimental, may have issues)
              </p>
            </div>
            <Switch
              id="replayHistoricalTasks"
              checked={settings.replayHistoricalTasks}
              onCheckedChange={value => updateSetting('replayHistoricalTasks', value)}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
