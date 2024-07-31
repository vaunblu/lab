import { Button } from "@/components/ui/button";

export function ShowMore() {
  return (
    <div className="w-full max-w-lg space-y-4 rounded-lg bg-background p-5 shadow-lg">
      <div>
        <h3 className="font-semibold leading-none">Pages</h3>
        <p className="text-sm font-medium text-muted-foreground">
          17 unique pages viewed
        </p>
      </div>

      <div className="space-y-1">
        <div className="h-7 w-[80%] rounded bg-[#c2e2fb]" />
        <div className="h-7 w-[30%] rounded bg-[#c2e2fb]" />
        <div className="h-7 w-[23%] rounded bg-[#c2e2fb]" />
        <div className="h-7 w-[22%] rounded bg-[#c2e2fb]" />
        <div className="h-7 w-[20%] rounded bg-[#c2e2fb]" />
        <div className="h-7 w-[19%] rounded bg-[#c2e2fb]" />
        <div className="h-7 w-[19%] rounded bg-[#c2e2fb]" />
        <div className="h-7 w-[18%] rounded bg-[#c2e2fb]" />
        <div className="h-7 w-[16%] rounded bg-[#c2e2fb]" />
        <div className="h-7 w-[15%] rounded bg-[#c2e2fb]" />
      </div>

      <div className="flex items-center justify-center">
        <Button variant="ghost" className="h-9 w-full text-muted-foreground">
          Show more (7)
        </Button>
      </div>
    </div>
  );
}
