import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/dashboard/settings/profile-settings"
import { SecuritySettings } from "@/components/dashboard/settings/security-settings"
import { NotificationSettings } from "@/components/dashboard/settings/notification-settings"
import { ApiSettings } from "@/components/dashboard/settings/api-settings"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="api">
          <ApiSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

