"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=60",
    alt: "Seedling being planted",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=800&q=60",
    alt: "Forest canopy",
  },
  {
    src: "https://images.unsplash.com/photo-1535909339361-9b83b26655f1?auto=format&fit=crop&w=800&q=60",
    alt: "Community planting",
  },
  {
    src: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=60",
    alt: "Forest path",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    alt: "Sunlight through trees",
  },
  {
    src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60",
    alt: "Young tree leaves",
  },
];

export default function ImpactGallery() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-green-50/40 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Growing Impact in Pictures
          </h2>
          <p className="text-gray-600 text-lg">
            Glimpses from recent planting activities, community involvement and
            the landscapes we're restoring.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 auto-rows-[110px] md:auto-rows-[140px] gap-3 md:gap-4">
          {photos.map((p, i) => (
            <motion.div
              key={p.src}
              className={`relative overflow-hidden rounded-xl shadow-sm ring-1 ring-gray-200/60 bg-gray-100 group ${
                p.span ?? ""
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-1.5 left-2 text-[10px] font-medium tracking-wide text-white/90">
                {p.alt}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
