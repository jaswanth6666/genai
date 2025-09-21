'use client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ProfileFormData } from './types';

const industries = [
  'Information Technology', 'Healthcare', 'Finance', 'Education',
  'Engineering', 'Arts & Entertainment', 'Manufacturing', 'E-commerce & Retail'
];

export default function Step4_Goals() {
  const { control, watch } = useFormContext<ProfileFormData>();

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="font-semibold text-lg">Aptitude & Personality</h3>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3">
          <FormField
            control={control}
            name="logicalScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logical Reasoning: {field.value}%</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    max={100}
                    step={1}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="verbalScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verbal Ability: {field.value}%</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    max={100}
                    step={1}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="creativityScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creativity: {field.value}%</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    max={100}
                    step={1}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="personality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Career Personality Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Which best describes you?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Analytical">Analytical (Problem-solver, data-driven)</SelectItem>
                  <SelectItem value="Creative">Creative (Designer, innovator)</SelectItem>
                  <SelectItem value="Social">Social (Helper, team player)</SelectItem>
                  <SelectItem value="Enterprising">Enterprising (Leader, persuasive)</SelectItem>
                  <SelectItem value="Conventional">Conventional (Organizer, detail-oriented)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-lg">Career Goals</h3>
        <FormField
          control={control}
          name="shortTermGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short-Term Goals</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Secure a summer internship in data science, learn a new programming language..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="longTermGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long-Term Goals</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Become a product manager at a top tech company, start my own business..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="workStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Work Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What is your ideal work environment?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Office">In-Office</SelectItem>
                  <SelectItem value="Remote">Fully Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid (Mix of office and remote)</SelectItem>
                  <SelectItem value="Flexible">Flexible / Freelance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="industries"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Preferred Industries</FormLabel>
                <FormDescription>
                  Select all industries you are interested in.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((industry) => (
                <FormField
                  key={industry}
                  control={control}
                  name="industries"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={industry}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(industry)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, industry])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== industry
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {industry}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
