import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://vicjngiwpmgiaveolcww.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpY2puZ2l3cG1naWF2ZW9sY3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyOTY2MTcsImV4cCI6MTk4Mzg3MjYxN30.6RgVlkETTl5EBAK5_kgX0Vhwu2ZpbHFSmyMdRRbCh24";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("videos").select("*");
    },
  };
}
