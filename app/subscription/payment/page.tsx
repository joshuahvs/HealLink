'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSession } from 'next-auth/react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const planName = searchParams.get('plan') || '';
  const price = parseInt(searchParams.get('price') || '0');
  const frequency = searchParams.get('frequency') || 'MONTHLY';
  
  const [paymentMethod, setPaymentMethod] = useState('BANK_TRANSFER');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Get session to check authentication
    const session = await getSession();
    if (!session || !session.user) {
      alert('Anda harus login terlebih dahulu.');
      setIsProcessing(false);
      return;
    }

    try {
      // First create the subscription
      const subscriptionResponse = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price,
          frequency,
        }),
      });
      
      if (!subscriptionResponse.ok) {
        throw new Error('Failed to create subscription');
      }
      
      const { subscription } = await subscriptionResponse.json();
      
      // Then process the payment
      const paymentResponse = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price,
          paymentMethod,
          subscriptionId: subscription.id,
        }),
      });
      
      if (!paymentResponse.ok) {
        throw new Error('Failed to process payment');
      }
      
      // Redirect to success page
      router.push('/subscription/success');
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      alert('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
    }
  };
  
  return (
    <div className="container mx-auto py-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Pembayaran Langganan</h1>
      
      <div className="card mb-6 border p-4 rounded-md shadow-md">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Ringkasan Paket</h2>
          <p>Langganan HealLink</p>
        </div>
        <div className="card-body">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Paket</span>
              <span className="font-medium">{planName}</span>
            </div>
            <div className="flex justify-between">
              <span>Harga</span>
              <span className="font-medium">Rp{price.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span>Frekuensi</span>
              <span className="font-medium">{frequency === 'MONTHLY' ? 'Bulanan' : 'Tahunan'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="card border p-4 rounded-md shadow-md">
          <div className="card-header">
            <h2 className="text-lg font-semibold">Pilih Metode Pembayaran</h2>
            <p>Semua transaksi aman dan terenkripsi</p>
          </div>
          <div className="card-body">
            <div>
              <input 
                type="radio" 
                id="bank_transfer" 
                name="payment_method" 
                value="BANK_TRANSFER" 
                checked={paymentMethod === 'BANK_TRANSFER'}
                onChange={() => setPaymentMethod('BANK_TRANSFER')}
              />
              <label htmlFor="bank_transfer" className="ml-2">Transfer Bank (BCA, Mandiri, BNI, BRI)</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="e_wallet" 
                name="payment_method" 
                value="E_WALLET" 
                checked={paymentMethod === 'E_WALLET'}
                onChange={() => setPaymentMethod('E_WALLET')}
              />
              <label htmlFor="e_wallet" className="ml-2">E-Wallet (GoPay, OVO, Dana, LinkAja)</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="credit_card" 
                name="payment_method" 
                value="CREDIT_CARD" 
                checked={paymentMethod === 'CREDIT_CARD'}
                onChange={() => setPaymentMethod('CREDIT_CARD')}
              />
              <label htmlFor="credit_card" className="ml-2">Kartu Kredit (Visa, Mastercard, JCB)</label>
            </div>

            {paymentMethod === 'CREDIT_CARD' && (
              <div className="mt-4 space-y-3">
                <div>
                  <label htmlFor="card_number">Nomor Kartu</label>
                  <input type="text" id="card_number" placeholder="1234 5678 9012 3456" className="input" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="expiry">Tanggal Kadaluarsa</label>
                    <input type="text" id="expiry" placeholder="MM/YY" className="input" />
                  </div>
                  <div>
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123" className="input" />
                  </div>
                </div>
                <div>
                  <label htmlFor="name">Nama Pemegang Kartu</label>
                  <input type="text" id="name" placeholder="Nama sesuai kartu" className="input" />
                </div>
              </div>
            )}
          </div>
          <div className="card-footer">
            <button 
              type="submit" 
              className="w-full p-2 bg-blue-500 text-white rounded-md"
              disabled={isProcessing}
            >
              {isProcessing ? 'Memproses...' : `Bayar Rp${price.toLocaleString('id-ID')}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
