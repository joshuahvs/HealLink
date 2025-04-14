// pages/blog.tsx
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'Klinik Keliling: Membawa Harapan ke Pelosok',
      excerpt:
        'Kisah perjalanan klinik keliling HealLink di Nusa Tenggara Timur, membantu ratusan warga mendapatkan layanan kesehatan gratis.',
      image: '/api/placeholder/600/400',
      date: '10 April 2025',
      slug: 'klinik-keliling-ntt',
    },
    {
      id: 2,
      title: 'Gotong Royong Digital: Kekuatan Crowdfunding Kesehatan',
      excerpt:
        'Bagaimana donasi kecil dari ribuan orang melalui platform HealLink mengubah hidup masyarakat di daerah terpencil.',
      image: '/api/placeholder/600/400',
      date: '5 April 2025',
      slug: 'gotong-royong-crowdfunding',
    },
    {
      id: 3,
      title: 'Relawan Medis: Pahlawan Tanpa Tanda Jasa',
      excerpt:
        'Cerita inspiratif para relawan HealLink yang rela meninggalkan kenyamanan demi melayani masyarakat pedalaman.',
      image: '/api/placeholder/600/400',
      date: '1 April 2025',
      slug: 'relawan-medis',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-section">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog HealLink</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Temukan kisah inspiratif, pembaruan proyek, dan wawasan tentang pemerataan kesehatan di Indonesia.
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-gray-500 text-sm">{post.date}</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`}>
                  <button className="text-blue-600 hover:text-blue-800 font-semibold">
                    Baca Selengkapnya
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ingin Berkontribusi?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Dukung misi kami dengan berdonasi, menjadi relawan, atau bergabung sebagai mitra untuk kesehatan yang lebih
            merata.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100">
                Daftar Sekarang
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 border border-white text-white rounded-md hover:bg-blue-700">
                Hubungi Kami
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}