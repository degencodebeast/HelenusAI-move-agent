import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function NotificationSettings() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how and when you want to be notified.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p>Portfolio Updates</p>
                <p className="text-sm text-muted-foreground">Receive daily summaries of your portfolio performance.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p>Market Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified about significant market movements.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p>Security Alerts</p>
                <p className="text-sm text-muted-foreground">Receive alerts about account security events.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p>Newsletter</p>
                <p className="text-sm text-muted-foreground">Weekly insights and crypto news.</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Push Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p>Price Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when assets reach your target prices.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p>Transaction Updates</p>
                <p className="text-sm text-muted-foreground">Receive notifications about your transactions.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p>New Features</p>
                <p className="text-sm text-muted-foreground">Be the first to know about new platform features.</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Reset to Default</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

