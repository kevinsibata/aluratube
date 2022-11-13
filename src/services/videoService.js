import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = process.env.NEXT_PUBLIC_PROJECT_URL;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY;
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("videos").select("*");
    },
  };
}
