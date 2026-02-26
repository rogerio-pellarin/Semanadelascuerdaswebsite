import { AlertCircle, RefreshCw } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

type Language = 'es' | 'en' | 'pt';

interface LanguageTab {
  code: Language;
  label: string;
  flag: string;
}

interface CMSEditorProps {
  title: string;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  onSave: () => void;
  saving: boolean;
  message: string;
  children: React.ReactNode;
  onReinitialize: () => void;
  reinitializing: boolean;
}

export const languages: LanguageTab[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
];

export function CMSEditor({
  title,
  currentLang,
  onLangChange,
  onSave,
  saving,
  message,
  children,
  onReinitialize,
  reinitializing,
}: CMSEditorProps) {
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <AdminSidebar onReinitialize={onReinitialize} reinitializing={reinitializing} />

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl">{title}</h1>
                <button
                  onClick={onSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-6 py-2 text-black transition-colors hover:bg-[#C5A028] disabled:opacity-50"
                >
                  {saving ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>

              {/* Language Tabs */}
              <div className="flex gap-2 border-b border-white/10 pb-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLangChange(lang.code)}
                    className={`flex items-center gap-2 rounded-t-sm px-4 py-2 transition-colors ${
                      currentLang === lang.code
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                    {currentLang === lang.code && <AlertCircle className="h-4 w-4" />}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-sm text-white/60">
                Editando contenido en:{' '}
                <span className="text-[#D4AF37]">
                  {languages.find((l) => l.code === currentLang)?.label}
                </span>
              </p>
            </div>

            {message && (
              <div
                className={`mb-6 rounded-sm p-4 ${
                  message.startsWith('✓')
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {message}
              </div>
            )}

            {children}

            {/* Save Button at Bottom */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={onSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-8 py-3 text-black transition-colors hover:bg-[#C5A028] disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function CMSSection({ title, children }: SectionProps) {
  return (
    <section className="mb-8 rounded-sm border border-white/10 bg-white/5 p-6">
      <h2 className="mb-4 text-xl text-[#D4AF37]">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string | number | boolean;
  onChange: (value: any) => void;
  type?: 'text' | 'textarea' | 'number' | 'checkbox';
  rows?: number;
}

export function CMSField({ label, value, onChange, type = 'text', rows = 2 }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/60">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
        />
      ) : type === 'checkbox' ? (
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 rounded-sm border border-white/10 bg-black text-[#D4AF37]"
        />
      ) : type === 'number' ? (
        <input
          type="number"
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
        />
      ) : (
        <input
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-sm border border-white/10 bg-black px-4 py-2 text-white"
        />
      )}
    </div>
  );
}