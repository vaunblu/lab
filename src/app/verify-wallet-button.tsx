"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export function VerifyWalletButton() {
  const [open, setOpen] = React.useState(false);
  return <Button>Verify wallet</Button>;
}
