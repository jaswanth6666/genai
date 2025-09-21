'use client';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { ProfileFormData } from './types';

const SkillInput = ({
  value,
  onChange,
  label,
  placeholder,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  placeholder: string;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSkill();
            }
          }}
        />
        <Button type="button" onClick={handleAddSkill} variant="outline">
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        {value.map((skill) => (
          <Badge key={skill} variant="secondary" className="pl-3 pr-1">
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="ml-1 rounded-full p-0.5 hover:bg-destructive/20"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
       <FormMessage />
    </FormItem>
  );
};

export default function Step3_Skills() {
  const { control } = useFormContext<ProfileFormData>();
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="techSkills"
        render={({ field }) => (
          <SkillInput
            value={field.value}
            onChange={field.onChange}
            label="Technical Skills"
            placeholder="e.g., Python, Figma, etc."
          />
        )}
      />

      <FormField
        control={control}
        name="softSkills"
        render={({ field }) => (
          <SkillInput
            value={field.value}
            onChange={field.onChange}
            label="Soft Skills"
            placeholder="e.g., Public Speaking"
          />
        )}
      />

      <FormField
        control={control}
        name="hobbies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Interests & Hobbies</FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                placeholder="e.g., Playing cricket, coding personal projects, reading tech blogs, learning about stock markets..."
                {...field}
              />
            </FormControl>
            <FormDescription>
              What do you enjoy doing in your free time? Be descriptive.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
