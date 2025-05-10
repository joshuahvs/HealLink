import Link from 'next/link';

export default function SubscriptionPage() {
  const subscriptionPlans = [
    {
      name: "Sahabat Sehat",
      price: 50000,
      frequency: "MONTHLY",
      benefits: [
        "Laporan bulanan singkat",
        "Nama di website HealLink"
      ]
    },
    {
      name: "Pahlawan Daerah",
      price: 150000,
      frequency: "MONTHLY",
      benefits: [
        "Laporan bulanan detail via email/dashboard",
        "Sertifikat Donatur Aktif",
        "Nama tercantum di Wall of Gratitude",
        "Akses eksklusif ke HealLink Journal",
        "Undangan acara khusus"
      ],
      popular: true
    },
    {
      name: "Champion of Health",
      price: 300000,
      frequency: "MONTHLY",
      benefits: [
        "Semua benefit Pahlawan Daerah",
        "Merchandise premium eksklusif",
        "Pilihan Sponsor Pasien",
        "Prioritas undangan event offline",
        "Potensi pengurangan pajak"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Berlangganan HealLink</h1>
        <p className="text-lg text-gray-600 mb-2">
          Jadilah bagian dari perubahan nyata untuk kesehatan masyarakat daerah
        </p>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Dengan berlangganan HealLink, Anda tidak hanya memberikan donasi tetapi juga membangun
          hubungan langsung dengan dampak yang Anda ciptakan. Lihat bagaimana kontribusi Anda
          mengubah kehidupan masyarakat di daerah terpencil.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-6 shadow-sm flex flex-col ${
              plan.popular ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full mb-4 self-start">
                Paling Populer
              </div>
            )}

            <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
            <p className="text-gray-500 mb-4">
              Rp{plan.price.toLocaleString('id-ID')}/bulan
            </p>

            <ul className="text-sm text-gray-700 flex-grow space-y-2 mb-4">
              {plan.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href={`/subscription/payment?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&frequency=${plan.frequency}`}
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
            >
              Pilih Paket
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Manfaat Berlangganan HealLink</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Untuk Anda</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>Laporan dampak personal yang detail dan terukur</li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>Pengakuan sebagai kontributor aktif</li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>Akses ke konten eksklusif tentang kesehatan masyarakat</li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>Merchandise eksklusif yang menunjukkan komitmen Anda</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Untuk Masyarakat</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>Pendanaan berkelanjutan untuk layanan kesehatan daerah</li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>Peningkatan kualitas hidup masyarakat di daerah terpencil</li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>Akses kesehatan yang lebih merata</li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>Edukasi kesehatan untuk masyarakat daerah</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
