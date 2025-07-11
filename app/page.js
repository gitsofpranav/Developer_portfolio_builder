import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div>
      <h2>
        Subscribe to me 
      </h2>
      <UserButton></UserButton>

    </div>
  );
}
