import MainLayout from "@/components/layouts/MainLayout";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "@/context/userSlice";
import { Link } from "react-router-dom";
import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Search, X, Phone, MapPin, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { list: users, status, error } = useSelector((state) => state.users);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, users.length]);

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-1 sm:px-4"
        >
          Name
          <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium">
              {row.original.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm sm:text-base">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: () => <span className="hidden sm:inline">Email</span>,
      cell: ({ row }) => (
        <div className="hidden sm:flex items-center gap-1">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>{row.getValue("email")}</span>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => <span className="hidden sm:inline">Phone</span>,
      cell: ({ row }) => (
        <div className="hidden sm:flex items-center gap-1">
          <Phone className="h-4 w-4 text-gray-500" />
          <span>{row.getValue("phone")}</span>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: () => <span className="hidden sm:inline">Address</span>,
      cell: ({ row }) => {
        const address = row.original.address;
        const fullAddress = `${address.street}, ${address.city}`;
        return (
          <div className="hidden sm:flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="truncate max-w-[150px]">{fullAddress}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to={`/users/edit/${user.id}`} className="cursor-pointer">
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/users/show/${user.id}`} className="cursor-pointer">
                  Detail
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this user?")) {
                    dispatch(deleteUser(user.id));
                  }
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const mobileColumns = [
    {
      accessorKey: "name",
      header: "Users",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Mail className="h-3 w-3" />
                  <span className="truncate max-w-[150px]">{user.email}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "",
      cell: () => null,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to={`/users/edit/${user.id}`} className="cursor-pointer">
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this user?")) {
                    dispatch(deleteUser(user.id));
                  }
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns: isMobile ? mobileColumns : columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (status === "loading") {
    return (
      <MainLayout>
        <div className="space-y-4 p-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (status === "failed") {
    return (
      <MainLayout>
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md m-4">
          <h3 className="font-medium">Error loading users</h3>
          <p className="text-sm">{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-4 p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">User Management</h1>
          <Link to="/addUsers" className="w-full md:w-auto">
            <Button className="w-full md:w-auto">
              Add User
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 py-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search email..."
              value={(table.getColumn("email")?.getFilterValue() ?? "")}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="pl-10"
            />
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={(table.getColumn("name")?.getFilterValue() ?? "")}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              table.resetColumnFilters();
            }}
            className="shrink-0"
          >
            <X className="mr-1 h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader className={isMobile ? "sr-only" : ""}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={isMobile ? "p-3" : ""}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
          <div className="text-sm text-gray-500">
            Showing {table.getRowModel().rows.length} of {users.length} users
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}