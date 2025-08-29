import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  degree: z.string().min(1, "Please select a degree"),
  year: z.string().min(1, "Please select a year"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  sector: z.string().min(1, "Please select a sector"),
  stream: z.string().min(1, "Please select a stream"),
});

type FormData = z.infer<typeof formSchema>;

export const InternshipForm = () => {
  const { toast } = useToast();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Generate year options (past 50 years + next 5 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear - 50; year <= currentYear + 5; year++) {
    yearOptions.push(year.toString());
  }

  const degreeOptions = [
    "Bachelor of Technology (B.Tech)",
    "Bachelor of Engineering (B.E.)",
    "Bachelor of Computer Applications (BCA)",
    "Bachelor of Science (B.Sc)",
    "Bachelor of Commerce (B.Com)",
    "Bachelor of Arts (B.A)",
    "Master of Technology (M.Tech)",
    "Master of Business Administration (MBA)",
    "Master of Computer Applications (MCA)",
    "Master of Science (M.Sc)",
  ];

  const skillOptions = [
    "JavaScript", "Python", "Java", "React", "Node.js", "HTML/CSS",
    "Data Analysis", "Machine Learning", "Digital Marketing", "Content Writing",
    "Graphic Design", "Project Management", "Communication", "Leadership",
    "Problem Solving", "Team Collaboration", "Time Management", "Research",
  ];

  const sectorOptions = [
    "Information Technology",
    "Finance & Banking",
    "Healthcare",
    "Manufacturing",
    "Education",
    "E-commerce",
    "Government",
    "Non-Profit",
    "Consulting",
    "Media & Entertainment",
  ];

  const streamOptions = [
    "Computer Science",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Business Administration",
    "Commerce",
    "Arts & Humanities",
    "Science",
    "Other",
  ];

  const handleSkillChange = (skill: string, checked: boolean) => {
    let updatedSkills;
    if (checked) {
      updatedSkills = [...selectedSkills, skill];
    } else {
      updatedSkills = selectedSkills.filter(s => s !== skill);
    }
    setSelectedSkills(updatedSkills);
    setValue("skills", updatedSkills);
  };

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Replace with actual backend API call
      console.log("Form submission data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Application Submitted Successfully!",
        description: "Your internship application has been submitted for review.",
      });
      
      // TODO: Handle successful submission (redirect, clear form, etc.)
      
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Internship Application Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your full name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Degree Field */}
          <div className="space-y-2">
            <Label htmlFor="degree">Degree *</Label>
            <Select onValueChange={(value) => setValue("degree", value)}>
              <SelectTrigger className={errors.degree ? "border-destructive" : ""}>
                <SelectValue placeholder="Select your degree" />
              </SelectTrigger>
              <SelectContent>
                {degreeOptions.map((degree) => (
                  <SelectItem key={degree} value={degree}>
                    {degree}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.degree && (
              <p className="text-sm text-destructive">{errors.degree.message}</p>
            )}
          </div>

          {/* Year Field */}
          <div className="space-y-2">
            <Label htmlFor="year">Graduation Year *</Label>
            <Select onValueChange={(value) => setValue("year", value)}>
              <SelectTrigger className={errors.year ? "border-destructive" : ""}>
                <SelectValue placeholder="Select graduation year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.year && (
              <p className="text-sm text-destructive">{errors.year.message}</p>
            )}
          </div>

          {/* Skills Field */}
          <div className="space-y-2">
            <Label>Skills * (Select multiple)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-border rounded-md">
              {skillOptions.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={(checked) => 
                      handleSkillChange(skill, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={skill}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
            {errors.skills && (
              <p className="text-sm text-destructive">{errors.skills.message}</p>
            )}
          </div>

          {/* Sector Field */}
          <div className="space-y-2">
            <Label htmlFor="sector">Preferred Sector *</Label>
            <Select onValueChange={(value) => setValue("sector", value)}>
              <SelectTrigger className={errors.sector ? "border-destructive" : ""}>
                <SelectValue placeholder="Select preferred sector" />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.sector && (
              <p className="text-sm text-destructive">{errors.sector.message}</p>
            )}
          </div>

          {/* Stream Field */}
          <div className="space-y-2">
            <Label htmlFor="stream">Stream *</Label>
            <Select onValueChange={(value) => setValue("stream", value)}>
              <SelectTrigger className={errors.stream ? "border-destructive" : ""}>
                <SelectValue placeholder="Select your stream" />
              </SelectTrigger>
              <SelectContent>
                {streamOptions.map((stream) => (
                  <SelectItem key={stream} value={stream}>
                    {stream}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.stream && (
              <p className="text-sm text-destructive">{errors.stream.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};