import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Contact */}
          <div>
            <h3 className="font-serif text-xl mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                +221 77 123 45 67
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                contact@mjeffect.sn
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent mt-1" />
                Dakar, Sénégal
                <br />
                Plateau, Rue Carnot
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Liens */}
          <div>
            <h3 className="font-serif text-xl mb-6">Liens Utiles</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/a-propos" className="relative transition-colors hover:text-accent after:absolute after:block after:w-full after:h-[1px] after:bg-luxury-accent after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 after:origin-left">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="relative transition-colors hover:text-accent after:absolute after:block after:w-full after:h-[1px] after:bg-luxury-accent after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 after:origin-left">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="relative transition-colors hover:text-accent after:absolute after:block after:w-full after:h-[1px] after:bg-luxury-accent after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 after:origin-left">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite" className="relative transition-colors hover:text-accent after:absolute after:block after:w-full after:h-[1px] after:bg-luxury-accent after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 after:origin-left">
                  Politique de Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-xl mb-6">Newsletter</h3>
            <p className="text-sm text-white/70 mb-4">
              Inscrivez-vous pour recevoir nos offres exclusives et nouveautés.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-white/10 border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <button className="bg-accent text-accent-foreground px-4 py-3 text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors">
                S'inscrire
              </button>
            </form>
          </div>

          {/* Paiement */}
          <div>
            <h3 className="font-serif text-xl mb-6">Paiement Sécurisé</h3>
            <p className="text-sm text-white/70 mb-4">Nous acceptons plusieurs modes de paiement pour votre confort.</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/10 p-3 flex items-center justify-center">
                <span className="text-xs font-bold">VISA</span>
              </div>
              <div className="bg-white/10 p-3 flex items-center justify-center">
                <span className="text-xs font-bold">MC</span>
              </div>
              <div className="bg-white/10 p-3 flex items-center justify-center">
                <span className="text-xs font-bold">OM</span>
              </div>
              <div className="bg-white/10 p-3 flex items-center justify-center">
                <span className="text-xs font-bold">WAVE</span>
              </div>
              <div className="bg-white/10 p-3 flex items-center justify-center">
                <span className="text-xs font-bold">FREE</span>
              </div>
              <div className="bg-white/10 p-3 flex items-center justify-center">
                <span className="text-xs font-bold">COD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/50">
          <p>© 2025 MJ EFFECT. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
