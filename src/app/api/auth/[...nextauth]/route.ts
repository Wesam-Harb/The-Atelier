// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // Link to the file we made in Step 2
export const { GET, POST } = handlers;
