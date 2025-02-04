"use client";

import { User } from "@/types/wp";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { motion } from "motion/react";
import { CalendarIcon, MailIcon, KeyIcon, ShieldCheckIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { logoutAction } from "@/app/my-account/action";
import { useActionState } from "react";

export default function UserPage({ user }: { user: User }) {
  const [state, formAction, isPending] = useActionState(logoutAction, null);

  if (!user) {
    return null;
  }
  // @ts-expect-error
  const date = new Date(user?.auth?.authTokenExpiration * 1000);

  // Alternatively, format it to a custom human-readable string
  const readableTimestamp = date.toLocaleString("en-US", {
    timeZone: "UTC", // Or use a specific time zone
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <div className="container max-w-5xl mx-auto p-4 min-h-full bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={"my-12 "}
      >
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg">
          <CardHeader className="relative flex flex-row gap-4 items-start justify-between space-y-0">
            <div className="flex flex-row gap-4 items-start justify-start">
              {user?.avatar && user?.name && user.firstName && (
                <Avatar className="">
                  <AvatarImage
                    className="w-12 h-12"
                    src={user?.avatar?.url}
                    alt={user?.name}
                  />
                  <AvatarFallback className="text-4xl">
                    {user?.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="text-foreground">
                {user?.name && (
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                )}
                {user?.username && <p className="text-xl">@{user.username}</p>}
              </div>
            </div>
            <form
              className="flex flex-col items-start justify-start space-y-2"
              action={formAction}
            >
              <Button variant="ghost" size="lg" className="w-fit" type="submit">
                Logout
              </Button>
            </form>
          </CardHeader>
          <CardContent className="flex flex-col">
            <Tabs defaultValue="profile" className="w-fit">
              <TabsList className="flex flex-row gap-4 items-start justify-start">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="py-6">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {user?.email && (
                    <>
                      <ProfileItem
                        icon={<MailIcon className="w-5 h-5" />}
                        label="Email"
                        value={user?.email}
                      />
                      <ProfileItem
                        icon={<CalendarIcon className="w-5 h-5" />}
                        label="Joined"
                        value="January 1, 2023"
                      />
                    </>
                  )}
                  <div className="col-span-2">
                    <dt className="font-medium text-muted-foreground mb-1">
                      Description
                    </dt>
                    <dd className="text-lg">{user?.description}</dd>
                  </div>
                </dl>
              </TabsContent>
              <TabsContent value="security" className="py-6">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ProfileItem
                    icon={<KeyIcon className="w-5 h-5" />}
                    label="Auth Token Expiration"
                    value={readableTimestamp}
                  />
                  <ProfileItem
                    icon={<ShieldCheckIcon className="w-5 h-5" />}
                    label="User Secret Revoked"
                    value={user.auth.isUserSecretRevoked ? "Yes" : "No"}
                  />
                </dl>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <dt className="font-medium text-muted-foreground">{label}</dt>
        <dd className="text-lg">{value}</dd>
      </div>
    </div>
  );
}
