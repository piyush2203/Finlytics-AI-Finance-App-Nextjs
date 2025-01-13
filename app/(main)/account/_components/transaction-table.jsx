"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { categoryColors } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RECURRING_INTERVAL = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

const TransactionTable = ({ transactions }) => {
  const router = useRouter();
  
  const [SelectIds, setSelectIds] = useState([]); 
  const [sortConfig, setsortConfig] = useState({
    field:"date",
    direction:"desc"
  });

  const handleSort =(field)=>{
    setsortConfig((current)=>({
      field,
      direction:current.field == field && current.direction ==="asc"?"desc":"asc" 
    }))
  };

  const handleSelect = (id)=>{
    setSelectIds(current=>current.includes(id)?current.filter(item=>item!=id):[...current,id])
  }

  const handleSelectAll = ()=>{
    setSelectIds(current=>current.length===filteredAndSortedTransaction.length?[]:filteredAndSortedTransaction.map((t)=>t.id));
  }



  



  const filteredAndSortedTransaction = transactions;      

  return (
    <div>
      {/* Filter */}

      {/* Transaction */}
      <div className="mt-5 rounded-md border-black border-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox onCheckedChange={()=>handleSelectAll()} 
                  checked={SelectIds.length===filteredAndSortedTransaction.length && filteredAndSortedTransaction.length>0}/>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">Date {sortConfig.field==='date' && (sortConfig.direction==="desc" ? (<ChevronUp className="ml-1 h-4 w-4" />):(<ChevronDown className="ml-1 h-4 w-4"/>))}</div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">Category {sortConfig.field==='category' && (sortConfig.direction==="desc" ? (<ChevronUp className="ml-1 h-4 w-4" />):(<ChevronDown className="ml-1 h-4 w-4"/>))}</div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center">Amount {sortConfig.field==='amount' && (sortConfig.direction==="desc" ? (<ChevronUp className="ml-1 h-4 w-4" />):(<ChevronDown className="ml-1 h-4 w-4"/>))}</div>
              </TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead className="w-['50px']" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTransaction.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No Transaction Found
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTransaction.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    <Checkbox onCheckedChange={()=>handleSelect(transaction.id)}
                      checked={SelectIds.includes(transaction.id)}
                      />
                  </TableCell>
                  <TableCell>
                    {format(new Date(transaction.date), "PP")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="capitalize ">
                    <span
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                      className="py-1 px-2 rounded text-white"
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`text-${
                      transaction.type === "EXPENSE" ? "red-500" : "green-500"
                    } font-medium`}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}₹{" "}
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {transaction.isRecurring ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant={"outline"}
                              className={
                                "gap-1 hover:bg-purple-400 bg-purple-200 text-purple-700"
                              }
                            >
                              <RefreshCw />
                              {
                                RECURRING_INTERVAL[
                                  transaction.recurringInterval
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>Next Date </div>
                            <div>
                              {format(new Date(transaction.date), "PP")}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Badge variant={"outline"} className={"gap-1 "}>
                        <Clock />
                        One-Time
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                          <MoreHorizontal className="h-4 w-4"></MoreHorizontal>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel className="cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/transaction/create?edit=${transaction.id}`
                            )
                          }
                        >
                          Edit
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive cursor-pointer"
                          //   onClick={() => deleteFn}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
