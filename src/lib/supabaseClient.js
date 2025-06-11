import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://joypjckykmybnbmoabfp.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveXBqY2t5a215Ym5ibW9hYmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA0MTcsImV4cCI6MjA2NTE4NjQxN30.wsnxZNeJKi2IwE98Bbdt__AWdnnWLaUXs0ESx-njctA";  

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
