import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nrdlxfrlgzbrqffywwul.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZGx4ZnJsZ3picnFmZnl3d3VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDcyMzksImV4cCI6MjA0NTA4MzIzOX0.Oem-obLh3UnQmJeXdP3XtInf4TCuWQeHdSTBIG5s-Aw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
