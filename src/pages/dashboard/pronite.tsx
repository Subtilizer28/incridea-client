import { useRouter } from "next/router";
import React from "react";

import { QRCodeScanner } from "~/components/general/dashboard/organizer/qRCodeScanner";
import Dashboard from "~/components/layout/dashboard";
import { CONSTANT } from "~/constants";
import { useAuth } from "~/hooks/useAuth";

function Pronite() {
  const router = useRouter()
  const { loading, user } = useAuth()

  if (loading) {
    return <Dashboard>
      Loading...
    </Dashboard >
  }

  if (!user || user.id !== `${CONSTANT.PID.PRONITE_USER}`) {
    void router.push("/profile")
    return <Dashboard>
      Redirecting...
    </Dashboard >
  }

  return (
    <Dashboard className="flex justify-center items-center flex-col gap-4">
      <h2 className="mb-8 text-3xl text-white md:text-4xl">Pronite Scanner</h2>
      <div className="max-w-sm">
        <QRCodeScanner intent="pronite" />
      </div>
    </Dashboard>
  );
}

export default Pronite;
