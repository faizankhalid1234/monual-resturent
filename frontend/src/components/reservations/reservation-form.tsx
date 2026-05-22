"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEATING_AREAS } from "@/lib/constants";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.string().min(1),
  time: z.string().min(1),
  guests: z.number().min(1).max(50),
  seatingArea: z.string().min(1),
  specialRequests: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ReservationForm() {
  const [aiAssist, setAiAssist] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { guests: 2, seatingArea: SEATING_AREAS[0] },
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, aiAssist }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? "Failed");
      toast.success(result.message ?? "Reservation submitted!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not book. Please call us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass max-w-2xl mx-auto rounded-2xl p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-gold flex items-center gap-2">
          <Calendar className="h-6 w-6" /> Reserve Your Table
        </h2>
        <button
          type="button"
          onClick={() => setAiAssist(!aiAssist)}
          className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs transition ${aiAssist ? "bg-gold text-black" : "border border-gold/30 text-gold"}`}
        >
          <Sparkles className="h-3 w-3" /> AI Assist
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register("name")} className="mt-1" />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} className="mt-1" />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="guests">Guests</Label>
          <div className="relative mt-1">
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
            <Input id="guests" type="number" min={1} max={50} className="pl-10" {...register("guests")} />
          </div>
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" {...register("date")} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" {...register("time")} className="mt-1" />
        </div>
      </div>

      <div>
        <Label>Seating Area</Label>
        <Select value={watch("seatingArea")} onValueChange={(v) => setValue("seatingArea", v)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select area" />
          </SelectTrigger>
          <SelectContent>
            {SEATING_AREAS.map((area) => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="specialRequests">Special Requests</Label>
        <Textarea id="specialRequests" {...register("specialRequests")} className="mt-1" placeholder="Dietary needs, celebration, etc." />
      </div>

      {aiAssist && (
        <p className="text-sm text-muted-foreground border border-gold/20 rounded-lg p-4 bg-gold/5">
          AI Assist will optimize your time slot, send smart confirmations via email & WhatsApp, and add your booking to Google Calendar when configured.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Confirming..." : "Confirm Reservation"}
      </Button>
    </form>
  );
}
