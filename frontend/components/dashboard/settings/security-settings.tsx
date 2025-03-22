import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SecuritySettings() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your account security and authentication settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Change Password</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <Button className="mt-2">Update Password</Button>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p>Authenticator App</p>
              <p className="text-sm text-muted-foreground">Use an authenticator app to generate one-time codes.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p>SMS Authentication</p>
              <p className="text-sm text-muted-foreground">Receive a code via SMS to verify your identity.</p>
            </div>
            <Switch />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Session Management</h3>
          <div className="rounded-md border border-border p-4">
            <div className="space-y-2">
              <p className="font-medium">Active Sessions</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Current Session</p>
                    <p className="text-xs text-muted-foreground">
                      Chrome on Windows • New York, USA • Started 2 hours ago
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Current
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Mobile App</p>
                    <p className="text-xs text-muted-foreground">iOS • San Francisco, USA • Started 1 day ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive">Log Out All Devices</Button>
      </CardFooter>
    </Card>
  )
}

