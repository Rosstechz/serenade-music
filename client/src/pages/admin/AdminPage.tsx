import { useAuthStore } from "@/store/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import AlbumTabContent from "./components/AlbumTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/store/useMusicStore";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin || isLoading) return <div>Unauthorized</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-black text-zinc-100 p-8">
      <Header />
      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-blue-800/50">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-blue-700 text-white"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>

          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-blue-700 text-white"
          >
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>

        <TabsContent value="albums">
          <AlbumTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
