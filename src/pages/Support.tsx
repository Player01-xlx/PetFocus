import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, ExternalLink, QrCode, Smartphone, CreditCard, Coffee, Pizza, Heart } from 'lucide-react';

export default function Support() {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy the information manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Support PetFocus</h2>
        <p className="text-muted-foreground">Help us keep your virtual pets happy and the app growing!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Support Message */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Why Support Us? 💚</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>PetFocus is a passion project created to help people stay productive while caring for adorable virtual companions.</p>
              <p>Your support helps us:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  Add new pet species and evolution stages
                </li>
                <li className="flex items-center gap-2">
                  <Pizza className="w-4 h-4 text-secondary" />
                  Develop new interactive mini-games
                </li>
                <li className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-accent" />
                  Create mobile apps for iOS and Android
                </li>
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-muted" />
                  Provide cloud sync for your pet data
                </li>
              </ul>
            </div>
          </Card>
          
          {/* Pet Motivation */}
          <Card className="p-6 text-center">
            <img 
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=200&fit=crop"
              alt="Happy cartoon pets showing gratitude"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold text-foreground mb-2">Your pets say thank you! 🐾</h4>
            <p className="text-sm text-muted-foreground">Every contribution helps us create a better world for your virtual companions.</p>
          </Card>
        </div>

        {/* Payment Options */}
        <div className="space-y-6">
          {/* GCash */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">GCash</h3>
                <p className="text-sm text-muted-foreground">Philippine mobile payment</p>
              </div>
            </div>
            <Card className="p-4 bg-background border-border">
              <p className="text-sm text-muted-foreground mb-2">Mobile Number:</p>
              <div className="flex items-center justify-between bg-card rounded-lg px-4 py-2 border border-border">
                <span className="font-mono text-foreground" data-testid="gcash-number">09613777353</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard('09613777353', 'GCash number')}
                  data-testid="button-copy-gcash"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
            </Card>
            <div className="mt-4 flex gap-3">
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90"
                data-testid="button-open-gcash"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open GCash
              </Button>
              <Button 
                variant="outline" 
                className="px-4"
                data-testid="button-gcash-qr"
              >
                <QrCode className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* PayPal */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">PayPal</h3>
                <p className="text-sm text-muted-foreground">International payments</p>
              </div>
            </div>
            <Card className="p-4 bg-background border-border">
              <p className="text-sm text-muted-foreground mb-2">PayPal ID:</p>
              <div className="flex items-center justify-between bg-card rounded-lg px-4 py-2 border border-border">
                <span className="font-mono text-foreground" data-testid="paypal-id">+63 961 377 7353</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard('+63 961 377 7353', 'PayPal ID')}
                  data-testid="button-copy-paypal"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
            </Card>
            <div className="mt-4">
              <Button 
                className="w-full bg-accent hover:bg-accent/90"
                data-testid="button-open-paypal"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Send via PayPal
              </Button>
            </div>
          </Card>

          {/* Support Tiers */}
          <Card className="bg-gradient-to-br from-secondary/10 to-accent/5 p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Support Tiers</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-secondary" />
                  <span className="text-foreground">Buy us a coffee</span>
                </div>
                <span className="text-muted-foreground">₱50</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Pizza className="w-5 h-5 text-secondary" />
                  <span className="text-foreground">Buy us lunch</span>
                </div>
                <span className="text-muted-foreground">₱200</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-secondary" />
                  <span className="text-foreground">Super supporter</span>
                </div>
                <span className="text-muted-foreground">₱500+</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
