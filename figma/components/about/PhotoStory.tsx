export function PhotoStory() {
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1624485276207-2ce1d4f04cd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Výprava do lesa',
    },
    {
      url: 'https://images.unsplash.com/photo-1576252951301-3b7b1e4278d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Orientace v terénu',
    },
    {
      url: 'https://images.unsplash.com/photo-1765530813405-d23f98fda0b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Táborový oheň',
    },
    {
      url: 'https://images.unsplash.com/photo-1767713885467-a927f4b55e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Cesta přírodou',
    },
    {
      url: 'https://images.unsplash.com/photo-1769526518601-1c6b3e4335c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Příroda kolem nás',
    },
    {
      url: 'https://images.unsplash.com/photo-1635278531368-a5865aa4675b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      caption: 'Společné chvíle',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Jak to vypadá na našich akcích
          </h2>
          <p className="text-xl text-stone-600">
            Skutečné momenty z našich výprav
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] bg-stone-200 rounded-xl overflow-hidden group"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-medium text-sm">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
