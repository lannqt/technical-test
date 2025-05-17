import { useDispatch } from "react-redux";
import { addUser } from "@/context/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import MainLayout from "@/components/layouts/MainLayout";
import { Mail, Phone, MapPin, User, Globe, Briefcase } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Phone number too short").optional(),
  website: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
  address: z.object({
    street: z.string().min(2, "Street too short"),
    suite: z.string().min(1, "Suite required"),
    city: z.string().min(2, "City too short"),
    zipcode: z.string().min(3, "Zip code too short"),
    geo: z.object({
      lat: z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid latitude"),
      lng: z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid longitude"),
    }).optional(),
  }),
  company: z.object({
    name: z.string().min(2, "Company name too short"),
    catchPhrase: z.string().min(5, "Catch phrase too short"),
    bs: z.string().min(5, "Business description too short"),
  }),
});

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: { lat: "", lng: "" }
      },
      company: {
        name: "",
        catchPhrase: "",
        bs: ""
      }
    }
  });

  const onSubmit = (values) => {
    try {
      dispatch(addUser({
        ...values,
        id: Date.now(),
        status: "active"
      }));
      toast.success("User added successfully");
      navigate("/users");
    } catch (error) {
      toast.error("Failed to add user");
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                <User className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Add New User</CardTitle>
                <CardDescription>Create a new user profile</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-medium text-sm">
                      <User className="h-4 w-4" />
                      Personal Information
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input placeholder="email@example.com" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input placeholder="+1 234 567 890" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input placeholder="https://example.com" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-medium text-sm">
                      <MapPin className="h-4 w-4" />
                      Address
                    </h3>

                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.suite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Suite/Apt</FormLabel>
                          <FormControl>
                            <Input placeholder="Apt 4B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.zipcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="address.geo.lat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input placeholder="40.7128" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address.geo.lng"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input placeholder="-74.0060" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="flex items-center gap-2 font-medium text-sm">
                      <Briefcase className="h-4 w-4" />
                      Company
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="company.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Inc" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company.catchPhrase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catch Phrase</FormLabel>
                            <FormControl>
                              <Input placeholder="Multi-layered client-server" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company.bs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business</FormLabel>
                            <FormControl>
                              <Input placeholder="Real-time e-markets" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/users")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add User
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}