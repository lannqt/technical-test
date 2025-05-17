// src/pages/users/ShowUser.jsx
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, User, Globe, Briefcase, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShowUser() {
  const { id } = useParams();
  const users = useSelector((state) => state.users.list);
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">User Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The requested user could not be found.
            </p>
            <Button asChild>
              <Link to="/users">Back to Users</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 border-b">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="capitalize">
                      @{user.username}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button asChild variant="outline">
                <Link to={`/users/edit/${user.id}`} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                Personal Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p>@{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{user.phone || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p>{user.website || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                Address
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Street</p>
                  <p>{user.address?.street || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Suite</p>
                  <p>{user.address?.suite || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p>{user.address?.city || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Zip Code</p>
                  <p>{user.address?.zipcode || "Not provided"}</p>
                </div>
                {user.address?.geo && (
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>
                      {user.address.geo.lat}, {user.address.geo.lng}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {user.company && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                  Company
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p>{user.company.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Catch Phrase</p>
                    <p>{user.company.catchPhrase}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Business</p>
                    <p>{user.company.bs}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t px-6 py-4 bg-gray-50 dark:bg-gray-800 flex justify-end">
            <Button asChild variant="outline">
              <Link to="/users">Back to Users</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function ShowUserLoading() {
  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
          {/* Header Loading */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          {/* Content Loading */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}