'use client';
import { useState, useEffect, useRef, JSX } from 'react';

export default function ChatbotPage() {
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([
    {
      from: 'bot',
      text: 'Halo, saya HealLink, asisten kesehatan Anda! 😊 Apa kabar kesehatan Anda hari ini? Anda bisa tanya soal gejala seperti demam, tips pola makan sehat, cara atasi stres, atau apa saja yang bikin penasaran. Coba ceritain, apa yang lagi Anda rasakan atau ingin tahu?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<string | null>(null); // Untuk menyimpan konteks pertanyaan
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Daftar topik cepat
  const quickTopics = [
    { label: 'Cek Gejala', value: 'Saya merasa tidak enak badan, apa yang harus saya lakukan?' },
    { label: 'Pola Makan', value: 'Bagaimana cara makan sehat dengan budget terbatas?' },
    { label: 'Kesehatan Mental', value: 'Saya sering stres, apa tips mengatasinya?' },
    { label: 'Pencegahan Penyakit', value: 'Bagaimana cara mencegah demam atau flu?' },
  ];

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Deteksi konteks sederhana berdasarkan input
  const detectContext = (text: string): string | null => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('demam') || lowerText.includes('sakit') || lowerText.includes('gejala')) {
      return 'gejala';
    } else if (lowerText.includes('makan') || lowerText.includes('diet')) {
      return 'pola_makan';
    } else if (lowerText.includes('stres') || lowerText.includes('mental')) {
      return 'kesehatan_mental';
    } else if (lowerText.includes('cegah') || lowerText.includes('pencegahan')) {
      return 'pencegahan';
    }
    return null;
  };

  // Format teks untuk mengganti tanda ** dengan elemen HTML yang tepat
  const formatText = (text: string): JSX.Element => {
    // Pisahkan teks berdasarkan pola ** untuk menemukan teks yang seharusnya tebal
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return (
      <>
        {parts.map((part, index) => {
          // Jika bagian teks mengandung **, itu adalah teks yang seharusnya tebal
          if (part.startsWith('**') && part.endsWith('**')) {
            // Hapus tanda ** dan kembalikan sebagai elemen <strong>
            return <strong key={index}>{part.slice(2, -2)}</strong>;
          }
          // Jika ditemukan teks dengan format baru baris '\n\n', kita ubah jadi <br />
          if (part.includes('\n\n')) {
            const paragraphs = part.split('\n\n');
            return (
              <span key={index}>
                {paragraphs.map((paragraph, pIndex) => (
                  <span key={`p-${pIndex}`}>
                    {paragraph}
                    {pIndex < paragraphs.length - 1 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </span>
                ))}
              </span>
            );
          }
          // Kembalikan teks biasa
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  const sendMessage = async (messageText?: string) => {
    const userText = messageText || input.trim();
    if (!userText || userText.length < 3) {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: 'Yah, pertanyaannya kurang jelas nih. Coba ceritain lebih detail, ya!' },
      ]);
      return;
    }

    setMessages(prev => [...prev, { from: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    // Deteksi konteks
    const newContext = detectContext(userText);
    setContext(newContext);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText, context: newContext }),
      });

      if (!res.ok) throw new Error('Gagal menghubungi server');
      const data = await res.json();
      let botReply = data.reply || 'Hmm, saya belum paham nih. Bisa ceritain lebih detail?';

      // Tambahkan tips berdasarkan konteks
      if (newContext === 'gejala') {
        botReply += '\n\nTips: Jika Anda merasa sakit, istirahat cukup dan minum air putih banyak ya!';
      } else if (newContext === 'pola_makan') {
        botReply += '\n\nTips: Coba tambah sayur dan buah lokal yang terjangkau, seperti bayam atau pisang!';
      } else if (newContext === 'kesehatan_mental') {
        botReply += '\n\nTips: Luangkan 5 menit untuk tarik napas dalam, bisa bantu tenangin pikiran!';
      } else if (newContext === 'pencegahan') {
        botReply += '\n\nTips: Cuci tangan rutin dan jaga imun dengan tidur cukup!';
      }

      // Hapus tanda * sebelum disimpan ke state
      const cleanedReply = botReply.replace(/\*/g, '');
      
      setMessages(prev => [...prev, { from: 'bot', text: cleanedReply }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: 'Waduh, ada masalah teknis nih. Coba tanya lagi sebentar ya!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  const handleQuickTopic = (topic: string) => {
    setInput(topic);
    sendMessage(topic);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4 flex items-center gap-2">
          <span className="text-2xl">🩺</span>
          <h1 className="text-xl font-bold">HealLink - Konsultasi Kesehatan</h1>
        </div>

        <div className="p-4">
          {/* Tombol Topik Cepat */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => handleQuickTopic(topic.value)}
                disabled={loading}
                className={`px-3 py-1 rounded-full text-sm ${
                  loading ? 'bg-gray-300' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                } transition-colors`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          <div className="h-[500px] overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.from === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-green-200 shadow-sm text-gray-800'
                  }`}
                >
                  {/* Gunakan formatText untuk menangani tanda ** dan line breaks */}
                  {formatText(msg.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 p-3 rounded-lg text-sm text-gray-500 animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  <span className="ml-1">HealLink sedang memikirkan jawaban...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ceritain apa yang Anda rasakan..."
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              Kirim
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            *Disclaimer: HealLink hanya memberikan saran umum. Untuk diagnosis atau perawatan, konsultasikan dengan dokter atau tenaga medis terdekat.
          </p>
        </div>
      </div>
    </div>
  );
}