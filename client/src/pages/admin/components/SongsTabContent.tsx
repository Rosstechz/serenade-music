import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
  return (
    <Card className="bg-blue-800/50 border-zinc-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              Songs Library
            </CardTitle>

            <CardDescription
              className="text-slate-300 mt
            -1"
            >
              Manage Your Music Tracks
            </CardDescription>
          </div>

          <AddSongDialog />
        </div>
      </CardHeader>

      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;