import React from 'react';
import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  symbol: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', symbol: 'Aa' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', symbol: 'अ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', symbol: 'அ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', symbol: 'অ' },
];

interface LanguageSelectorProps {
  currentLanguage?: string;
  onLanguageChange?: (languageCode: string) => void;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage = 'en',
  onLanguageChange,
  compact = false,
}) => {
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={compact ? "sm" : "default"}
          className="flex items-center gap-2 hover:bg-accent/50 transition-colors"
        >
          <Languages className="w-4 h-4" />
          {!compact && (
            <span className="font-medium text-sm">{currentLang.symbol}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 glass-panel border border-glass-border">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange?.(language.code)}
            className={`flex items-center justify-between cursor-pointer hover:bg-accent/50 ${
              currentLanguage === language.code ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-lg">{language.symbol}</span>
              <div>
                <div className="font-medium">{language.name}</div>
                <div className="text-xs text-muted-foreground">{language.nativeName}</div>
              </div>
            </div>
            {currentLanguage === language.code && (
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};