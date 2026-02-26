import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'es' as const, label: 'ES', fullName: 'Español' },
    { code: 'en' as const, label: 'EN', fullName: 'English' },
    { code: 'pt' as const, label: 'PT', fullName: 'Português' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm transition-colors hover:border-[#D4AF37] hover:bg-white/10">
        <Globe className="h-4 w-4" />
        <span className="font-medium">{language.toUpperCase()}</span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 hidden min-w-[140px] rounded-sm border border-white/10 bg-black py-1 shadow-xl group-hover:block">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
              language === lang.code ? 'text-[#D4AF37]' : 'text-white'
            }`}
          >
            <span className="font-medium">{lang.label}</span> - {lang.fullName}
          </button>
        ))}
      </div>
    </div>
  );
}