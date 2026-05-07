import React from "react";
import {
  Tabs as BaseTabs,
  TabsList as BaseTabsList,
  TabsTrigger as BaseTabsTrigger,
  TabsContent as BaseTabsContent,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Tabs = BaseTabs;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof BaseTabsList>,
  React.ComponentPropsWithoutRef<typeof BaseTabsList>
>(({ className, ...props }, ref) => (
  <BaseTabsList
    ref={ref}
    variant="line"
    className={cn(
      // Override: force line variant style, add bottom border
      "w-full justify-start border-b border-border p-0 gap-6",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof BaseTabsTrigger>,
  React.ComponentPropsWithoutRef<typeof BaseTabsTrigger>
>(({ className, ...props }, ref) => (
  <BaseTabsTrigger
    ref={ref}
    className={cn(
      // Override: remove background, use subtle text colors, animate the bottom line
      "relative h-10 rounded-none bg-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none after:bottom-0 after:h-[2px] after:bg-foreground",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof BaseTabsContent>,
  React.ComponentPropsWithoutRef<typeof BaseTabsContent>
>(({ className, ...props }, ref) => (
  <BaseTabsContent
    ref={ref}
    className={cn("mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
