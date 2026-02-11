import { Award, Heart, TreePine } from 'lucide-react';

export function TeamSection() {
  const team = [
    {
      name: 'Jakub',
      role: 'Hlavní vedoucí',
      description: 'Zakladatel kmene s 8 lety zkušeností s dětskými táborymi a outdoor aktivitami. Miluje přírodu a předává dětem lásku k dobrodružství.',
      badges: ['První pomoc', '8 let zkušeností', 'Instruktor outdooru'],
    },
    {
      name: 'Tereza',
      role: 'Vedoucí Malého kmene',
      description: 'Učitelka na základní škole, která věří v učení skrze zážitky. S menšími dětmi umí pracovat trpělivě a s láskou.',
      badges: ['První pomoc', 'Učitelka', '5 let s dětmi'],
    },
    {
      name: 'Martin',
      role: 'Vedoucí Velkého kmene',
      description: 'Outdoor nadšenec a horolezec. Děti učí zodpovědnosti, odvaze a respektu k přírodě vlastním příkladem.',
      badges: ['První pomoc', 'Horolezecký instruktor', '6 let zkušeností'],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Kdo děti vede
          </h2>
          <p className="text-xl text-stone-600">
            Zkušení vedoucí s láskou k přírodě a práci s dětmi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-stone-200 hover:border-amber-600 transition-all hover:shadow-lg"
            >
              {/* Avatar placeholder */}
              <div className="w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-white font-bold">
                  {member.name.charAt(0)}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-stone-900 text-center mb-1">
                {member.name}
              </h3>
              <p className="text-amber-700 text-center mb-4 font-medium">
                {member.role}
              </p>
              <p className="text-stone-700 leading-relaxed mb-6 text-center">
                {member.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 justify-center">
                {member.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium"
                  >
                    <Award className="w-3 h-3" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
