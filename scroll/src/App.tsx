/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const PRODUCTS = [
  {
    id: "tordid",
    title: "Tordid",
    description: "Sünnipäevad, pulmad, tähistamised — räägi mulle oma sündmusest ja ma loon tordi, mis teeb selle päeva veelgi erilisemaks.",
    image: "https://picsum.photos/seed/cake-1/800/1000",
    smallImage: "https://picsum.photos/seed/cake-small-1/400/400"
  },
  {
    id: "koogid",
    title: "Koogid & küpsetised",
    description: "Värsked koogid, pirukad ja saiakesed, mis on valminud parimast toorainest. Ideaalne kaaslane sinu hommikukohvi kõrvale.",
    image: "https://picsum.photos/seed/pastry-1/800/1000",
    smallImage: "https://picsum.photos/seed/pastry-small-1/400/400"
  },
  {
    id: "erisoovid",
    title: "Erisoovid",
    description: "Kas sul on eriline dieet või soovid midagi täiesti unikaalset? Oleme valmis katsetama ja looma just sulle sobiva maitseelamuse.",
    image: "https://picsum.photos/seed/special-1/800/1000",
    smallImage: "https://picsum.photos/seed/special-small-1/400/400"
  }
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * PRODUCTS.length),
        PRODUCTS.length - 1
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full z-50">
        <div className="text-2xl font-semibold tracking-tight text-olive">
          Pagarikoja Lood
        </div>
        <div className="hidden md:flex gap-8 font-sans text-sm uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-olive transition-colors">Tooted</a>
          <a href="#" className="hover:text-olive transition-colors">Meie lugu</a>
          <a href="#" className="hover:text-olive transition-colors">Kontakt</a>
        </div>
        <button className="p-2 hover:bg-olive/10 rounded-full transition-colors">
          <ShoppingBag size={20} />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-12 md:py-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-olive font-semibold">
                Käsitööna valminud soojus
              </span>
              <h1 className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tight">
                Värske leib, <br />
                <span className="italic font-medium">iga hommik.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-md leading-relaxed">
                Meie pagariäris usume, et parimad asjad elus on lihtsad. Kasutame vaid kohalikku toorainet ja traditsioonilisi meetodeid.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-olive hover:bg-olive-dark text-white px-8 py-4 rounded-full font-sans text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all group">
                Vaata valikut
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-olive/20 hover:border-olive text-olive px-8 py-4 rounded-full font-sans text-sm font-medium tracking-wide transition-all">
                Meie lugu
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="absolute inset-0 bg-olive/5 rounded-[32px] -rotate-3 translate-x-4 translate-y-4" />
            <img 
              src="https://picsum.photos/seed/bakery-bread/800/1066" 
              alt="Värske käsitööleib" 
              className="relative w-full h-full object-cover rounded-[32px] shadow-2xl shadow-olive/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Products Section (Sticky Scroll) */}
      <section ref={containerRef} className="relative h-[300vh] bg-cream">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-12">
              <div className="space-y-2">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-olive/60 font-semibold">
                  Mida ma küpsetan
                </span>
                <div className="flex flex-col gap-2">
                  {PRODUCTS.map((product, index) => (
                    <motion.h2 
                      key={product.id}
                      animate={{ 
                        opacity: activeIndex === index ? 1 : 0.2,
                        x: activeIndex === index ? 0 : -10
                      }}
                      className="text-5xl md:text-7xl font-light cursor-default"
                    >
                      {product.title}
                    </motion.h2>
                  ))}
                </div>
              </div>

              <div className="space-y-6 max-w-md">
                <div className="wavy-line" />
                <motion.p 
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  {PRODUCTS[activeIndex].description}
                </motion.p>
              </div>
            </div>

            {/* Right Visuals */}
            <div className="relative flex justify-center items-center h-full py-12">
              {/* Small Floating Image */}
              <motion.div 
                key={`small-${activeIndex}`}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute top-0 left-1/4 w-32 h-32 z-20"
              >
                <img 
                  src={PRODUCTS[activeIndex].smallImage} 
                  alt="Detail" 
                  className="w-full h-full object-cover rounded-2xl shadow-lg border-4 border-cream"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Main Arched Image */}
              <div className="relative w-full max-w-md aspect-[4/5] z-10">
                <motion.div
                  key={`main-${activeIndex}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full arch-mask overflow-hidden shadow-2xl"
                >
                  <img 
                    src={PRODUCTS[activeIndex].image} 
                    alt={PRODUCTS[activeIndex].title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                {/* Decorative background arch */}
                <div className="absolute inset-0 arch-mask bg-olive/5 -translate-x-4 translate-y-4 -z-10" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About the Baker Section */}
      <section className="py-24 md:py-32 px-6 bg-warm-bg overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Image Side */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <div className="absolute -inset-4 border border-olive/10 rounded-[40px] -z-10 translate-x-2 translate-y-2" />
                <img 
                  src="https://picsum.photos/seed/baker-hands/800/1000" 
                  alt="Pagari käed töös" 
                  className="w-full aspect-[4/5] object-cover rounded-[40px] shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              {/* Floating detail image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-12 -right-12 w-48 h-48 hidden md:block z-20"
              >
                <img 
                  src="https://picsum.photos/seed/flour-detail/400/400" 
                  alt="Jahu detail" 
                  className="w-full h-full object-cover rounded-full border-8 border-warm-bg shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Text Side */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-sans text-xs uppercase tracking-[0.3em] text-olive font-semibold block"
                >
                  Meie lugu & filosoofia
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-light leading-tight"
                >
                  Karin ja tema <br />
                  <span className="italic font-medium">armastus taigna vastu.</span>
                </motion.h2>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium text-olive">Kes ma olen?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Olen Karin, eluaegne küpsetaja ja Pagarikoja Lood asutaja. Minu teekond algas vanaema köögist, kus õppisin, et parim leib sünnib kannatlikkusest ja soojadest kätest.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium text-olive">Kuidas ma teen?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Kasutan ainult puhast ja kohalikku toorainet. Minu juuretis on elanud juba kümme aastat ning iga saiake valmib aeglase kergitamise meetodil, et tagada sügav maitse ja tervislikkus.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="pt-6"
              >
                <div className="inline-flex items-center gap-6 p-6 bg-olive/5 rounded-2xl border border-olive/10">
                  <div className="text-4xl font-serif italic text-olive">10+</div>
                  <div className="font-sans text-[10px] uppercase tracking-widest leading-tight text-gray-500">
                    Aastat kogemust <br /> käsitööna küpsetamisel
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Final Call to Action / Visit Us */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl md:text-5xl italic mb-8">Tule meile külla</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Meie uksed on avatud kõigile, kes hindavad ehedat maitset. Ootame sind igal tööpäeval kella seitsmest hommikul, et pakkuda sulle päeva esimest sooja saia.
          </p>
          <div className="mt-12 font-sans text-sm tracking-[0.2em] uppercase text-olive font-bold">
            Tallinn, Vanalinn &bull; E-R 07:00 - 18:00
          </div>
        </motion.div>
      </section>

      <footer className="p-12 border-t border-olive/10 text-center font-sans text-xs uppercase tracking-widest text-olive/60">
        &copy; 2026 Pagarikoja Lood. Kõik õigused kaitstud.
      </footer>
    </div>
  );
}

