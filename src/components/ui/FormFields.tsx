import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label}
        {props.required && (
          <span className="text-gold-dark ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        className={cn(
          "w-full rounded-lg border border-border bg-white px-4 py-3 text-navy placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className,
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  id: string;
}

export function Textarea({
  label,
  error,
  id,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label}
        {props.required && (
          <span className="text-gold-dark ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        className={cn(
          "w-full rounded-lg border border-border bg-white px-4 py-3 text-navy placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 min-h-[120px] resize-y",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className,
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  id: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  id,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label}
        {props.required && (
          <span className="text-gold-dark ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <select
        id={id}
        className={cn(
          "w-full rounded-lg border border-border bg-white px-4 py-3 text-navy transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className,
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface CheckboxGroupProps {
  legend: string;
  name: string;
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

export function CheckboxGroup({
  legend,
  name,
  options,
  values,
  onChange,
  error,
}: CheckboxGroupProps) {
  const handleChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...values, option]);
    } else {
      onChange(values.filter((v) => v !== option));
    }
  };

  return (
    <fieldset className="space-y-3">
      <legend className="block text-sm font-medium text-navy">{legend}</legend>
      <div className="space-y-2">
        {options.map((option) => {
          const id = `${name}-${option.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <label
              key={option}
              htmlFor={id}
              className="flex items-start gap-3 cursor-pointer rounded-lg border border-border p-3 hover:bg-surface transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold/5"
            >
              <input
                type="checkbox"
                id={id}
                name={name}
                value={option}
                checked={values.includes(option)}
                onChange={(e) => handleChange(option, e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border text-gold focus:ring-gold/20"
              />
              <span className="text-sm text-navy">{option}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

interface RadioGroupProps {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
}: RadioGroupProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="block text-sm font-medium text-navy">{legend}</legend>
      <div className="space-y-2">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className="flex items-start gap-3 cursor-pointer rounded-lg border border-border p-3 hover:bg-surface transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold/5"
            >
              <input
                type="radio"
                id={id}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-0.5 h-4 w-4 border-border text-gold focus:ring-gold/20"
              />
              <span className="text-sm text-navy">{option.label}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
