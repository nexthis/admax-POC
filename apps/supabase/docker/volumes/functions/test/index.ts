import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'




serve(async (req: Request) => {

    console.log("Test");
    return new Response(JSON.stringify({ test: "XD"}), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    })
 })