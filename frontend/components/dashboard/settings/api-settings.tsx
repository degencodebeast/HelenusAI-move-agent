"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Eye, EyeOff, Plus, Trash } from "lucide-react"
import { useState } from "react"

export function ApiSettings() {
  const [showKey, setShowKey] = useState(false)
  const apiKey = "sk_live_51HxTmLKj8QQxyzPdkLnZV7UwCVBiHCkL3KmLZyJZ"
  const maskedKey = apiKey.replace(/./g, "•").replace(/•{4}$/, apiKey.slice(-4))

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>Manage your API keys for external integrations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="rounded-md border border-border p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-medium">Live API Key</p>
                <p className="text-sm text-muted-foreground">Use this key for production environments.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey)
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Input value={showKey ? apiKey : maskedKey} readOnly className="font-mono" />
            </div>
          </div>
          <div className="rounded-md border border-border p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-medium">Test API Key</p>
                <p className="text-sm text-muted-foreground">Use this key for testing and development.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Input value="sk_test_••••••••••••••••••••••••••••WXYZ" readOnly className="font-mono" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Webhooks</h3>
          <div className="grid gap-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://your-app.com/api/webhook"
              defaultValue="https://example.com/api/crypto-webhook"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Webhook
            </Button>
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

