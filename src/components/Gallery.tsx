const photos = [
  {
    url: "https://images.unsplash.com/photo-1624485276207-2ce1d4f04cd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwaGFuZHMlMjBuYXR1cmUlMjBleHBsb3JhdGlvbnxlbnwxfHx8fDE3NzA4MTQ0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Poznávání přírody",
  },
  {
    url: "https://images.unsplash.com/photo-1576252951301-3b7b1e4278d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJhY2twYWNrJTIwaGlraW5nJTIwdHJhaWx8ZW58MXx8fHwxNzcwODE0NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Výprava do přírody",
  },
  {
    url: "https://images.unsplash.com/photo-1765530813405-d23f98fda0b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwYWR2ZW50dXJlJTIwZ2VhciUyMG5hdHVyZXxlbnwxfHx8fDE3NzA4MTQ0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Outdoor vybavení",
  },
  {
    url: "https://images.unsplash.com/photo-1767713885467-a927f4b55e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmFpbCUyMG91dGRvb3IlMjBhY3Rpdml0eXxlbnwxfHx8fDE3NzA4MTQ0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Lesní stezka",
  },
  {
    url: "https://images.unsplash.com/photo-1769526518601-1c6b3e4335c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBleHBsb3JhdGlvbiUyMG91dGRvb3IlMjBjYW1wfGVufDF8fHx8MTc3MDgxNDQ2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Táboření v přírodě",
  },
  {
    url: "https://images.unsplash.com/photo-1635278531368-a5865aa4675b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNhbXBmaXJlJTIwb3V0ZG9vciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NzA4MTQ0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Dobrodružství u ohně",
  },
];

export function Gallery() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Takto vypadají naše výpravy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="aspect-[4/3] bg-stone-200 rounded-xl overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
