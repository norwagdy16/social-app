/** @format */

import { Card, Skeleton } from "@heroui/react";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Skeleton Post */}
      <Card className="w-full p-6 rounded-3xl shadow-md space-y-6" radius="lg">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <Skeleton className="w-14 h-14 rounded-full" /> {/* Avatar */}
          <div className="flex flex-col gap-3 w-full">
            <Skeleton className="h-4 w-1/3 rounded-md" /> {/* Name */}
            <Skeleton className="h-3 w-1/5 rounded-md" /> {/* Time */}
          </div>
        </div>

        {/* Post Text */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-4/6 rounded-md" />
        </div>

        {/* Media Preview */}
        <Skeleton className="w-full rounded-2xl">
          <div className="h-56 bg-default-200 rounded-2xl" />
        </Skeleton>

        {/* Actions */}
        <div className="flex justify-around pt-4 border-t">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </Card>
    </div>
  );
}
