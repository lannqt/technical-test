// src/pages/Dashboard.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '@/context/userSlice';
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Mail, Phone, Globe, MapPin, Briefcase, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { list: users, status, error } = useSelector((state) => state.users);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [dispatch, status]);

    const handleRefresh = () => {
        dispatch(fetchUsers());
    };

    if (status === 'loading') {
        return (
            <MainLayout>
                <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="h-4 w-[150px]" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex items-center space-x-4">
                                        <Skeleton className="h-4 w-4 rounded-full" />
                                        <Skeleton className="h-4 w-[180px]" />
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-10 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </MainLayout>
        );
    }

    if (status === 'failed') {
        return (
            <MainLayout>
                <div className="p-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Error Loading Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-red-500">{error}</p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleRefresh}>Retry</Button>
                        </CardFooter>
                    </Card>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">User Dashboard</h1>
                        <p className="text-muted-foreground">
                            Overview of all users from JSONPlaceholder API
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={handleRefresh}>
                            <Activity className="mr-2 h-4 w-4" />
                            Refresh Data
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Users
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{users.length}</div>
                            <p className="text-xs text-muted-foreground">
                                From JSONPlaceholder API
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Companies
                            </CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Set(users.map(user => user.company.name)).size}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Unique companies
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Cities
                            </CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Set(users.map(user => user.address.city)).size}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Different locations
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Websites
                            </CardTitle>
                            <Globe className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {users.filter(user => user.website).length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                With websites listed
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <Card key={user.id}>
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback >
                                            {user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>{user.name}</CardTitle>
                                        <CardDescription>@{user.username}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center space-x-4">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm">{user.email}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm">{user.phone}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm">{user.website}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm">{user.company.name}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Badge variant="outline">{user.address.city}</Badge>
                                <Button asChild className="bg-black text-white hover:bg-gray-800" size="sm">
                                    <Link to={`/users/show/${user.id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}