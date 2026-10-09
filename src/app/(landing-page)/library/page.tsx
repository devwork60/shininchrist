"use client";

import React, { useState } from "react";
import LibraryModeToggle from "@/components/pages/library-page/LibraryModeToggle";
import NonMemberLibraryView from "@/components/pages/library-page/NonMemberLibraryView";
import MemberLibraryView from "@/components/pages/library-page/member/MemberLibraryView";

const LibraryPage = () => {
  // Default view state: toggles between Non-Member view (false) and Member view (true)
  const [isMember, setIsMember] = useState(false);

  return (
    <main className="flex-1">
      {/* Interactive toggle bar to switch between Member and Non-Member views */}
      <LibraryModeToggle isMember={isMember} onToggle={setIsMember} />

      {/* Render selected View */}
      {isMember ? <MemberLibraryView /> : <NonMemberLibraryView />}
    </main>
  );
};

export default LibraryPage;
