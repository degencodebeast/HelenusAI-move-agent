import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ProfileSettings() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your profile information and preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change Avatar
            </Button>
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself"
            defaultValue="Crypto enthusiast and investor since 2017. Focused on DeFi and Web3 technologies."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" defaultValue="United States" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

