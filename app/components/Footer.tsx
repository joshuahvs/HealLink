// app/components/Footer.tsx
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">HealLink</h3>
          <p className="text-gray">
            Menghubungkan donatur, relawan, dan masyarakat untuk akses kesehatan yang lebih baik di daerah terpencil.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Tautan Cepat</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-gray hover:text-white">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-gray hover:text-white">
                Proyek
              </Link>
            </li>
            <li>
              <Link href="/impact" className="text-gray hover:text-white">
                Dampak
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Bergabung</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/donation" className="text-gray hover:text-white">
                Donasi
              </Link>
            </li>
            <li>
              <Link href="/volunteer" className="text-gray hover:text-white">
                Jadi Relawan
              </Link>
            </li>
            <li>
              <Link href="/partner" className="text-gray hover:text-white">
                Kemitraan
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Kontak</h4>
          <ul className="space-y-2">
            <li className="text-gray">info@heallink.id</li>
            <li className="text-gray">+62 881-0258-21773</li>
            <li className="text-gray">
              <a
                href="https://wa.me/62881025821773"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-white"
              >
                WhatsApp: 0881-0258-21773
              </a>
            </li>
            <li className="text-gray">Jl. Kesehatan No. 123, Jakarta</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray hover:text-white">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray hover:text-white">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray hover:text-white">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray text-center">
        <p className="text-gray">© {new Date().getFullYear()} HealLink. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
}