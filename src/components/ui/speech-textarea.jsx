import { useState } from 'react';
import { Mic } from 'lucide-react';
import { Button } from './button';
import { Textarea } from './textarea';
import { toast } from 'sonner';

export function SpeechTextarea({ 
  name, 
  value,
  defaultValue, 
  onChange, 
  required,
  className
}) {
  const [isListening, setIsListening] = useState(false);

  const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const simulatedEvent = {
          target: {
            value: transcript
          }
        };
        onChange(simulatedEvent);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        toast('Error occurred in speech recognition', {
          style: { background: '#ff4444', color: 'white' }
        });
      };

      recognition.start();
    } else {
      toast('Speech recognition is not supported in this browser', {
        style: { background: '#ff4444', color: 'white' }
      });
    }
  };

  return (
    <div className="relative group">
      <Textarea
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        className={`transition-all duration-200 ${className} ${
          isListening ? 'border-primary shadow-[0_0_15px_rgba(0,0,0,0.1)]' : ''
        }`}
      />
      <Button
        size="icon"
        variant="ghost"
        type="button"
        className={`absolute right-2 top-2 h-8 w-8 transition-all duration-300 hover:scale-110 
          ${isListening ? 
            'text-primary animate-pulse shadow-lg ring-2 ring-primary/50' : 
            'opacity-70 group-hover:opacity-100'
          }`}
        onClick={startSpeechRecognition}
      >
        <Mic className={`h-4 w-4 transition-transform duration-300 ${
          isListening ? 'scale-110' : 'scale-100'
        }`} />
      </Button>
    </div>
  );
}