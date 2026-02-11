import { Users, Calendar, Award, MapPin } from "lucide-react";

const features = [
  { icon: Users, text: "Pro děti" },
  { icon: Calendar, text: "Každý týden venku" },
  { icon: Award, text: "Zkušení vedoucí" },
  { icon: MapPin, text: "Choltice a okolí" },
];

export function TrustBar() {
  return (
    <section className="bg-white py-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-blue-950" />
                </div>
              </div>
              <p className="text-stone-700">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
