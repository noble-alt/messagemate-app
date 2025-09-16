import { useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { signInWithPhone, verifyOtp } from '../lib/supabase'
import { useToast } from '../hooks/use-toast'

export const AuthScreen = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    const { error } = await signInWithPhone(phone)
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } else {
      setStep('otp')
      toast({
        title: "OTP Sent",
        description: "Check your phone for the verification code"
      })
    }
    setLoading(false)
  }

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    const { error } = await verifyOtp(phone, otp)
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } else {
      toast({
        title: "Success",
        description: "Successfully signed in!"
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to Best line</CardTitle>
          <CardDescription>
            {step === 'phone' 
              ? 'Enter your phone number to get started'
              : 'Enter the verification code sent to your phone'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {step === 'phone' ? (
            <>
              <div className="space-y-2">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSendOtp} 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="text-center text-xl tracking-widest font-mono"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              
              <Button 
                onClick={handleVerifyOtp} 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => setStep('phone')} 
                className="w-full"
              >
                Change Phone Number
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}