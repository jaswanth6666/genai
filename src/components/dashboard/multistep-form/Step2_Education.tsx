'use client';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProfileFormData } from './types';

export default function Step2_Education() {
  const { control, watch } = useFormContext<ProfileFormData>();
  const educationLevel = watch('education');
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Highest Education Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Class 10">Class 10</SelectItem>
                  <SelectItem value="Class 12">Class 12</SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Bachelors Degree">Bachelor's Degree</SelectItem>
                  <SelectItem value="Masters Degree">Master's Degree</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {(educationLevel === 'Class 12' ||
          educationLevel === 'Diploma' ||
          educationLevel === "Bachelor's Degree") && (
          <FormField
            control={control}
            name="stream"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic Stream</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your academic stream" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Commerce">Commerce</SelectItem>
                    <SelectItem value="Arts/Humanities">Arts/Humanities</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={control}
          name="board"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board / University</FormLabel>
              <FormControl>
                <Input placeholder="e.g. CBSE, Mumbai University" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="grades"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grades / CGPA</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 85% or 8.5 CGPA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="learningStyle"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Preferred Learning Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="How do you learn best?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Visual">Visual (seeing)</SelectItem>
                  <SelectItem value="Auditory">Auditory (hearing)</SelectItem>
                  <SelectItem value="Kinaesthetic">Kinaesthetic (doing)</SelectItem>
                  <SelectItem value="Reading/Writing">Reading/Writing</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
