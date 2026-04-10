"use client";

import { useEffect, useState } from "react";

type Sale = { identifier: string; amount: number; status: string; transaction_date: string; linkId?: string };
type Link = { id: string; target: string; label: string; clicks: any[] };

export default function AdminPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [target, setTarget] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => { fetchSales(); fetchLinks(); }, []);

  async function fetchSales() {
    const res = await fetch("/api/admin/sales");
    const data = await res.json();
    setSales(data.sales || []);
  }

  async function fetchLinks() {
    const res = await fetch("/api/admin/links");
    const data = await res.json();
    setLinks(data.links || []);
  }

  async function createLink(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/links", { method: "POST", body: JSON.stringify({ target, label }), headers: { "Content-Type":"application/json" } });
    setTarget(""); setLabel(""); fetchLinks();
  }

  function sumPeriod(period: "day"|"week"|"month") {
    const now = new Date();
    const list = sales.filter(s => s.status === "completed");
    return list.filter(s => {
      const d = new Date(s.transaction_date);
      if (period === "day") return d.toDateString() === now.toDateString();
      if (period === "week") {
        const diff = (now.getTime() - d.getTime()) / (1000*60*60*24);
        return diff <= 7;
      }
      const diffm = (now.getTime() - d.getTime()) / (1000*60*60*24*30);
      return diffm <= 1;
    }).reduce((acc, s) => acc + (Number(s.amount) || 0), 0);
  }

  function revenueForLink(id: string) {
    return sales.filter(s => s.linkId === id && s.status === "completed").reduce((a,b) => a + (Number((b as any).amount) || 0), 0);
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Painel Admin</h1>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500">Hoje</div>
            <div className="text-xl font-semibold">R$ {sumPeriod('day').toFixed(2)}</div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500">Últimos 7 dias</div>
            <div className="text-xl font-semibold">R$ {sumPeriod('week').toFixed(2)}</div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500">Último mês</div>
            <div className="text-xl font-semibold">R$ {sumPeriod('month').toFixed(2)}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Vendas (recém)</h2>
            <div className="space-y-2">
              {sales.slice().reverse().map(s => (
                <div key={s.identifier} className="rounded-lg border p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.identifier}</div>
                    <div className="text-sm text-gray-500">{s.transaction_date} • {s.status} • R$ {(s.amount||0).toString()}</div>
                    <div className="text-sm text-gray-500">link: {s.linkId ?? '—'}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={async()=>{ const linkId = prompt('Atribuir a qual link id?'); if(linkId){ await fetch('/api/admin/links/attribution',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({identifier:s.identifier,linkId})}); fetchSales(); fetchLinks(); } }} className="rounded-md bg-gray-800 text-white px-3 py-1 text-sm">Atribuir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Links de tracking</h2>
            <form onSubmit={createLink} className="flex gap-2 mb-3">
              <input value={target} onChange={e=>setTarget(e.target.value)} placeholder="https://..." className="flex-1 rounded-md border px-3 py-2" />
              <input value={label} onChange={e=>setLabel(e.target.value)} placeholder="rótulo (opcional)" className="w-44 rounded-md border px-3 py-2" />
              <button className="rounded-md bg-[#3b82f6] text-white px-4">Criar</button>
            </form>

            <div className="space-y-2">
              {links.map(l => (
                <div key={l.id} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium">{l.label} <span className="text-xs text-gray-500">/{l.id}</span></div>
                      <a className="text-sm text-blue-600" href={`/r/${l.id}`} target="_blank" rel="noreferrer">/r/{l.id} →</a>
                      <div className="text-sm text-gray-500 mt-1">Clicks: {l.clicks?.length || 0}</div>
                      <div className="text-sm text-gray-500 mt-1">Receita: R$ {revenueForLink(l.id).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
